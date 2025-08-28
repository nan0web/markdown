import MDElement from "./MDElement.js"

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
	mdEnd = "\n```"
	/** @type {string} */
	end = "</pre>"
	/** @type {string} */
	language
	/**
	 * @param {MDCodeBlockProps & import("./MDElement.js").MDElementProps} props
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

	static parse(text, context = {}) {
		const { i = 0, rows = [] } = context
		const match = text.match(/^```\s*(.*?)\s*$/)
		if (!match) {
			return false
		}
		const language = match[1]
		let j = i + 1
		for (; j < rows.length; j++) {
			if (rows[j].startsWith("```")) {
				break
			}
		}
		const content = rows.slice(i + 1, j).join("\n")
		context.i = j
		return new MDCodeBlock({
			language,
			content
		})
	}
}
