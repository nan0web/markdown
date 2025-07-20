import MDHeading from "./MDHeading.js"

/**
 * Heading element.
 */
export default class MDHeading5 extends MDHeading {
	tag = "<h5>"
	end = "</h5>"
	mdTag = "##### "
	mdEnd = "\n"

	static parse(text) {
		const match = text.match(/^#####\s+(.*)$/)
		if (!match) {
			return false
		}
		return new MDHeading5({ content: match[1] })
	}
}
