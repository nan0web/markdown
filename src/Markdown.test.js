import { describe, it } from "node:test"
import assert from "node:assert"
import Markdown from "./Markdown.js"
import MDHeading1 from "./MDHeading1.js"
import MDHeading2 from "./MDHeading2.js"
import MDHeading3 from "./MDHeading3.js"
import MDParagraph from "./MDParagraph.js"
import MDOrderedList from "./MDOrderedList.js"
import MDList from "./MDList.js"
import MDListItem from "./MDListItem.js"
import MDCodeBlock from "./MDCodeBlock.js"
import MDBlockquote from "./MDBlockquote.js"
import MDHorizontalRule from "./MDHorizontalRule.js"

describe("Markdown", () => {

	it("Markdown parser should parse headings", () => {
		const md = new Markdown()
		const elements = md.parse("# Heading 1\n## Heading 2\n### Heading 3")
		assert.strictEqual(elements.length, 3)
		assert.ok(elements[0] instanceof MDHeading1)
		assert.strictEqual(elements[0].content, "Heading 1")
		assert.ok(elements[1] instanceof MDHeading2)
		assert.ok(elements[2] instanceof MDHeading3)
	})

	it("Markdown parser should parse paragraphs", () => {
		const md = new Markdown()
		const elements = md.parse("This is a paragraph.\n\nAnother paragraph.")
		assert.strictEqual(elements.length, 2)
		assert.ok(elements[0] instanceof MDParagraph)
		assert.strictEqual(elements[0].content, "This is a paragraph.")
		assert.strictEqual(elements[1].content, "Another paragraph.")
	})

	it("Markdown parser should parse ordered list", () => {
		const md = new Markdown()
		const elements = md.parse("1. first\n2. second\n3. third")
		assert.strictEqual(elements.length, 1)
		const list = elements[0]
		assert.ok(list instanceof MDOrderedList)
		assert.strictEqual(list.ordered, true)
		assert.strictEqual(list.children.length, 3)
		assert.strictEqual(list.children[1].content, "second")
	})

	it("Markdown parser should parse unordered list", () => {
		const md = new Markdown()
		const elements = md.parse("- item 1\n- item 2\n- item 3")
		assert.strictEqual(elements.length, 1)
		const list = elements[0]
		assert.ok(list instanceof MDList)
		assert.strictEqual(list.ordered, false)
		assert.strictEqual(list.children.length, 3)
		assert.strictEqual(list.children[0].content, "item 1")
	})

	it("Markdown parser should parse code block", () => {
		const md = new Markdown()
		const elements = md.parse("```js\nconsole.log('hi')\n```")
		assert.strictEqual(elements.length, 1)
		const code = elements[0]
		assert.ok(code instanceof MDCodeBlock)
		assert.strictEqual(code.language, "js")
		assert.strictEqual(code.content, "console.log('hi')")
	})

	it("Markdown parser should parse blockquote", () => {
		const md = new Markdown()
		const elements = md.parse("> quote line 1\n> quote line 2")
		assert.strictEqual(elements.length, 1)
		const bq = elements[0]
		assert.ok(bq instanceof MDBlockquote)
		assert.strictEqual(bq.content, "quote line 1\nquote line 2")
	})

	it("Markdown parser should parse horizontal rule", () => {
		const md = new Markdown()
		const elements = md.parse("---")
		assert.strictEqual(elements.length, 1)
		assert.ok(elements[0] instanceof MDHorizontalRule)
	})

	it("Markdown parser should stringify to html", () => {
		const md = new Markdown()
		md.parse("# Title\n\nParagraph\n\n1. first\n2. second\n\n```js\ncode\n```")
		const html = md.stringify()
		assert.ok(html.includes("<h1>Title</h1>"))
		assert.ok(html.includes("<p>Paragraph</p>"))
		assert.ok(html.includes("<ol>"))
		assert.ok(html.includes("<pre><code class=\"language-js\">code</code></pre>"))
	})

	it("Markdown parser should allow interceptor in stringify", () => {
		const md = new Markdown()
		md.parse("# Title")
		const html = md.stringify(({ element }) => {
			if (element instanceof MDHeading1) {
				return `<h1 class="custom">${element.content}</h1>`
			}
			return null
		})
		assert.strictEqual(html, '<h1 class="custom">Title</h1>')
	})

	it("Markdown parser should allow interceptor in async stringify", async () => {
		const md = new Markdown()
		md.parse("# Title")
		const html = await md.asyncStringify(async ({ element }) => {
			if (element instanceof MDHeading1) {
				return `<h1 class="custom">${element.content}</h1>`
			}
			return null
		})
		assert.strictEqual(html, '<h1 class="custom">Title</h1>')
	})
})
