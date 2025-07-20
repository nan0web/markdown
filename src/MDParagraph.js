import MDElement from "./MDElement.js"

/**
 * Paragraph element.
 */
export default class MDParagraph extends MDElement {
	tag = "<p>"
	end = "</p>"
	mdTag = "\n"
	mdEnd = "\n"

	static parse(text, context = {}) {
		let { i = 0, rows = [] } = context
		const match = text.match(/^.*$/)
		if (!match) {
			return false
		}
		const content = match[0]
		i = i + match[0].length
		return new MDParagraph({
			content
		})
	}
}
