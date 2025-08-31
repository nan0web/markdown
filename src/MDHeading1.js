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
	/**
	 * @param {*} input
	 * @returns {MDHeading1}
	 */
	static from(input) {
		if (input instanceof MDHeading1) return input
		return new MDHeading1(input)
	}
}

export default MDHeading1
