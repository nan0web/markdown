export default MDElement;
/**
 * Base class for markdown elements.
 */
export type MDElementProps = {
    content?: string | undefined;
    tag?: string | undefined;
    end?: string | undefined;
    mdTag?: string | undefined;
    mdEnd?: string | undefined;
    children?: MDElement[] | undefined;
};
/**
 * Base class for markdown elements.
 * @typedef {Object} MDElementProps
 * @property {string} [content]
 * @property {string} [tag]
 * @property {string} [end]
 * @property {string} [mdTag]
 * @property {string} [mdEnd]
 * @property {MDElement[]} [children]
 */
declare class MDElement extends ContainerObject {
    static TAG_MARKDOWN: string;
    /**
     * Create an element from a props object or string.
     * @param {MDElement | object | string} input
     * @returns {MDElement}
     */
    static from(input: MDElement | object | string): MDElement;
    /**
     * @param {MDElementProps} props
     */
    constructor(props?: MDElementProps);
    /** @type {string} */
    content: string;
    /** @type {string | {(el: MDElement): string}} */
    mdTag: string | ((el: MDElement) => string);
    /** @type {string | {(el: MDElement): string}} */
    mdEnd: string | ((el: MDElement) => string);
    /** @type {string | {(el: MDElement): string}} */
    tag: string | ((el: MDElement) => string);
    /** @type {string | {(el: MDElement): string}} */
    end: string | ((el: MDElement) => string);
    /** @type {MDElement[]} */
    children: MDElement[];
    get empty(): boolean;
    /**
     * Returns the most recent (deepest) container.
     *
     * @returns {MDElement}
     */
    get recent(): MDElement;
    /**
     * Removes the element from the container.
     * @param {MDElement} element
     * @returns {this}
     */
    remove(element: MDElement): this;
    /**
     * Finds an element by filter.
     *
     * @param {(v:MDElement) => boolean} filter
     * @param {boolean} [recursively=false]
     * @returns {*}
     */
    find(filter: (v: MDElement) => boolean, recursively?: boolean | undefined): any;
    /**
     * Flattens the tree into an array.
     *
     * @returns {MDElement[]}
     */
    flat(): MDElement[];
    toArray(): MDElement[];
    /**
     * Filters children.
     *
     * @param {(v:MDElement) => boolean} [filter=()=>true]
     * @param {boolean} [recursively=false]
     * @returns {MDElement[]}
     */
    filter(filter?: ((v: MDElement) => boolean) | undefined, recursively?: boolean | undefined): MDElement[];
    /**
     * Maps over children.
     *
     * @param {(value: MDElement, index: number, arr: MDElement[]) => any} callback
     * @param {boolean} [recursively=false]
     * @returns {Array}
     */
    map(callback: (value: MDElement, index: number, arr: MDElement[]) => any, recursively?: boolean | undefined): any[];
    /**
     * Asynchronously maps over children.
     *
     * @param {(value: MDElement, index: number, arr: MDElement[]) => Promise<any>} callback
     * @param {boolean} [recursively=false]
     * @returns {Promise<Array>}
     */
    asyncMap(callback: (value: MDElement, index: number, arr: MDElement[]) => Promise<any>, recursively?: boolean | undefined): Promise<any[]>;
    /**
     * @throws
     * @param {MDElement} element Element to add.
     * @return {this} The current instance.
     */
    add(element: MDElement): this;
    /**
     * Convert element and children to string with indentation.
     * @param {object} props
     * @param {number} [props.indent=0]
     * @param {string} [props.format=".md"]
     * @returns {string}
     */
    toString(props?: {
        indent?: number | undefined;
        format?: string | undefined;
    }): string;
    /**
     * Convert element and children to HTML string with indentation.
     * @param {object} props
     * @param {number} [props.indent=0]
     * @returns {string}
     */
    toHTML(props?: {
        indent?: number | undefined;
    }): string;
}
import { ContainerObject } from "@nan0web/types";
