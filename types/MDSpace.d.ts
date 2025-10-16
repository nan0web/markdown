/**
 * Space element for representing empty lines or whitespace blocks.
 */
export default class MDSpace extends MDElement {
    /**
     * @param {string} text
     * @param {{i?: number, rows?: string[]}} [context={}]
     * @returns {MDSpace|false}
     */
    static parse(text: string, context?: {
        i?: number | undefined;
        rows?: string[] | undefined;
    } | undefined): MDSpace | false;
    constructor(props?: {});
    tag: string;
    end: string;
    mdTag: string;
    mdEnd: string;
    content: any;
}
import MDElement from "./MDElement.js";
