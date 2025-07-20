import MDHeading from "./MDHeading.js"

/**
 * Heading element.
 */
export default class MDHeading4 extends MDHeading {
	tag = "<h4>"
	end = "</h4>"
	mdTag = "#### "
	mdEnd = "\n"

	static parse(text) {
		const match = text.match(/^####\s+(.*)$/)
		if (!match) {
			return false
		}
		return new MDHeading4({ content: match[1] })
	}
}
