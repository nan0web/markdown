import MDHeading from "./MDHeading.js"

/**
 * Heading element.
 */
export default class MDHeading6 extends MDHeading {
	tag = "<h6>"
	end = "</h6>"
	mdTag = "###### "
	mdEnd = "\n"

	static parse(text) {
		const match = text.match(/^######\s+(.*)$/)
		if (!match) {
			return false
		}
		return new MDHeading6({ content: match[1] })
	}
	/**
	 * @param {*} input
	 * @returns {MDHeading6}
	 */
	static from(input) {
		if (input instanceof MDHeading6) return input
		return new MDHeading6(input)
	}
}
