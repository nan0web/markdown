export default MDTaskList;
/**
 * Task list element.
 */
declare class MDTaskList extends MDList {
    /**
     * Parse a task list block from markdown.
     * @param {string} text
     * @param {object} context
     * @returns {MDTaskList | false}
     */
    static parse(text: string, context?: object): MDTaskList | false;
}
import MDList from "./MDList.js";
