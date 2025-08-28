/**
 * Paragraph element.
 */
export default class MDParagraph extends MDElement {
    static parse(text: any, context?: {}): false | MDParagraph;
    tag: string;
    end: string;
    mdTag: string;
    mdEnd: string;
}
import MDElement from "./MDElement.js";
