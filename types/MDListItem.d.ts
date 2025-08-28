/**
 * List item element.
 */
export default class MDListItem extends MDElement {
    static parse(text: any): false | MDListItem;
    tag: string;
    end: string;
    mdTag: string;
    mdEnd: string;
}
import MDElement from "./MDElement.js";
