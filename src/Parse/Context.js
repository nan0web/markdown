class ParseContext {
	/** @type {number} */
	i = 0

	/** @type {string[]} */
	rows = []

	/**
	 * @param {object} props
	 * @param {number} props.i
	 * @param {string[]} props.rows
	 */
	constructor(props = {}) {
		const {
			i = 0,
			rows = []
		} = props
		this.i = i
		this.rows = rows
	}
}

export default ParseContext
