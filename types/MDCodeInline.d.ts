/**
 * Inline code element.
 */
export default class MDCodeInline extends MDElement {
    static parse(text: any, context?: {}): false | MDCodeInline;
    /** @type {string} */
    tag: string;
    /** @type {string} */
    mdTag: string;
    /** @type {string} */
    mdEnd: string;
    /** @type {string} */
    end: string;
}
import MDElement from "./MDElement.js";
