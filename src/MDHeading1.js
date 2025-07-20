import MDHeading from "./MDHeading.js"

/**
 * Heading element.
 */
class MDHeading1 extends MDHeading {
	tag = "<h1>"
	end = "</h1>"
	mdTag = "# "
	mdEnd = "\n"

	static parse(text) {
		const match = text.match(/^#\s+(.*)$/)
		if (!match) {
			return false
		}
		return new MDHeading1({ content: match[1] })
	}
}

export default MDHeading1
