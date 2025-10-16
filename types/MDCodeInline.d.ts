/**
 * Inline code element.
 */
export default class MDCodeInline extends MDElement {
    /**
     * @param {string} text
     * @param {object} context
     * @returns {MDCodeInline|false}
     */
    static parse(text: string, context?: object): MDCodeInline | false;
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
