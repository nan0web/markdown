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
	/** @type {string | {(el: MDElement): string}} */
	mdTag
	/** @type {string | {(el: MDElement): string}} */
	mdEnd
	/** @type {string | {(el: MDElement): string}} */
	tag
	/** @type {string | {(el: MDElement): string}} */
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
		this.tag = "function" === typeof tag ? tag : String(tag)
		this.end = "function" === typeof end ? end : String(end)
		this.mdTag = "function" === typeof mdTag ? mdTag : String(mdTag)
		this.mdEnd = "function" === typeof mdEnd ? mdEnd : String(mdEnd)
		this.children = children.map(child => MDElement.from(child))
	}

	get empty() {
		return 0 === this.content.length + this.children.length
	}

	/**
	 * Returns the most recent (deepest) container.
	 *
	 * @returns {MDElement}
	 */
	get recent() {
		return MDElement.from(super.recent)
	}
	/**
	 * Removes the element from the container.
	 * @param {MDElement} element
	 * @returns {this}
	 */
	remove(element) {
		return super.remove(element)
	}
	/**
	 * Finds an element by filter.
	 *
	 * @param {(v:MDElement) => boolean} filter
	 * @param {boolean} [recursively=false]
	 * @returns {*}
	 */
	find(filter, recursively = false) {
		return super.find(filter, recursively)
	}
	/**
	 * Flattens the tree into an array.
	 *
	 * @returns {MDElement[]}
	 */
	flat() {
		return super.flat().map(el => MDElement.from(el))
	}
	toArray() {
		return super.toArray().map(el => MDElement.from(el))
	}
	/**
	 * Filters children.
	 *
	 * @param {(v:MDElement) => boolean} [filter=()=>true]
	 * @param {boolean} [recursively=false]
	 * @returns {MDElement[]}
	 */
	filter(filter, recursively = false) {
		return super.filter(filter, recursively).map(el => MDElement.from(el))
	}
	/**
	 * Maps over children.
	 *
	 * @param {(value: MDElement, index: number, arr: MDElement[]) => any} callback
	 * @param {boolean} [recursively=false]
	 * @returns {Array}
	 */
	map(callback, recursively = false) {
		// @ts-ignore MDElement extends ContainerObject
		return super.map(callback, recursively)
	}
	/**
	 * Asynchronously maps over children.
	 *
	 * @param {(value: MDElement, index: number, arr: MDElement[]) => Promise<any>} callback
	 * @param {boolean} [recursively=false]
	 * @returns {Promise<Array>}
	 */
	async asyncMap(callback, recursively = false) {
		// @ts-ignore MDElement extends ContainerObject
		return await super.asyncMap(callback, recursively)
	}


	/**
	 * @throws
	 * @param {MDElement} element Element to add.
	 * @return {this} The current instance.
	 */
	add(element) {
		if (!(element instanceof MDElement)) {
			throw new TypeError("Only markdown elements can be added to markdown document")
		}
		super.add(element)
		return this
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
		const mdTag = "function" === typeof this.mdTag ? this.mdTag(this) : this.mdTag
		const mdEnd = "function" === typeof this.mdEnd ? this.mdEnd(this) : this.mdEnd
		const contentLine = mdTag + this.content + mdEnd
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
		const tag = "function" === typeof this.tag ? this.tag(this) : this.tag
		const end = "function" === typeof this.end ? this.end(this) : this.end
		const contentLine = indentStr + tag + this.content + end
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
