export default MDOrderedList;
/**
 * Ordered list element – implements its own logic instead of extending MDList
 * to avoid circular import issues.
 */
declare class MDOrderedList extends MDList {
}
declare namespace MDOrderedList {
    /**
     * Parses an ordered list block from markdown.
     * @param {string} text
     * @param {{i:number, rows:string[]}} context
     * @returns {MDOrderedList|false}
     */
    function parse(text: string, context?: {
        i: number;
        rows: string[];
    }): false | MDOrderedList;
}
import MDList from "./MDList.js";
