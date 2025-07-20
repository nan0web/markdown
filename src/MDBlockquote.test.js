import { test } from "node:test"
import assert from "node:assert"
import MDBlockquote from "./MDBlockquote.js"

test("MDBlockquote should create instance", () => {
	const bq = new MDBlockquote({ content: "quote", tag: "<blockquote>", end: "</blockquote>" })
	assert.strictEqual(bq.content, "quote")
	assert.strictEqual(bq.tag, "<blockquote>")
	assert.strictEqual(bq.end, "</blockquote>")
})