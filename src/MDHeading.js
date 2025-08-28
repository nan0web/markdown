import MDElement from "./MDElement.js"

/**
 * Heading element.
 */
export default class MDHeading extends MDElement {
	tag = "<h1>"
	end = "</h1>"
	mdTag = "# "
	mdEnd = "\n"
	/**
	 * @returns {number}
	 */
	get heading() {
		return this.mdTag.length - 1
	}
}
