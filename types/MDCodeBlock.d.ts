/**
 * Code block element.
 * @typedef {Object} MDCodeBlockProps
 * @property {string} [language]
 */
export default class MDCodeBlock extends MDElement {
    static parse(text: any, context?: {}): false | MDCodeBlock;
    /**
     * @param {MDCodeBlockProps & import("./MDElement.js").MDElementProps} props
     */
    constructor(props?: MDCodeBlockProps & import("./MDElement.js").MDElementProps);
    /** @type {string} */
    tag: string;
    /** @type {string | {(el: MDCodeBlock): string}} */
    mdTag: string | ((el: MDCodeBlock) => string);
    /** @type {string} */
    mdEnd: string;
    /** @type {string} */
    end: string;
    /** @type {string} */
    language: string;
    toHTML(props?: {}): string;
}
/**
 * Code block element.
 */
export type MDCodeBlockProps = {
    language?: string | undefined;
};
import MDElement from "./MDElement.js";
