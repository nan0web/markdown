import { execSync } from "node:child_process"
import { extname, resolve, relative } from "node:path"
import { existsSync, readFileSync } from "node:fs"
import BaseProtocol from "./BaseProtocol.js"
import ChatMessage from "../../../apps/core/src/io/ChatMessage.js"
import { findAllFiles, save } from "nanoweb-fs"
import { empty, oneOf } from "@nanoweb/types"

/**
 * @typedef {object} ParsedFileBlock
 * @property {string} filePath
 * @property {string} content
 * @property {string|null} type
 */

/**
 * CoderProtocol executes transformation pipeline for code-related LLM messages.
 */
class CoderProtocol extends BaseProtocol {
	static ID = "coder"
	static MESSAGES = {
		goodbye: [
			...BaseProtocol.MESSAGES.goodbye,
			"   Happy to help you code when you are ready 🤙", ""
		]
	}
	name = "Coder.v1"
	desc = "code like a team of devs"
	inputPipeline = [
		"requireEmptyResponse"
	]
	outputPipeline = [
		"requireFilesAndCommands",
		// "requireMissingCode",
		"requireSaveFiles",
		"requireLocalTest",
		"requireProjectTest",
	]

	/**
	 *
	 * @param {ChatMessage} chat
	 * @param {object} context
	 * @param {Response} context.prevResponse
	 * @returns
	 */
	async requireEmptyResponse(chat, context = {}) {
		let {
			prevResponse,
			responseFile
		} = context
		if (empty(prevResponse)) {
			return true
		}
		const label = [
			"❓ It seems there is a response from a previous chat", "",
			"Do you want to continue with previous response?"
		]
		const ok = await this.app.ask({ label, options: ["Yes", "No"] })
		if (!oneOf("yes", "yep", "y")(String(ok).toLocaleLowerCase())) return true

		if (!chat.isRecent(prevResponse)) {
			prevResponse = null
			save(responseFile, "")
		}
		return true
	}

	_requireMessage(chat) {
		const message = chat.recent
		if (empty(message)) {
			throw new Error("No message to parse, provide chat input first")
		}
		return message
	}
	_requireAssistant(message) {
		if (message.role !== ChatMessage.ROLES.assistant) {
			throw new Error("Recent message must be from assistant")
		}
		return message
	}
	_requireCwd(context) {
		const { cwd } = context
		if (empty(cwd)) {
			throw new Error("Provide cwd for the context")
		}
		return context
	}

	/**
	 * Extract files from LLM response and store in context
	 * @param {ChatMessage} chat
	 * @param {object} [context={}]
	 * @returns {Promise<CoderProtocol>}
	 */
	async requireFilesAndCommands(chat, context = {}) {
		const message = this._requireMessage(chat)
		this._requireAssistant(message)
		const { files, commands } = this.parse(message.content)
		context.files = files
		context.commands = commands
		return true
	}

	/**
	 * Extract .:need blocks if any to detect missing required files
	 * @param {ChatMessage} chat
	 * @param {object} [context={}]
	 * @returns {Promise<CoderProtocol>}
	 */
	async requireMissingCode(chat, context = {}) {
		const message = this._requireMessage(chat)
		this._requireAssistant(message)
		const { cwd, files = [] } = this._requireCwd(context)
		if (!files.length) {
			return true
		}
		const diff = this.readDiff(files, cwd)
		return true
	}

	async requireSaveFiles(chat, context = {}) {
		const { cwd, files = [] } = this._requireCwd(context)
		if (!files.length) {
			return true
		}
		const ok = await this.app.requireSaveFiles(chat, context)
		if (ok) {
			files.forEach(el => save(resolve(cwd, el.file), el.content))
			this.app.view.filesSaved({ files })
		}
		return ok
	}

	async requireTests(chat, context = {}) {
		const { cwd, tests = [] } = this._requireCwd(context)
		if (!tests.length) return true
		const runner = new TestRunner(cwd)
		runner.emit("data", () => process.stdout.write("."))
		runner.emit("error", () => process.stderr.write("!"))
		const vitestPath = await this.app.resolve(this.app.cwd, "vitest.js")
		const command = "node"
		const args = [vitestPath, ...tests]

		console.info("#### `.:bash`")
		console.info("```")
		console.info(["%", command, ...args].join(" "))

		try {
			const total = await runner.run(args, command)
			const rows = runner.stdout.filter(row => row.trim() !== "")
			rows.forEach(r => console.info(r))
		} catch (err) {
			const errs = runner.stderr.filter(row =>
				!["", "Debugger attached.", "Waiting for the debugger to disconnect..."].includes(row)
			)
			errs.forEach(e => console.info(e))
		}
		console.info("```")
	}

	/**
	 * @param {ChatMessage} chat
	 * @param {object} context
	 * @returns {Promise<Boolean>}
	 */
	async requireLocalTest(chat, context = {}) {
		const { files = [] } = context
		const tests = files.filter(el => /\.test\.(js|jsx)$/.test(el.file)).map(el => el.file)
		const messages = chat.getFlat()
		let recentPrompt
		for (let i = messages.length - 1; i > 0; i--) {
			const msg = messages[i]
			if (msg.element.role === ChatMessage.ROLES.user) {
				recentPrompt = msg.element
				break
			}
		}
		if (recentPrompt) {
			const { files } = this.parse(recentPrompt.content)
			const prevTests = files.filter(el => el.file.match(/\.test\.(js|jsx)$/)).map(el => el.file)
			prevTests.map(t => tests.push(t))
		}
		context.tests = Array.from(new Set(tests))
		const ok = await this.app.requireLocalTest(chat, context)
		return ok
	}

	async requireProjectTest(chat, context= {}) {
		return true
	}

	readDiff(files, cwd) {
		for (const { file, content } of files) {
			const diff = execSync(`git diff -- ${file}`, { cwd })
			const result = this.parseDiff(diff)
			const x = 9
		}
		return 0
	}

	transformResponse(response, chat) {
		this.decode(response.content)
	}

	decode(content) {
		return this.parse(content)
	}

	/**
	 * Parses the given content into file and command blocks.
	 *
	 * @param {string} content - The raw input content containing file or command blocks.
	 * @returns {{
	 *   files: Array<{
	 *     file: string,
	 *     content: string,
	 *     type: string
	 *   }>,
	 *   commands: Array<{
	 *     command: string,
	 *     content: string,
	 *     type: string,
	 *     [key: string]: string
	 *   }>
	 * }} An object containing arrays of parsed file entries and command entries.
	 */
	parse(content) {
		const original = this.parseFileBlocks(content)
		const files = []
		const commands = []
		for (let { filePath, content, type } of original) {
			if (filePath.startsWith(".:")) {
				const [command, ..._] = filePath.slice(".:".length).split(' ')
				const attrs = this.parseAttrs(_.join(' '))
				commands.push({ ...attrs, command, content, type })
			} else {
				files.push({ file: filePath, content, type })
			}
		}
		return { files, commands }
	}

	parseBlocks(content) {
		const original = this.parseFileBlocks(content)
		const files = []
		const commands = []
		const messages = []
		const requests = []
		for (let { filePath, content } of original) {
			if (".:bash" === filePath) {
				commands.push(content)
				continue
			} else if (".:need" === filePath) {
				content.trim().split("\n").forEach(row => requests.push(row))
			} else if (".:task" === filePath) {
				const [status, ...text] = content.split("\n")
				messages.push({ status, text: text.join("\n") })
			} else {
				files.push({ file: filePath, content })
			}
		}
		return { files, commands, messages, requests }
	}

	normalizeEscapedContent(content) {
		return content.trim().split("\n").map(
			row => row.replace(/^---```---$/, "```").replace(/^---#### `(.+)`---$/g, "#### `$1`")
		).join("\n")
	}

	normalizeInputAttrs(attrs = {}) {
		const sanitizers = []
		const { type = "text", ...rest } = attrs

		if (type === "number") {
			sanitizers.push([(x) => Number(x), ["min", "max", "step"]])
		}
		if (type === "text") {
			sanitizers.push([(x) => Number(x), ["minlength", "maxlength"]])
		}

		for (const [fn, fields = []] of sanitizers) {
			fields.forEach(field => {
				if (attrs[field] === undefined) return
				attrs[field] = fn(attrs[field])
			})
		}

		return attrs
	}

	parseFileBlocks(content) {
		const rows = String(content).split("\n")
		const files = []
		let currentFile = null
		let type = null
		let currentContent = []

		for (const row of rows) {
			const fileHeaderMatch = row.match(/^####\s*`(.+)`$/)
			if (fileHeaderMatch) {
				if (currentFile) {
					files.push({
						filePath: currentFile,
						content: this.normalizeEscapedContent(currentContent.join("\n")),
						type
					})
				}
				currentFile = fileHeaderMatch[1]
				currentContent = []
				type = null
				continue
			}

			const codeBlockStartMatch = row.match(/^```(\w+)?$/)
			if (codeBlockStartMatch?.[1] && null === type) {
				type = codeBlockStartMatch[1]
			}
			if (row.trim() === "```" && currentFile) {
				files.push({
					filePath: currentFile,
					content: this.normalizeEscapedContent(currentContent.join("\n")),
					type
				})
				currentFile = null
				type = null
				currentContent = []
				continue
			}

			if (codeBlockStartMatch && currentFile) continue
			if (currentFile) currentContent.push(row)
		}

		if (currentFile && currentContent.length) {
			files.push({
				filePath: currentFile,
				content: this.normalizeEscapedContent(currentContent.join("\n")),
				type
			})
		}

		return files
	}

	parseAttrs(str) {
		const result = { attrs: {}, args: [] }
		if (str.startsWith('[') && str.endsWith(']')) {
			const parts = str.slice(1, -1).split('][')
			parts.forEach(part => {
				if (part.includes('=')) {
					const [name, ..._] = part.split('=')
					result.attrs[name] = _.join('=')
				} else {
					result.attrs[part] = true
				}
			})
		} else {
			const parts = str.split(' ')
			let i = 0
			for (; i < parts.length - 1; i++) {
				const part = parts[i]
				if (part.startsWith('--')) {
					result.attrs[part.slice(2)] = true
				}
				else if (part.startsWith('-')) {
					const next = parts[i + 1]
					if (next.startsWith('-')) continue
					result.attrs[part.slice(1)] = next
					++i
				}
				else if ("" !== part) {
					result.args.push(part)
				}
			}
			if (i < parts.length) {
				const last = parts.pop()
				if (last.startsWith('--')) {
					result.attrs[last.slice(2)] = true
				}
				else if (last.startsWith('-')) {
					result.attrs[last.slice(1)] = true
				}
				else if ("" !== last) {
					result.args.push(last)
				}
			}
		}
		return result
	}

	parseDiff(diff) {
		const removedBlocksByFile = {}
		const lines = String(diff).split('\n')
		let currentFile = null
		let inHunk = false
		let removedBlock = []

		for (const line of lines) {
			if (line.startsWith('diff --git')) {
				const match = line.match(/^diff --git a\/(.+?) b\//)
				if (match) {
					currentFile = match[1]
					removedBlocksByFile[currentFile] = []
				}
				inHunk = false
				continue
			}
			if (!currentFile) continue

			if (line.startsWith('@@')) {
				inHunk = true
				const [a, b] = line.split("@@ ")[1].trim().split(" ")
				continue
			}
			if (!inHunk) continue

			if (line.startsWith('-')) {
				removedBlock.push(line.slice(1))
			} else {
				if (removedBlock.length) {
					removedBlocksByFile[currentFile].push(removedBlock.join('\n'))
					removedBlock = []
				}
			}
		}
		if (removedBlock.length && currentFile) {
			removedBlocksByFile[currentFile].push(removedBlock.join('\n'))
		}
		return removedBlocksByFile
	}

	async start() {
		let ok
		do {
			await this.app.requireProvider()
			await this.app.requireModel()
			do {
				/** Clean git to see all the changes made by LLM */
				await this.app.requireCleanGit()
				/** Waiting for the next task */
				const prompt = await this.app.requireChatInput()
				this.app.chat.recent.add(prompt)
				this.transform(prompt, this.app.chat, context)
				const response = await this.app.requireResponse(prompt)
				await this.transform(response, this.app.chat)
			} while (!this.app.chat.ended)
			ok = await this.app.requireChatContinue()
		} while (ok)
	}


	/**
	 * @abstract
	 * @param  {...string} args
	 * @returns {string}
	 */
	resolve(...args) {
		return args.join("/")
	}

	/**
	 * @abstract
	 * @param {string} src
	 * @param {string} dest
	 * @returns {string}
	 */
	relative(src, dest) {
		return dest.startsWith(src) ? dest.slice(0, src.length) : dest
	}

	/**
	 * @abstract
	 * @param {string} url
	 * @returns {string[]}
	 */
	findAllIn(url) {
		return []
	}

	/**
	 * @abstract
	 * @param {string} url
	 * @returns {string}
	 */
	extname(url) {
		const arr = url.split(".")
		return arr.length ? "." + arr.pop() : ""
	}

	/**
	 * @abstract
	 * @param {string} url
	 * @returns {boolean}
	 */
	existsSync(url) {
		return false
	}

	/**
	 * @abstract
	 * @param {string} url
	 * @returns {Uint8Array}
	 */
	readFileSync(url) {
		return null
	}

	async parseMeMD(content, cwd = ".") {
		const readInclude = (path, context = { files: [], tests: [] }) => {
			const files = [], tests = []
			if (path.endsWith("*") || path.endsWith("/")) {
				const asDir = path.endsWith("/")
				const dir = resolve(cwd, path.slice(0, -1), asDir ? "." : "..")
				const all = findAllFiles(dir)
				let affix = path.startsWith("./") ? path.slice(2, -1) : path.slice(0, -1)
				if (asDir) affix += "/"
				all.map(file => relative(cwd, file))
					.filter(file => file.startsWith(affix))
					.forEach(file => {
						if (file.match(/\.test\.(js|jsx)$/)) {
							tests.push(file)
						} else {
							files.push(file)
						}
					})
			} else if (path.match(/\.test\.(js|jsx)$/)) {
				tests.push(relative(cwd, path))
			} else {
				files.push(relative(cwd, path))
			}
			context.files = files
			context.tests = tests
			return [...files, ...tests].map(file => {
				const filePath = resolve(cwd, file)
				if (!existsSync(filePath)) {
					throw new Error("File not found: " + file)
				}
				const ext = String(extname(file) ?? ".").slice(1)
				const rel = /^[\.\/]/.test(file) ? file : `./${file}`
				return `#### \`${rel}\`\n\`\`\`${ext}\n${readFileSync(filePath, "utf-8")}\n\`\`\``
			}).join("\n\n")
		}

		const rows = content.split("\n")
		const includes = []
		let tests = []

		const processed = rows.map((row, i) => {
			const str = row.trim()
			const matches = str.match(/^- \[([^\]]*)\]\(([^\)]+)\)$/i)
			if (matches) {
				const [, text, path] = matches
				const context = {}
				const content = readInclude(path, context)
				tests = [...tests, ...context.tests]
				includes.push({ i, text, path, content })
				const arr = []
				if (text) arr.push(`### ${text}`)
				arr.push(content)
				return arr.join("\n")
			}
			return row
		}).join("\n").trim()

		const message = ChatMessage.from({ content: processed })
		return { message, content, processed, includes, tests }
	}
}

export default CoderProtocol
