import MDElement from "./MDElement.js"

class InterceptorInput {
	/** @type {MDElement} */
	element
	/** @type {MDElement[]} */
	path
	/**
	 *
	 * @param {object} input
	 * @param {MDElement} input.element
	 * @param {MDElement[]} [input.path=[]]
	 */
	constructor(input) {
		const {
			element,
			path = [],
		} = input
		this.element = element
		this.path = path
	}
}

export default InterceptorInput
