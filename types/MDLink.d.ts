/**
 * Link element.
 */
export default class MDLink extends MDElement {
    static parse(text: any, context?: {}): false | MDLink;
    /**
     * @todo fix jsdoc
     */
    constructor(props?: {});
    /** @type {string} */
    href: string;
    toHTML(props?: {}): string;
}
import MDElement from "./MDElement.js";
