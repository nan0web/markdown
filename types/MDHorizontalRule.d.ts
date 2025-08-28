/**
 * Horizontal rule element.
 */
export default class MDHorizontalRule extends MDElement {
    static parse(text: any): false | MDHorizontalRule;
    tag: string;
    mdTag: string;
    mdEnd: string;
    end: string;
}
import MDElement from "./MDElement.js";
