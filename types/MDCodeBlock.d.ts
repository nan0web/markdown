/** @typedef {import("./MDElement.js").MDElementProps} MDElementProps */
/**
 * Code block element.
 * @typedef {Object} MDCodeBlockProps
 * @property {string} [language]
 */
export default class MDCodeBlock extends MDElement {
    /**
     * @param {string} text
     * @param {{i?: number, rows?: string[]}} context
     * @returns {MDCodeBlock|false}
     */
    static parse(text: string, context?: {
        i?: number | undefined;
        rows?: string[] | undefined;
    }): MDCodeBlock | false;
    /**
     * @param {MDCodeBlockProps & MDElementProps} props
     */
    constructor(props?: MDCodeBlockProps & MDElementProps);
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
export type MDElementProps = import("./MDElement.js").MDElementProps;
/**
 * Code block element.
 */
export type MDCodeBlockProps = {
    language?: string | undefined;
};
import MDElement from "./MDElement.js";
