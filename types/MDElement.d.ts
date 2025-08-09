export default MDElement;
/**
 * Base class for markdown elements.
 */
export type MDElementProps = {
    content?: string | undefined;
    tag?: string | undefined;
    end?: string | undefined;
    mdTag?: string | undefined;
    mdEnd?: string | undefined;
    children?: MDElement[] | undefined;
};
/**
 * Base class for markdown elements.
 * @typedef {Object} MDElementProps
 * @property {string} [content]
 * @property {string} [tag]
 * @property {string} [end]
 * @property {string} [mdTag]
 * @property {string} [mdEnd]
 * @property {MDElement[]} [children]
 */
declare class MDElement {
    static TAG_MARKDOWN: string;
    /**
     * Create an element from a props object or string.
     * @param {MDElement | object | string} input
     * @returns {MDElement}
     */
    static from(input: MDElement | object | string): MDElement;
    /**
     * @param {MDElementProps} props
     */
    constructor(props?: MDElementProps);
    /** @type {string} */
    content: string;
    /** @type {string} */
    mdTag: string;
    /** @type {string} */
    mdEnd: string;
    /** @type {string} */
    tag: string;
    /** @type {string} */
    end: string;
    /** @type {MDElement[]} */
    children: MDElement[];
    get empty(): boolean;
    /**
     * @throws
     * @param {MDElement} element Element to add.
     * @return {MDElement} The added element.
     */
    add(element: MDElement): MDElement;
    /**
     * Convert element and children to string with indentation.
     * @param {object} props
     * @param {number} [props.indent=0]
     * @param {string} [props.format=".md"]
     * @returns {string}
     */
    toString(props?: {
        indent?: number | undefined;
        format?: string | undefined;
    }): string;
    /**
     * Convert element and children to HTML string with indentation.
     * @param {object} props
     * @param {number} [props.indent=0]
     * @returns {string}
     */
    toHTML(props?: {
        indent?: number | undefined;
    }): string;
}
