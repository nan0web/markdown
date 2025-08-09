export default ParseContext;
declare class ParseContext {
    /**
     * @param {object} input
     * @param {number} [input.i]
     * @param {string[]} [input.rows]
     */
    constructor(input?: {
        i?: number | undefined;
        rows?: string[] | undefined;
    });
    /** @type {number} */
    i: number;
    /** @type {string[]} */
    rows: string[];
}
