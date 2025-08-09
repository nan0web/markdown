/**
 * Table element.
 */
export default class MDTable extends MDElement {
    /**
     * Parses markdown table text into MDTable instance.
     * @param {string} text - Markdown text to parse
     * @param {object} context - Parsing context
     * @returns {MDTable|false} Parsed MDTable instance or false if not a table
     */
    static parse(text: string, context?: object): MDTable | false;
}
import MDElement from "./MDElement.js";
