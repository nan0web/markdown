import { test } from "node:test"
import assert from "node:assert"
import MDLink from "./MDLink.js"

test("MDLink should create with default href empty", () => {
	const link = new MDLink({ content: "link", tag: "<a>", end: "</a>" })
	assert.strictEqual(link.href, "")
	assert.strictEqual(link.content, "link")
})

test("MDLink should create with href", () => {
	const link = new MDLink({ content: "link", tag: "<a>", end: "</a>", href: "https://example.com" })
	assert.strictEqual(link.href, "https://example.com")
})
