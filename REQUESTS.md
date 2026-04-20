# @nan0web/markdown — Requests

## Inline Elements Processing

**Status:** 🔴 TODO
**Priority:** High
**Requested by:** @industrialbank/branches (chat AI responses)

### Problem

Currently `Markdown.parse()` correctly identifies **block-level** elements (headings, lists, code blocks, blockquotes, tables), but the `content` of paragraphs and list items is output **as-is** without processing **inline** markdown.

Example input:

```md
Ось адреси у Львові:

**Відділення:**

- м. Львів, пр. Вячеслава Чорновола, 67

**Банкомати:**

- м. Львів, вул. Залізнична, 1 А
```

Expected HTML output:

```html
<p>Ось адреси у Львові:</p>
<p><strong>Відділення:</strong></p>
<ul>
  <li>м. Львів, пр. Вячеслава Чорновола, 67</li>
</ul>
<p><strong>Банкомати:</strong></p>
<ul>
  <li>м. Львів, вул. Залізнична, 1 А</li>
</ul>
```

Actual HTML output:

```html
<p>Ось адреси у Львові:</p>
<p>**Відділення:**</p>
<p>* м. Львів, пр. Вячеслава Чорновола, 67</p>
<p>**Банкомати:**</p>
<p>* м. Львів, вул. Залізнична, 1 А</p>
```

### Required Inline Elements

The following inline elements must be processed within `content` of any block element (paragraphs, list items, headings, blockquotes, table cells):

| Syntax        | Element       | HTML Output              |
| ------------- | ------------- | ------------------------ |
| `**text**`    | Bold          | `<strong>text</strong>`  |
| `*text*`      | Italic        | `<em>text</em>`          |
| `` `code` ``  | Inline Code   | `<code>code</code>`      |
| `[text](url)` | Link          | `<a href="url">text</a>` |
| `~~text~~`    | Strikethrough | `<del>text</del>`        |

### Implementation Suggestion

Add a static method `MDElement.processInline(content)` that converts inline markdown syntax to HTML within any content string. Call it in:

- `MDParagraph.toHTML()`
- `MDListItem.toHTML()`
- `MDHeading*.toHTML()`
- `MDBlockquote.toHTML()`
- `MDTableCell.toHTML()`
- `Markdown.stringify()` (via `elementToHTML()`)

### Secondary Issue: `* item` not parsed as list

Lines starting with `* ` (asterisk + space) should be parsed as unordered list items, same as `- `. Currently they may conflict with italic `*text*` detection at block level. The block parser `MDList.parse()` should handle `* ` before falling through to paragraph.

### Consumer

- `@industrialbank/branches` — AI chat responses use `md2html()` wrapper:

  ```js
  import Markdown from '@nan0web/markdown'

  export default function md2html(text) {
    const md = new Markdown()
    md.parse(text)
    return md.stringify()
  }
  ```
