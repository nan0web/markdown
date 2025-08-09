/**
 * Campaign class extends MDHeading
 */
export class Campaign extends MDHeading2 {
    constructor(props?: {});
    /** @type {string} */
    name: string;
    /** @type {string[]} */
    keywords: string[];
    /** @type {AdGroup[]} */
    adGroups: AdGroup[];
}
/**
 * AdGroup class extends MDHeading
 */
export class AdGroup extends MDHeading3 {
    constructor(props?: {});
    /** @type {string} */
    name: string;
    /** @type {string[]} */
    keywords: string[];
    /** @type {string[]} */
    headlines: string[];
    /** @type {string[]} */
    descriptions: string[];
}
/**
 * Extended Markdown parser for campaign/ad group structure.
 */
export default class ExtendedMarkdown extends Markdown {
    constructor();
    /** @type {(Campaign|AdGroup|MDHeading)[]} */
    elements: (Campaign | AdGroup | MDHeading)[];
    /**
     * Parse markdown text into extended elements.
     * @param {string} text
     * @returns {(Campaign|AdGroup|MDHeading)[]}
     */
    parse(text: string): (Campaign | AdGroup | MDHeading)[];
}
import MDHeading2 from "./MDHeading2.js";
import MDHeading3 from "./MDHeading3.js";
import Markdown from "./Markdown.js";
import MDHeading from "./MDHeading.js";
