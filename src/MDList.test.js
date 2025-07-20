import { test } from "node:test"
import assert from "node:assert"
import MDList from "./MDList.js"

test("MDList should create unordered list by default", () => {
	const list = new MDList({ tag: "<ul>" })
	assert.strictEqual(list.ordered, false)
	assert.strictEqual(list.tag, "<ul>")
})

test("MDList should create ordered list", () => {
	const list = new MDList({ tag: "<ol>", ordered: true })
	assert.strictEqual(list.ordered, true)
	assert.strictEqual(list.tag, "<ol>")
})