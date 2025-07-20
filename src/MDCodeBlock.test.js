import { test } from "node:test"
import assert from "node:assert"
import MDCodeBlock from "./MDCodeBlock.js"

test("MDCodeBlock should create with default language empty", () => {
	const code = new MDCodeBlock({ content: "code", tag: "<pre>", end: "</pre>" })
	assert.strictEqual(code.language, "")
	assert.strictEqual(code.content, "code")
})

test("MDCodeBlock should create with language", () => {
	const code = new MDCodeBlock({ content: "code", tag: "<pre>", end: "</pre>", language: "js" })
	assert.strictEqual(code.language, "js")
})