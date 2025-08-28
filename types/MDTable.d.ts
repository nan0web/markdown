/**
 * Table element.
 */
export default class MDTable extends MDElement {
    /**
     * Parses markdown table text into MDTable instance.
     * @param {string} text - Markdown text to parse
     * @param {{i?:number, rows?:string[]}} context - Parsing context (unused)
     * @returns {MDTable|false} Parsed MDTable instance or false if not a table
     */
    static parse(text: string, context?: {
        i?: number;
        rows?: string[];
    }): MDTable | false;
    tag: string;
    end: string;
    mdTag: string;
    mdEnd: string;
}
import MDElement from "./MDElement.js";
