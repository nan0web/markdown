class ParseContext {
	/** @type {number} */
	i = 0

	/** @type {string[]} */
	rows = []

	/**
	 * @param {object} input
	 * @param {number} [input.i]
	 * @param {string[]} [input.rows]
	 */
	constructor(input = {}) {
		const {
			i = 0,
			rows = []
		} = input
		this.i = i
		this.rows = rows
	}
}

export default ParseContext
