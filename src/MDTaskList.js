import MDList from "./MDList.js"
import MDListItem from "./MDListItem.js"

/**
 * Task list element.
 */
class MDTaskList extends MDList {
	mdTag = "[ ] "
	mdEnd = " "
	end = ""

	constructor(props = {}) {
		super(props)
		this.end = ""
	}

	/**
	 * Parse a task list block from markdown.
	 * @param {string} text
	 * @param {object} context
	 * @returns {MDTaskList | false}
	 */
	static parse(text, context = {}) {
		const { i = 0, rows = [] } = context
		const match = text.match(/^- \[([ xX])\] (.*)$/)
		if (!match) {
			return false
		}
		const children = []
		let j = i
		while (j < rows.length) {
			const row = rows[j]
			const itemMatch = row.match(/^- \[([ xX])\] (.*)$/)
			if (!itemMatch) break
			children.push(new MDListItem({ content: row.slice(6) }))
			j++
		}
		return new MDTaskList({
			children
		})
	}
}

export default MDTaskList
