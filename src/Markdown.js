import MDElement from "./MDElement.js"
import MDParagraph from "./MDParagraph.js"
import MDHeading1 from "./MDHeading1.js"
import MDHeading2 from "./MDHeading2.js"
import MDHeading3 from "./MDHeading3.js"
import MDHeading4 from "./MDHeading4.js"
import MDHeading5 from "./MDHeading5.js"
import MDHeading6 from "./MDHeading6.js"
import MDOrderedList from "./MDOrderedList.js"
import MDList from "./MDList.js"
import MDListItem from "./MDListItem.js"
import MDCodeBlock from "./MDCodeBlock.js"
import MDCodeInline from "./MDCodeInline.js"
import MDLink from "./MDLink.js"
import MDImage from "./MDImage.js"
import MDBlockquote from "./MDBlockquote.js"
import MDHorizontalRule from "./MDHorizontalRule.js"
import MDTable from "./MDTable.js"
import MDTableRow from "./MDTableRow.js"
import MDTableCell from "./MDTableCell.js"
import MDTaskList from "./MDTaskList.js"
import ParseContext from "./Parse/Context.js"

/**
 * Markdown parser for nanoweb.
 * Parses markdown to object by new lines.
 * @link https://www.markdownguide.org/cheat-sheet/
 */
export default class Markdown {
	static ELEMENTS = [
		MDHeading1,
		MDHeading2,
		MDHeading3,
		MDHeading4,
		MDHeading5,
		MDHeading6,
		MDOrderedList,
		MDList,
		MDListItem,
		MDBlockquote,
		MDHorizontalRule,
		MDTable,
		MDTableRow,
		MDTableCell,
		MDCodeBlock,
		MDCodeInline,
		MDLink,
		MDImage,
		MDTaskList,
		MDParagraph,
	]

	/** @type {MDElement} */
	document

	constructor(props = {}) {
		const {
			document = new MDElement()
		} = props
		this.document = document
	}

	/**
	 * Parse markdown text into elements.
	 * @param {string} text
	 * @returns {MDElement[]} - Root element children
	 */
	parse(text) {
		const lines = text.split("\n")
		const elements = []
		let i = 0
		while (i < lines.length) {
			let line = lines[i]
			if (line.trim() === "") {
				i++
				continue
			}
			let parsed = null
			let context = new ParseContext({ i, rows: lines })
			for (const Element of Markdown.ELEMENTS) {
				if ("function" !== typeof Element.parse) {
					throw new Error(`Element ${Element.name} has no static parse() method`)
				}
				parsed = Element.parse(line, context)
				if (parsed) {
					break
				}
			}
			if (!parsed) {
				// fallback to paragraph
				parsed = MDParagraph.parse(line, context)
			}
			// Update i based on parsed element
			if (parsed && parsed.constructor && parsed.constructor.name === "MDCodeBlock") {
				// Find end of code block
				let j = i + 1
				while (j < lines.length && !lines[j].startsWith("```")) {
					j++
				}
				j++ // skip closing ```
				i = j
			} else if (parsed && parsed.constructor && parsed.constructor.name === "MDBlockquote") {
				// Find end of blockquote
				let j = i
				while (j < lines.length && lines[j].startsWith(">")) {
					j++
				}
				i = j
			} else if (parsed && parsed.constructor &&
				(["MDList", "MDTaskList", "MDOrderedList"].includes(parsed.constructor.name))
			) {
				// Parse consecutive list items into a container
				const listType = parsed.constructor
				const ordered = parsed.ordered || false
				const list = new listType({ ordered, children: [] })
				while (i < lines.length) {
					const itemLine = lines[i]
					const itemParsed = MDListItem.parse(itemLine)
					if (!itemParsed) break
					list.add(itemParsed)
					i++
				}
				elements.push(list)
				continue
			} else {
				i++
			}
			elements.push(parsed)
		}
		this.document.children = elements
		return elements
	}

	/**
	 * Stringify elements to HTML string.
	 * @param {(element: MDElement) => string | null} [interceptor]
	 * @returns {string}
	 */
	stringify(interceptor) {
		const html = this.document.map(el => {
			if (interceptor) {
				const intercepted = interceptor(el)
				if (typeof intercepted === "string") return intercepted
			}
			return el.toHTML()
		}).join("\n")
		return html
	}

	/**
	 * Convert element to HTML string.
	 * @param {MDElement} el
	 * @returns {string}
	 */
	elementToHTML(el) {
		if (el instanceof MDHeading1 || el instanceof MDHeading2 || el instanceof MDHeading3 || el instanceof MDHeading4 || el instanceof MDHeading5 || el instanceof MDHeading6) {
			return `<${el.tag.slice(1, -1)}>${el.content}</${el.tag.slice(1, -1)}>`
		}
		if (el instanceof MDParagraph) {
			return `<p>${el.content}</p>`
		}
		if (el instanceof MDList || el instanceof MDOrderedList) {
			const tag = el.ordered ? "ol" : "ul"
			const items = el.children.map(child => `<li>${child.content}</li>`).join("")
			return `<${tag}>${items}</${tag}>`
		}
		if (el instanceof MDCodeBlock) {
			const langClass = el.language ? ` class="language-${el.language}"` : ""
			return `<pre><code${langClass}>${el.content}</code></pre>`
		}
		if (el instanceof MDBlockquote) {
			return `<blockquote>${el.content}</blockquote>`
		}
		if (el instanceof MDHorizontalRule) {
			return `<hr />`
		}
		// fallback to tag + content + end
		return el.tag + el.content + el.end
	}
}
