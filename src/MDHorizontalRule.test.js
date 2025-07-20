import { test } from "node:test"
import assert from "node:assert"
import MDHorizontalRule from "./MDHorizontalRule.js"

test("MDHorizontalRule should create instance", () => {
	const hr = new MDHorizontalRule({ tag: "<hr>", content: "", end: "" })
	assert.strictEqual(hr.tag, "<hr>")
	assert.strictEqual(hr.content, "")
	assert.strictEqual(hr.end, "")
})