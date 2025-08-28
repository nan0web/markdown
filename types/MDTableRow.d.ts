/**
 * Table row element.
 */
export default class MDTableRow extends MDElement {
    static parse(text: any): false | MDTableRow;
    tag: string;
    end: string;
    mdTag: string;
    mdEnd: string;
}
import MDElement from "./MDElement.js";
