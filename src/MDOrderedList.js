import MDList from "./MDList.js"
import MDListItem from "./MDListItem.js"

/**
 * Ordered list element.
 */
export default class MDOrderedList extends MDList {
	mdTag = "1."
	mdEnd = "\n"

	constructor(props = {}) {
		super({ ...props, ordered: true })
	}

	/**
	 * Parse an ordered list block from markdown.
	 * @param {string} text
	 * @param {object} context
	 * @returns {MDOrderedList|false}
	 */
	static parse(text, context = {}) {
		const { i = 0, rows = [] } = context
		const match = text.match(/^(\d+)\.\s+(.*)$/)
		if (!match) {
			return false
		}
		const children = []
		let j = i
		while (j < rows.length) {
			const row = rows[j]
			const itemMatch = row.match(/^(\d+)\.\s+(.*)$/)
			if (!itemMatch) break
			children.push(new MDListItem({ content: itemMatch[2] }))
			j++
		}
		context.i = j
		return new MDOrderedList({
			children
		})
	}
}