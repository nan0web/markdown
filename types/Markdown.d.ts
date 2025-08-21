/**
 * Markdown parser for nanoweb.
 * Parses markdown to object by new lines.
 * @link https://www.markdownguide.org/cheat-sheet/
 */
export default class Markdown {
    static ELEMENTS: (typeof MDParagraph)[];
    /**
     * @param {object} [input]
     * @param {MDElement} [input.document]
     */
    constructor(input?: {
        document?: MDElement | undefined;
    } | undefined);
    /** @type {MDElement} */
    document: MDElement;
    /**
     * Parse markdown text into elements.
     * @param {string} text
     * @returns {MDElement[]} - Root element children
     */
    parse(text: string): MDElement[];
    /**
     * Stringify elements to HTML string.
     * @param {(element: MDElement) => string | null} [interceptor]
     * @returns {string}
     */
    stringify(interceptor?: ((element: MDElement) => string | null) | undefined): string;
    /**
     * Convert element to HTML string.
     * @param {MDElement} el
     * @returns {string}
     */
    elementToHTML(el: MDElement): string;
}
import MDElement from "./MDElement.js";
import MDParagraph from "./MDParagraph.js";
