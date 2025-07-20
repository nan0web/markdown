import MDElement from "./MDElement.js"

/**
 * Link element.
 */
export default class MDLink extends MDElement {
	/** @type {string} */
	tag = "<a"
	mdTag = "["
	mdEnd = "]("
	end = "</a>"
	/** @type {string} */
	href
	/**
	 * @todo fix jsdoc
	 */
	constructor(props = {}) {
		super(props)
		const {
			href = ""
		} = props
		this.href = href
	}
	toHTML(props = {}) {
		const {
			indent = 0,
		} = props
		return " ".repeat(indent) + `${this.tag} href="${this.href}">${this.content}${this.end}`
	}
	static parse(text, context = {}) {
		const { i = 0, rows = [] } = context
		const match = text.match(/^\[(.*?)\]\((.*?)\)$/)
		if (!match) {
			return false
		}
		const content = match[1]
		const href = match[2]
		i = i + match[0].length
		return new MDLink({
			content,
			href
		})
	}
}
