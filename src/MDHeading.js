import MDElement from "./MDElement.js"

/**
 * Heading element.
 */
export default class MDHeading extends MDElement {
	/** @type {((el: MDHeading) => string)} */
	static get defaultTag() { return el => `<h${el.heading}>` }
	/** @type {((el: MDHeading) => string)} */
	static get defaultEnd() { return el => `</h${el.heading}>` }
	/** @type {((el: MDHeading) => string)} */
	static get defaultMdTag() { return el => "#".repeat(el.heading) + " " }
	static get defaultMdEnd() { return "\n" }

	/**
	 * Gets the heading level based on mdTag.
	 * @returns {number}
	 */
	get heading() {
		const tag = "function" === typeof this.mdTag ? this.mdTag : this.mdTag
		if (typeof tag === "string") {
			return tag.split("#").length - 1
		}
		return 1
	}

	/**
	 * @param {object} input
	 * @returns {MDHeading}
	 */
	static from(input) {
		if (input instanceof MDHeading) return input
		return new MDHeading(input)
	}

	/**
	 * Parses a heading from markdown text.
	 * @param {string} text
	 * @returns {MDHeading|false}
	 */
	static parse(text) {
		const match = text.match(/^(\#{1,6})\s+(.*)$/)
		if (!match) {
			return false
		}
		const level = match[1].length ?? 1
		const content = match[2]
		return  new MDHeading({ content, mdTag: "#".repeat(level) + " " })
	}
}
