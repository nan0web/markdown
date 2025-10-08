import MDElement from "./MDElement.js"

/** @typedef {import("./MDElement.js").MDElementProps} MDElementProps */

/**
 * Code block element.
 * @typedef {Object} MDCodeBlockProps
 * @property {string} [language]
 */
export default class MDCodeBlock extends MDElement {
	/** @type {string} */
	tag = "<pre>"
	/** @type {string | {(el: MDCodeBlock): string}} */
	// @ts-ignore MDCodeBlock extends MDElement
	mdTag = (el) => "```" + el.language + "\n"
	/** @type {string} */
	mdEnd = "\n```\n"
	/** @type {string} */
	end = "</pre>"
	/** @type {string} */
	language
	/**
	 * @param {MDCodeBlockProps & MDElementProps} props
	 */
	constructor(props = {}) {
		super(props)
		const {
			language = ""
		} = props
		this.language = String(language)
	}

	toHTML(props = {}) {
		if (this.language) {
			return `${this.tag}<code class="language-${this.language}">${this.content}</code>${this.end}`
		}
		return super.toHTML(props)
	}

	/**
	 * @param {string} text
	 * @param {{i?: number, rows?: string[]}} context
	 * @returns {MDCodeBlock|false}
	 */
	static parse(text, context = { i: 0, rows: [] }) {
		const { i = 0, rows = [] } = context
		const match = text.match(/^```\s*(.*?)\s*$/)
		if (!match) {
			return false
		}
		const language = match[1]
		let j = i + 1

		const contentLines = []
		while (j < rows.length && !rows[j].startsWith("```")) {
			contentLines.push(rows[j])
			j++
		}

		if (j >= rows.length) {
			return false // Missing closing ```
		}

		const content = contentLines.join("\n")

		context.i = j + 1
		return new MDCodeBlock({
			language,
			content
		})
	}
}
