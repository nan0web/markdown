export default MDList;
/**
 * List element.
 */
declare class MDList extends MDElement {
    /**
     * Parse a list block from markdown.
     * @param {string} text
     * @param {object} context
     * @returns {MDList|false}
     */
    static parse(text: string, context?: object): MDList | false;
    constructor(props?: {});
    /** @type {boolean} */
    ordered: boolean;
    /**
     * Add an element or raw string to the list.
     * @param {MDElement | string} element
     */
    add(element: MDElement | string): void;
}
import MDElement from "./MDElement.js";
