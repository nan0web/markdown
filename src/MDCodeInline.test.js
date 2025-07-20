import { test } from "node:test"
import assert from "node:assert"
import MDCodeInline from "./MDCodeInline.js"

test("MDCodeInline should create instance", () => {
	const code = new MDCodeInline({ content: "inline code", tag: "<code>", end: "</code>" })
	assert.strictEqual(code.content, "inline code")
	assert.strictEqual(code.tag, "<code>")
	assert.strictEqual(code.end, "</code>")
})