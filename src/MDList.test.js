import { describe, it } from "node:test"
import assert from "node:assert"
import MDList from "./MDList.js"

describe("MDList", () => {
	it("should create unordered list by default", () => {
		const list = new MDList({ tag: "<ul>" })
		assert.strictEqual(list.ordered, false)
		assert.strictEqual(list.tag, "<ul>")
	})

	it("should create ordered list", () => {
		const list = new MDList({ tag: "<ol>", ordered: true })
		assert.strictEqual(list.ordered, true)
		assert.strictEqual(list.tag, "<ol>")
	})

	it("should add items into list", () => {
		const list = new MDList()
		list.add("Information")
		list.add("can be stored")
		list.add("in the lists")
		assert.equal(String(list), [
			"- Information",
			"- can be stored",
			"- in the lists",
			"", ""
		].join("\n"))
	})
})
