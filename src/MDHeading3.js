import MDHeading from "./MDHeading.js"

/**
 * Heading element.
 */
export default class MDHeading3 extends MDHeading {
	tag = "<h3>"
	end = "</h3>"
	mdTag = "### "
	mdEnd = "\n"

	static parse(text) {
		const match = text.match(/^###\s+(.*)$/)
		if (!match) {
			return false
		}
		return new MDHeading3({ content: match[1] })
	}
	/**
	 * @param {*} input
	 * @returns {MDHeading3}
	 */
	static from(input) {
		if (input instanceof MDHeading3) return input
		return new MDHeading3(input)
	}
}
