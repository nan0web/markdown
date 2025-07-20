import { test } from "node:test"
import assert from "node:assert"
import MDParagraph from "./MDParagraph.js"

test("MDParagraph should create instance", () => {
	const p = new MDParagraph({ content: "text", tag: "<p>", end: "</p>" })
	assert.strictEqual(p.content, "text")
	assert.strictEqual(p.tag, "<p>")
	assert.strictEqual(p.end, "</p>")
	assert.deepStrictEqual(p.children, [])
})