export default MDList;
/**
 * List element.
 */
declare class MDList extends MDElement {
    /**
     * Parse a list block from markdown.
     * @param {string} text
     * @param {{i:number, rows:string[]}} context
     * @returns {MDList|false}
     */
    static parse(text: string, context?: {
        i: number;
        rows: string[];
    }): MDList | false;
    constructor(props?: {});
    tag: string;
    end: string;
    mdTag: string;
    mdEnd: string;
    /** @type {boolean} */
    ordered: boolean;
    /**
     * Add an element or raw string to the list.
     * @param {MDElement | string} element
     * @returns {this}
     */
    add(element: MDElement | string): this;
}
import MDElement from "./MDElement.js";
