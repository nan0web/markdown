import { describe, it } from "node:test"
import assert from "node:assert"
import MDCodeInline from "./MDCodeInline.js"

describe("MDCodeInline", () => {
	it("should create instance", () => {
		const code = new MDCodeInline({ content: "inline code", tag: "<code>", end: "</code>" })
		assert.strictEqual(code.content, "inline code")
		assert.strictEqual(code.tag, "<code>")
		assert.strictEqual(code.end, "</code>")
	})

	it("should parse from text", () => {
		const result = MDCodeInline.parse("`example`")
		assert.ok(result instanceof MDCodeInline)
		assert.strictEqual(result.content, "example")
	})

	it("should return false when no match", () => {
		const result = MDCodeInline.parse("not inline code")
		assert.strictEqual(result, false)
	})

	it("should stringify properly", () => {
		const code = new MDCodeInline({ content: "test" })
		assert.strictEqual(String(code), "`test`")
	})
})
