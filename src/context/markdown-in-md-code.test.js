import { describe, it } from "node:test"
import assert from "node:assert"
import DB from "@nan0web/db-fs"
import Markdown from "../Markdown.js"

describe("Markdown in .md", () => {
	/** @type {DB} */
	const db = new DB()
	it.todo("should parse markdown code ```.md properly", async () => {
		const text = await db.loadDocumentAs(".txt", "src/context/markdown-in-md-code.md")
		const md = new Markdown()
		md.parse(text)
		assert.equal(md.document.children.length, 2)
	})
})
