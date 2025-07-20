/**
 * Base class for markdown elements.
 * @typedef {Object} MDElementProps
 * @property {string} [content]
 * @property {string} [tag]
 * @property {string} [end]
 * @property {MDElement[]} [children]
 */
class MDElement {
	static TAG_MARKDOWN = ""
	/** @type {string} */
	content
	/** @type {string} */
	mdTag
	/** @type {string} */
	mdEnd
	/** @type {string} */
	tag
	/** @type {string} */
	end
	/** @type {MDElement[]} */
	children
	/**
	 * @param {MDElementProps} props
	 */
	constructor(props = {}) {
		if ("string" === typeof props) {
			props = { content: props }
		}
		const {
			content = "",
			tag = "",
			end = "",
			children = []
		} = props
		this.content = content
		this.tag = tag
		this.end = end
		this.children = children
	}

	get recent() {
		return this.children[this.children.length - 1] || this
	}

	add(element) {
		this.children.push(element)
	}

	map(callback) {
		return this.children.map(callback)
	}

	/**
	 * Convert element and children to string with indentation.
	 * @param {object} props
	 * @param {number} [props.indent=0]
	 * @param {string} [props.format=".md"]
	 * @returns {string}
	 */
	toString(props = {}) {
		const {
			indent = 0,
			format = ".md",
		} = props
		if (".html" === format) {
			return this.toHTML(props)
		}
		const contentLine = this.mdTag + this.content + this.mdEnd
		const childrenLines = this.children.map(child => child.toString({ indent: indent + 2, format }))
		return [contentLine, ...childrenLines].join("\n")
	}

	/**
	 * Convert element and children to HTML string with indentation.
	 * @param {object} props
	 * @param {number} [props.indent=0]
	 * @returns {string}
	 */
	toHTML(props = {}) {
		const {
			indent = 0,
		} = props
		const indentStr = " ".repeat(indent)
		const contentLine = indentStr + this.tag + this.content + this.end
		const childrenLines = this.children.map(child => child.toHTML({ indent: indent + 2 }))
		return [contentLine, ...childrenLines].join("\n")
	}
	/**
	 * Create an element from a props object or string.
	 * @param {MDElement | object | string} props
	 * @returns {MDElement}
	 */
	static from(props) {
		if (props instanceof MDElement) return props
		return new this(props)
	}
}

export default MDElement
