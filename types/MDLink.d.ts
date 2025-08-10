export default MDLink;
/**
 * Link element.
 */
declare class MDLink extends MDElement {
    /**
     *
     * @param {string} text
     * @param {{ i:number, rows:string[] }} [context]
     * @returns {MDLink|false}
     */
    static parse(text: string, context?: {
        i: number;
        rows: string[];
    } | undefined): MDLink | false;
    /**
     * @param {object} props
     */
    constructor(props?: object);
    /** @type {string} */
    href: string;
    toHTML(props?: {}): string;
}
import MDElement from "./MDElement.js";
