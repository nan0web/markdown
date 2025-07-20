import MDElement from "./MDElement.js"

/**
 * Table row element.
 */
export default class MDTableRow extends MDElement {
	tag = "<tr>"
	end = "</tr>"
	mdTag = "|"
	mdEnd = "|\n"

	static parse(text) {
		const match = text.match(/^(\|.*\|)$/)
		if (!match) {
			return false
		}
		return new MDTableRow({ content: match[1] })
	}
}
