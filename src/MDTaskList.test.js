import { test } from "node:test"
import assert from "node:assert"
import MDTaskList from "./MDTaskList.js"

test("MDTaskList should create instance", () => {
	const taskList = new MDTaskList({ tag: "<ul>", content: "", end: "" })
	assert.strictEqual(taskList.tag, "<ul>")
	assert.strictEqual(taskList.content, "")
	assert.strictEqual(taskList.end, "")
})