export default Markdown;
/**
 * Markdown parser for nanoweb.
 * Parses markdown to object by new lines.
 * @link https://www.markdownguide.org/cheat-sheet/
 */
declare class Markdown {
    static ELEMENTS: (typeof MDParagraph | typeof MDCodeBlock)[];
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
     * @param {(element: InterceptorInput) => string | null} [interceptor]
     * @returns {string}
     */
    stringify(interceptor?: ((element: InterceptorInput) => string | null) | undefined): string;
    /**
     * Stringify elements to HTML string.
     * @param {(element: InterceptorInput) => Promise<string | null>} [interceptor]
     * @returns {Promise<string>}
     */
    asyncStringify(interceptor?: ((element: InterceptorInput) => Promise<string | null>) | undefined): Promise<string>;
    /**
     * Convert element to HTML string.
     * @param {MDElement} el
     * @returns {string}
     */
    elementToHTML(el: MDElement): string;
}
import MDElement from "./MDElement.js";
import InterceptorInput from "./InterceptorInput.js";
import MDParagraph from "./MDParagraph.js";
import MDCodeBlock from "./MDCodeBlock.js";
