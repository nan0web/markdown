import { test } from "node:test"
import assert from "node:assert"
import MDTable from "./MDTable.js"

test("MDTable should create instance", () => {
	const table = new MDTable({ tag: "<table>", content: "", end: "</table>" })
	assert.strictEqual(table.tag, "<table>")
	assert.strictEqual(table.content, "")
	assert.strictEqual(table.end, "</table>")
})

test("MDTable should parse valid markdown table", () => {
	const md = [
		"| Header 1 | Header 2 | Header 3 |",
		"|----------|----------|----------|",
		"| Cell 1  | Cell 2  | Cell 3  |",
		"| Cell 4  | Cell 5  | Cell 6  |",
	].join("\n")
	const table = MDTable.parse(md)
	assert.ok(table instanceof MDTable)
	assert.strictEqual(table.content, md)
	assert.ok(Array.isArray(table.children))
	assert.strictEqual(table.children.length, 4)
})

test("MDTable should return false for non-table text", () => {
	const notTable1 = "This is not a table"
	const notTable2 = "| Not a table without separator |"
	const notTable3 = [
		"| Header 1 | Header 2 |",
		"Not a separator line",
		"| Cell 1  | Cell 2  |",
	].join("\n")
	assert.strictEqual(MDTable.parse(notTable1), false)
	assert.strictEqual(MDTable.parse(notTable2), false)
	assert.strictEqual(MDTable.parse(notTable3), false)
})

test("MDTable should return false for table missing starting or ending pipes", () => {
	const missingStart = [
		" Header 1 | Header 2 |",
		"|---------|----------|",
		"| Cell 1 | Cell 2 |",
	].join("\n")
	const missingEnd = [
		"| Header 1 | Header 2 ",
		"|---------|----------",
		"| Cell 1 | Cell 2 ",
	].join("\n")
	assert.strictEqual(MDTable.parse(missingStart), false)
	assert.strictEqual(MDTable.parse(missingEnd), false)
})
