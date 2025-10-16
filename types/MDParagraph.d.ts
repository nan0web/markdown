/**
 * Paragraph element.
 */
export default class MDParagraph extends MDElement {
    /**
     * @param {string} text
     * @param {ParseContext} [context={}]
     * @returns {MDParagraph|false}
     */
    static parse(text: string, context?: ParseContext | undefined): MDParagraph | false;
    tag: string;
    end: string;
    mdTag: string;
    mdEnd: string;
}
import MDElement from "./MDElement.js";
import ParseContext from "./Parse/Context.js";
