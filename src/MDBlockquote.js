import MDElement from "./MDElement.js"

/**
 * Blockquote element.
 */
export default class MDBlockquote extends MDElement {
	/** @type {string} */
	tag = "<blockquote>"
	/** @type {string} */
	mdTag = ">"
	/** @type {string} */
	mdEnd = "\n"
	/** @type {string} */
	end = "</blockquote>"

	static parse(text, context = {}) {
		let { i = 0, rows = [] } = context
		const match = text.match(/^>\s+(.*)$/)
		if (!match) {
			return false
		}
		if (rows.length && rows[i] === text) {
			let j = i + 1
			for (; j < rows.length; j++) {
				if (rows[j].startsWith(">")) {
					continue
				}
				i = j
				return new MDBlockquote({
					content: rows.slice(i, j).map(
						row => row.slice(1).trim()
					).join("\n")
				})
			}
			return new MDBlockquote({
				content: rows.slice(i, j).map(
					row => row.slice(1).trim()
				).join("\n")
			})
		}
		return new MDBlockquote({ content: match[1] })
	}
}
