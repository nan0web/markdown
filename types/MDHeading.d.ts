/**
 * Heading element.
 */
export default class MDHeading extends MDElement {
    /**
     * @param {object} input
     * @returns {MDHeading}
     */
    static from(input: object): MDHeading;
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
