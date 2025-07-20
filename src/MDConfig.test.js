import { describe, it, suite } from 'node:test'
import assert from 'node:assert'
import MDConfig from './MDConfig.js'
import ParseContext from './Parse/Context.js'

const correctConfigInput = [
	"---",
	"key1: value1",
	"# comment",
	"key2: value2",
	"---"
].join("\n")

const testMap = new Map([
	["Parse correct config", [
		correctConfigInput,
		new MDConfig({
			config: {
				key1: 'value1',
				key2: 'value2',
			},
			content: correctConfigInput.slice(4, -4),
			$comments: new Map([[2, 'comment']])
		}),
		5,
	]],
	["Parse correct config with empty key", [
		[
			"---",
			"",
			"key1: value1",
			"# comment",
			"",
			"key2: value2",
			"",
			"---"
		].join("\n"),
		false,
		0
	]],
])

suite('MDConfig', () => {
	describe('parse', () => {
		for (const [name, [text, expected, i]] of testMap) {
			it(name, () => {
				const context = new ParseContext({ i: 0, rows: text.split('\n') })
				const result = MDConfig.parse(text, context)
				assert.deepStrictEqual(result, expected)
				assert.strictEqual(context.i, i)

				if (result) {
					assert.strictEqual(text, String(result))
				}
			})
		}
	})
})
