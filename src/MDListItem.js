import MDElement from "./MDElement.js"

/**
 * List item element.
 */
export default class MDListItem extends MDElement {
	tag = "<li>"
	end = "</li>"
	mdTag = "- "
	mdEnd = "\n"

	static parse(text) {
		const match = text.match(/^(-|\d+\.)\s+(.*)$/)
		if (!match) {
			return false
		}
		const content = match[2]
		return new MDListItem({
			content
		})
	}
}
