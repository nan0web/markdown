import MDElement from "./MDElement.js"

/**
 * Horizontal rule element.
 */
export default class MDHorizontalRule extends MDElement {
	tag = "<hr>"
	mdTag = "---"
	mdEnd = "\n"
	end = ""

	static parse(text) {
		const match = text.match(/^---$/)
		if (!match) {
			return false
		}
		return new this()
	}
}
