import MDHeading from "./MDHeading.js"

/**
 * Heading element.
 */
export default class MDHeading2 extends MDHeading {
	tag = "<h2>"
	end = "</h2>"
	mdTag = "## "
	mdEnd = "\n"

	static parse(text) {
		const match = text.match(/^##\s+(.*)$/)
		if (!match) {
			return false
		}
		return new MDHeading2({ content: match[1] })
	}
	/**
	 * @param {*} input
	 * @returns {MDHeading2}
	 */
	static from(input) {
		if (input instanceof MDHeading2) return input
		return new MDHeading2(input)
	}
}
