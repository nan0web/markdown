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
	/**
	 * @param {*} input
	 * @returns {MDHeading5}
	 */
	static from(input) {
		if (input instanceof MDHeading5) return input
		return new MDHeading5(input)
	}
}
