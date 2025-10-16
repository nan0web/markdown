import MDElement from "./MDElement.js"

/**
 * Inline code element.
 */
export default class MDCodeInline extends MDElement {
	/** @type {string} */
	tag = "<code>"
	/** @type {string} */
	mdTag = "`"
	/** @type {string} */
	mdEnd = "`"
	/** @type {string} */
	end = "</code>"

	/**
	 * @param {string} text
	 * @param {object} context
	 * @returns {MDCodeInline|false}
	 */
	static parse(text, context = {}) {
		const match = text.match(/`([^`]*)`/)
		if (!match) {
			return false
		}
		const content = match[1]
		return new MDCodeInline({ content })
	}
}
