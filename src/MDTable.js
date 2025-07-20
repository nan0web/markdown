import MDElement from "./MDElement.js"

/**
 * Table element.
 */
export default class MDTable extends MDElement {
	tag = "<table>"
	end = "</table>"
	mdTag = "|"
	mdEnd = "|\n"

	/**
	 * Parses markdown table text into MDTable instance.
	 * @param {string} text - Markdown text to parse
	 * @param {object} context - Parsing context
	 * @returns {MDTable|false} Parsed MDTable instance or false if not a table
	 */
	static parse(text, context = {}) {
		let { i = 0, rows = [] } = context
		const el = new this()
		// Normalize text to ensure it ends with newline for mdEnd check
		const normalizedText = text.endsWith("\n") ? text : text + "\n"
		if (!normalizedText.startsWith(el.mdTag) || !normalizedText.endsWith(el.mdEnd)) {
			return false
		}
		// Split text into lines
		const lines = text.split("\n").filter(Boolean)
		// Basic validation: at least 2 lines (header + separator)
		if (lines.length < 2) return false
		// Validate separator line (second line) contains only pipes, dashes, colons, and spaces
		const separatorLine = lines[1].trim()
		if (!/^\|?[\s:-]+(\|[\s:-]+)*\|?$/.test(separatorLine)) return false

		// Validate all lines start and end with pipe
		for (const line of lines) {
			if (!line.trim().startsWith("|") || !line.trim().endsWith("|")) return false
		}

		// Create instance with content and children as rows
		const content = lines.join("\n")
		const children = lines.map(line => line.trim())

		return new MDTable({
			content,
			children
		})
	}
}