import MDElement from "./MDElement.js"
import ParseContext from "./Parse/Context.js"

/**
 * Paragraph element.
 */
export default class MDParagraph extends MDElement {
	tag = "<p>"
	end = "</p>"
	mdTag = ""
	mdEnd = "\n\n"

	/**
	 * @param {string} text
	 * @param {ParseContext} [context={}]
	 * @returns {MDParagraph|false}
	 */
	static parse(text, context = new ParseContext()) {
		if ("" === text) return false

		let j = context.i

		if (j === context.rows.length - 1) {
			return new MDParagraph({ content: text })
		}

		const contentLines = []

		while (j < context.rows.length) {
			if (contentLines.length > 0 && "" === contentLines[contentLines.length - 1]) {
				contentLines.pop()
				break
			}
			if (context.skipped.some(Element => false !== Element.parse(context.rows[j]))) {
				break
			}
			// Collect all next paragraph lines
			contentLines.push(context.rows[j])
			j++
		}

		if (contentLines.length > 0) {
			context.i = j
			return new MDParagraph({ content: contentLines.join('\n') })
		}

		return false
	}
}
