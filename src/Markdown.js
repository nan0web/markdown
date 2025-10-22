import MDElement from "./MDElement.js"
import MDParagraph from "./MDParagraph.js"
import MDHeading1 from "./MDHeading1.js"
import MDHeading2 from "./MDHeading2.js"
import MDHeading3 from "./MDHeading3.js"
import MDHeading4 from "./MDHeading4.js"
import MDHeading5 from "./MDHeading5.js"
import MDHeading6 from "./MDHeading6.js"
import MDOrderedList from "./MDOrderedList.js"
import MDList from "./MDList.js"
import MDListItem from "./MDListItem.js"
import MDCodeBlock from "./MDCodeBlock.js"
import MDCodeInline from "./MDCodeInline.js"
import MDLink from "./MDLink.js"
import MDImage from "./MDImage.js"
import MDBlockquote from "./MDBlockquote.js"
import MDHorizontalRule from "./MDHorizontalRule.js"
import MDSpace from "./MDSpace.js"
import MDTable from "./MDTable.js"
import MDTableRow from "./MDTableRow.js"
import MDTableCell from "./MDTableCell.js"
import MDTaskList from "./MDTaskList.js"
import ParseContext from "./Parse/Context.js"
import InterceptorInput from "./InterceptorInput.js"

/**
 * Markdown parser for nanoweb.
 * Parses markdown to object by new lines.
 * @link https://www.markdownguide.org/cheat-sheet/
 */
export default class Markdown {
	static ELEMENTS = [
		// Block elements
		MDHeading1,
		MDHeading2,
		MDHeading3,
		MDHeading4,
		MDHeading5,
		MDHeading6,
		MDOrderedList,
		MDList,
		MDListItem,
		MDBlockquote,
		MDHorizontalRule,
		MDTable,
		MDTableRow,
		MDTableCell,
		MDCodeBlock,
		MDTaskList,
		MDParagraph,
		// Inline elements
		MDCodeInline,
		MDLink,
		MDImage,
		// Space elements
		MDSpace,
	]

	/** @type {MDElement} */
	document

	/**
	 * @param {object} [input]
	 * @param {MDElement} [input.document]
	 */
	constructor(input = {}) {
		const {
			document = new MDElement()
		} = input
		this.document = document
	}

	/**
	 * Parse markdown text into elements.
	 * @param {string} text
	 * @returns {MDElement[]} - Root element children
	 */
	parse(text) {
		this.document.children = Markdown.parse(text)
		return this.document.children
	}

	/**
	 * Parse markdown text into elements.
	 * @param {string} text
	 * @returns {MDElement[]} - Root element children
	 */
	static parse(text) {
		const lines = String(text).split("\n")
		const elements = []
		let i = 0
		while (i < lines.length) {
			let line = lines[i]
			let parsed = null
			const context = new ParseContext({ i, rows: lines })
			for (const Element of Markdown.ELEMENTS) {
				if ("function" !== typeof Element.parse) {
					throw new Error(`Element ${Element.name} has no static parse() method`)
				}
				parsed = Element.parse(line, context)
				if (parsed) break
				context.skipped.push(Element)
			}
			if (parsed && parsed.constructor && parsed.constructor.name === "MDCodeBlock") {
				// Find end of code block
				let j = i + 1
				while (j < lines.length && !lines[j].startsWith("```")) {
					j++
				}
				j++ // skip closing ```
				i = j
			} else if (parsed && parsed.constructor && parsed.constructor.name === "MDBlockquote") {
				// Find end of blockquote
				let j = i
				while (j < lines.length && lines[j].startsWith(">")) {
					j++
				}
				i = j
			} else if (
				parsed instanceof MDList ||
				parsed instanceof MDTaskList ||
				parsed instanceof MDOrderedList
			) {
				// Parse consecutive list items into a container
				const listType = parsed.constructor
				const ordered = !!parsed.ordered
				// @ts-ignore
				const list = new listType({ ordered, children: [] })
				while (i < lines.length) {
					const itemLine = lines[i]
					const itemParsed = MDListItem.parse(itemLine)
					if (!itemParsed) break
					list.add(itemParsed)
					i++
				}
				elements.push(list)
				continue
			} else if (!parsed) {
				// fallback to paragraph
				const paragraphLines = []
				let j = i
				while (j < lines.length && lines[j].trim() !== "") {
					paragraphLines.push(lines[j])
					j++
				}
				const paragraphContent = paragraphLines.join("\n")
				if (paragraphContent.trim() !== "") {
					parsed = new MDParagraph({ content: paragraphContent })
				} else {
					parsed = new MDSpace({ content: lines[i] + '\n' })
				}
				i = j > i ? j : i + 1
			} else {
				i = context.i === i ? i + 1 : context.i
			}
			if (parsed) {
				elements.push(parsed)
			} else {
				i++
			}
		}
		return elements
	}


	/**
	 * Stringify elements to HTML string.
	 * @param {(element: InterceptorInput) => string | null} [interceptor]
	 * @returns {string}
	 */
	stringify(interceptor) {
		// @ts-ignore MDElement has map from extended ContainerObject
		const path = []
		// @ts-ignore
		const htmlParts = this.document.map(el => {
			if (interceptor) {
				const input = new InterceptorInput({ element: el, path })
				const intercepted = interceptor(input)
				path.push(el)
				if (typeof intercepted === "string") return intercepted
			}
			const tag = typeof el.tag === 'function' ? el.tag : el.tag;
			const end = typeof el.end === 'function' ? el.end : el.end;
			return (typeof tag === 'function' ? tag(el) : tag) + el.content + (typeof end === 'function' ? end(el) : end);
		})
		return htmlParts.join("\n")
	}

	/**
	 * Stringify elements to HTML string.
	 * @param {(element: InterceptorInput) => Promise<string | null>} [interceptor]
	 * @returns {Promise<string>}
	 */
	async asyncStringify(interceptor) {
		// @ts-ignore MDElement has map from extended ContainerObject
		const path = []
		// @ts-ignore
		const htmlParts = await this.document.asyncMap(async el => {
			if (interceptor) {
				const input = new InterceptorInput({ element: el, path })
				const intercepted = await interceptor(input)
				path.push(el)
				if (typeof intercepted === "string") return intercepted
			}
			const tag = typeof el.tag === 'function' ? el.tag : el.tag;
			const end = typeof el.end === 'function' ? el.end : el.end;
			return (typeof tag === 'function' ? tag(el) : tag) + el.content + (typeof end === 'function' ? end(el) : end);
		})
		return htmlParts.join("\n")
	}

	/**
	 * Convert element to HTML string.
	 * @param {MDElement} el
	 * @returns {string}
	 */
	elementToHTML(el) {
		if (
			el instanceof MDHeading1 ||
			el instanceof MDHeading2 ||
			el instanceof MDHeading3 ||
			el instanceof MDHeading4 ||
			el instanceof MDHeading5 ||
			el instanceof MDHeading6
		) {
			const tag = typeof el.tag === 'function' ? el.tag : el.tag;
			const endTag = typeof el.end === 'function' ? el.end : el.end;
			return `${typeof tag === 'function' ? tag(el) : tag}${el.content}${typeof endTag === 'function' ? endTag(el) : endTag}`
		}
		if (el instanceof MDParagraph) {
			return `<p>${el.content}</p>`
		}
		if (el instanceof MDList || el instanceof MDOrderedList) {
			const tag = el.ordered ? "ol" : "ul"
			const items = el.children.map(child => `<li>${child.content}</li>`).join("")
			return `<${tag}>${items}</${tag}>`
		}
		if (el instanceof MDCodeBlock) {
			const langClass = el.language ? ` class="language-${el.language}"` : ""
			return `<pre><code${langClass}>${el.content}</code></pre>`
		}
		if (el instanceof MDBlockquote) {
			return `<blockquote>${el.content}</blockquote>`
		}
		if (el instanceof MDHorizontalRule) {
			return `<hr />`
		}
		// fallback to tag + content + end
		const tag = typeof el.tag === 'function' ? el.tag : el.tag;
		const end = typeof el.end === 'function' ? el.end : el.end;
		return (typeof tag === 'function' ? tag(el) : tag) + el.content + (typeof end === 'function' ? end(el) : end)
	}
}