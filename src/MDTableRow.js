import MDElement from "./MDElement.js"

/**
 * Table row element.
 */
export default class MDTableRow extends MDElement {
	static get defaultTag() { return "<tr>" }
	static get defaultEnd() { return "</tr>" }
	static get defaultMdTag() { return "|" }
	static get defaultMdEnd() { return "|\n" }

	static parse(text) {
		const match = text.match(/^(\|.*\|)$/)
		if (!match) {
			return false
		}
		return new MDTableRow({ content: match[1] })
	}
}
