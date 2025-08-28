/**
 * Table cell element.
 */
export default class MDTableCell extends MDElement {
    static parse(text: any, context?: {}): false | MDTableCell;
    tag: string;
    end: string;
    mdTag: string;
    mdEnd: string;
}
import MDElement from "./MDElement.js";
