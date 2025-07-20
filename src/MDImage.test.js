import { test } from "node:test"
import assert from "node:assert"
import MDImage from "./MDImage.js"

test("MDImage should create with default src empty", () => {
	const img = new MDImage({ tag: "<img>", content: "alt", end: "/>" })
	assert.strictEqual(img.src, "")
	assert.strictEqual(img.content, "alt")
})

test("MDImage should create with src", () => {
	const img = new MDImage({ tag: "<img>", content: "alt", end: "/>", src: "image.png" })
	assert.strictEqual(img.src, "image.png")
})