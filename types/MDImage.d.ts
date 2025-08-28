export default MDImage;
/**
 * Image element.
 */
declare class MDImage extends MDElement {
    static parse(text: any, context?: {}): false | MDImage;
    /**
     * @todo fix jsdoc
     */
    constructor(props?: {});
    tag: string;
    mdTag: string;
    mdEnd: string;
    end: string;
    /** @type {string} */
    src: string;
    toString(props?: {}): string;
    toHTML(props?: {}): string;
}
import MDElement from "./MDElement.js";
