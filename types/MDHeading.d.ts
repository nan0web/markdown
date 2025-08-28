/**
 * Heading element.
 */
export default class MDHeading extends MDElement {
    tag: string;
    end: string;
    mdTag: string;
    mdEnd: string;
    /**
     * @returns {number}
     */
    get heading(): number;
}
import MDElement from "./MDElement.js";
