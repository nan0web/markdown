import { ContainerObject } from "@nan0web/types"

/**
 * Base class for markdown elements.
 * @typedef {Object} MDElementProps
 * @property {string} [content]
 * @property {string} [tag]
 * @property {string} [end]
 * @property {string} [mdTag]
 * @property {string} [mdEnd]
 * @property {MDElement[]} [children]
 */
class MDElement extends ContainerObject {
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
		super(props)
		const {
			content = "",
			tag = "",
			end = "",
			mdTag = "",
			mdEnd = "",
			children = []
		} = props
		this.content = String(content)
		this.tag = String(tag)
		this.end = String(end)
		this.mdTag = String(mdTag)
		this.mdEnd = String(mdEnd)
		this.children = children.map(child => MDElement.from(child))
	}

	get empty() {
		return 0 === this.content.length + this.children.length
	}

	/**
	 * @throws
	 * @param {MDElement} element Element to add.
	 * @return {MDElement} The added element.
	 */
	add(element) {
		if (!(element instanceof MDElement)) {
			throw new TypeError("Only markdown elements can be added to markdown document")
		}
		super.add(element)
		return element
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
		const contentLine = (this.mdTag ?? "") + this.content + (this.mdEnd ?? "")
		const childrenLines = this.children.map(child => child.toString({ indent: indent + 2, format }))
		return [contentLine, ...childrenLines].filter(s => "" !== s).join("")
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
	 * @param {MDElement | object | string} input
	 * @returns {MDElement}
	 */
	static from(input) {
		if (input instanceof MDElement) return input
		return new this(input)
	}

	[Symbol.for('nodejs.util.inspect.custom')]() {
		return this.toString()
	}
}

export default MDElement
