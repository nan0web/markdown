import MDElement from "./MDElement.js"
import MDListItem from "./MDListItem.js"

/**
 * List element.
 */
class MDList extends MDElement {
	tag = "<ul>"
	end = "</ul>"
	mdTag = "-"
	mdEnd = "\n"
	/** @type {boolean} */
	ordered = false

	constructor(props = {}) {
		super(props)
		const { ordered = false } = props
		this.ordered = ordered
		if (this.ordered) {
			this.tag = "<ol>"
			this.end = "</ol>"
			this.mdTag = "1."
		}
	}

	/**
	 * Parse a list block from markdown.
	 * @param {string} text
	 * @param {object} context
	 * @returns {MDList|false}
	 */
	static parse(text, context = {}) {
		const { i = 0, rows = [] } = context
		const match = text.match(/^(-|\d+\.)\s+(.*)$/)
		if (!match) {
			return false
		}
		const ordered = match[1].endsWith(".")
		const children = []
		let j = i
		while (j < rows.length) {
			const row = rows[j]
			const itemMatch = row.match(/^(-|\d+\.)\s+(.*)$/)
			if (!itemMatch) break
			children.push(new MDListItem({ content: itemMatch[2] }))
			j++
		}
		context.i = j
		return new MDList({
			ordered,
			children
		})
	}
}

export default MDList