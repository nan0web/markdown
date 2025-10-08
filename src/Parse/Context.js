export default class ParseContext {
	/** @type {number} */
	i = 0

	/** @type {string[]} */
	rows = []

	/** @type {Array} */
	skipped = []

	/**
	 * @param {object} input
	 * @param {number} [input.i]
	 * @param {string[]} [input.rows]
	 * @param {Array} [input.skipped]
	 */
	constructor(input = {}) {
		const {
			i = 0,
			rows = [],
			skipped = [],
		} = input
		this.i = i
		this.rows = rows
		this.skipped = skipped
	}
}
