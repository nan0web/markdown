# @nan0web/markdown

|Package name|[Status](https://github.com/nan0web/monorepo/blob/main/system.md#написання-сценаріїв)|Documentation|Test coverage|Features|Npm version|
|---|---|---|---|---|---|
 |[@nan0web/markdown](https://github.com/nan0web/markdown/) |🟢 `97.1%` |🧪 [English 🏴󠁧󠁢󠁥󠁮󠁧󠁿](https://github.com/nan0web/markdown/blob/main/README.md)<br />[Українською 🇺🇦](https://github.com/nan0web/markdown/blob/main/docs/uk/README.md) |🟡 `83.9%` |✅ d.ts 📜 system.md 🕹️ playground |— |

A zero-dependency, extensible Markdown parser for nan0web.

Built with minimalism and clarity in mind, it provides a robust way to parse
Markdown into structured elements and render them as HTML or back to Markdown.

## Features

- Parses standard Markdown syntax into structured objects
- Supports headings, paragraphs, lists, code blocks, links, images, blockquotes, tables, and more
- Extensible element types for custom Markdown structures
- Converts Markdown to HTML
- Written in pure JavaScript with JSDoc typing

## Installation

How to install with npm?
```bash
npm install @nan0web/markdown
```

How to install with pnpm?
```bash
pnpm add @nan0web/markdown
```

How to install with yarn?
```bash
yarn add @nan0web/markdown
```

## Usage

### Basic Parsing

Parses Markdown text into an array of `MDElement` objects.

How to parse Markdown text into elements?
```js
import { Markdown } from "@nan0web/markdown"
const md = new Markdown()
const elements = md.parse("# Hello World\n\nThis is a paragraph.")
console.info(elements.length) // ← 3 (heading, paragraph, space)
```
### Stringify to HTML

Converts parsed elements to HTML string.

How to convert parsed Markdown to HTML?
```js
import { Markdown } from "@nan0web/markdown"
const md = new Markdown()
md.parse("# Title\n\nParagraph\n\n1. first\n2. second\n\n```js\ncode\n```\n\n")
const html = md.stringify()
console.info(html) // ← <h1>Title</h1>...
```
### Custom Rendering with Interceptor

Optionally accepts an interceptor function to customize rendering per element.

How to use an interceptor for custom HTML rendering?
```js
import { Markdown } from "@nan0web/markdown"
const md = new Markdown()
md.parse("# Title")
const html = md.stringify(({ element }) => {
	if (element instanceof MDHeading1) {
		return `<h1 class="custom">${element.content}</h1>`
	}
	return null
})
console.info(html) // ← <h1 class="custom">Title</h1>
```
### Handling Inline Code

How to parse and stringify inline code in paragraphs?
```js
import { Markdown } from "@nan0web/markdown"
const input = "`DB.path.test.js` is a test suite from the base `DB` class."
const elements = Markdown.parse(input)
const output = elements[0].toString()
console.info(output) // ← "`DB.path.test.js` is a test suite from the base `DB` class.\n\n"
```
### Working with Lists

How to handle unordered lists?
```js
import { Markdown } from "@nan0web/markdown"
const md = new Markdown()
const elements = md.parse("- item 1\n- item 2\n- item 3")
console.info(elements.length) // ← 1
console.info(elements[0] instanceof MDList) // ← true
const list = elements[0].children
console.info(list.length) // ← 3
console.info(list[0].content) // ← item 1
```
### Code Blocks

How to parse fenced code blocks?
```js
import { Markdown } from "@nan0web/markdown"
const md = new Markdown()
const input = "```js\nconsole.log('hi')\n```\n\n"
const elements = md.parse(input)
console.info(elements.length) // ← 2 (code block, space)
const code = /** @type {MDCodeBlock[]} */ (elements)[0] // d.ts error workaround
console.info(code.language) // ← "js"
console.info(code.content) // ← "console.log('hi')"
console.info(code instanceof MDCodeBlock) // ← true
```
### Tables

How to parse tables?
```js
import { Markdown } from "@nan0web/markdown"
const mdText = [
	"| Header 1 | Header 2 | Header 3 |",
	"|----------|----------|----------|",
	"| Cell 1  | Cell 2  | Cell 3  |",
	"| Cell 4  | Cell 5  | Cell 6  |",
].join("\n") + "\n\n"
const elements = Markdown.parse(mdText)
console.info(elements.length) // ← 5 (table rows + space)
const table = elements[0]
console.info(table instanceof MDTableRow) // ← true
```
### Task Lists

How to parse task lists?
```js
import { Markdown } from "@nan0web/markdown"
const input = "- [x] Write the press release\n- [ ] Update the website\n- [ ] Contact the media"
const elements = Markdown.parse(input)
console.info(elements.length) // ← 1
const taskList = elements[0]
console.info(taskList.children.length) // ← 3
```
## API

### `Markdown`

Main parser class.

* **Methods**
  * `parse(text: string): MDElement[]` – Parses Markdown into objects.
  * `stringify(interceptor?: Function): string` – Converts to HTML, optionally via interceptor.
  * `asyncStringify(interceptor?: Function): Promise<string>` – Async version of stringify.

### `MDElement`

Base class for all Markdown elements.

* **Methods**
  * `toHTML(): string` – HTML representation.
  * `toString(): string` – Markdown representation.
  * `static from(input)` – Factory from content or object.

### Supported Elements

- `MDHeading1` to `MDHeading6`
- `MDParagraph`
- `MDList`, `MDListItem`
- `MDCodeBlock`, `MDCodeInline`
- `MDLink`, `MDImage`
- `MDBlockquote`, `MDHorizontalRule`
- `MDTable`, `MDTaskList`

How to access core classes?

## Java•Script

Uses `d.ts` files for autocompletion

## CLI Playground

How to run playground script?
```bash
# Clone the repository and run the CLI playground
git clone https://github.com/nan0web/markdown.git
cd markdown
npm install
npm run playground
```

## Contributing

How to contribute? - [check here](./CONTRIBUTING.md)

## License

How to license ISC? - [check here](./LICENSE)
