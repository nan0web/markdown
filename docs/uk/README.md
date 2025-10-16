# @nan0web/markdown

|Назва пакета|[Статус](https://github.com/nan0web/monorepo/blob/main/system.md#написання-сценаріїв)|Документація|Покриття тестами|Функції|Npm версія|
|---|---|---|---|---|---|
 |[@nan0web/markdown](https://github.com/nan0web/markdown/) |🟢 `97.1%` |🧪 [Англійською 🏴󠁧󠁢󠁥󠁮󠁧󠁿](https://github.com/nan0web/markdown/blob/main/README.md)<br />[Українською 🇺🇦](https://github.com/nan0web/markdown/blob/main/docs/uk/README.md) |🟡 `83.9%` |✅ d.ts 📜 system.md 🕹️ playground |— |

Парсер Markdown без залежностей, розширюваний, створений для nan0web.

Створений з урахуванням принципів мінімалізму та чіткості,
він надає надійний спосіб перетворення Markdown у структуровані елементи
та відображення їх у вигляді HTML або зворотного перетворення у Markdown.

## Особливості

- Перетворює стандартний синтаксис Markdown у структуровані об'єкти
- Підтримує заголовки, абзаци, списки, блоки коду, посилання, зображення, цитати, таблиці та інше
- Розширювані типи елементів для нестандартних структур Markdown
- Конвертує Markdown у HTML
- Написаний на чистому JavaScript із типізацією через JSDoc

## Встановлення

Як встановити через npm?
```bash
npm install @nan0web/markdown
```

Як встановити через pnpm?
```bash
pnpm add @nan0web/markdown
```

Як встановити через yarn?
```bash
yarn add @nan0web/markdown
```

## Використання

### Базове Парсування

Парсить текст Markdown у масив об'єктів `MDElement`.

Як перетворити текст Markdown у елементи?
```js
import { Markdown } from "@nan0web/markdown"
const md = new Markdown()
const elements = md.parse("# Привіт Світ\n\nЦе абзац.")
console.info(elements.length) // ← 3 (заголовок, абзац, пробіл)
```
### Перетворення у HTML

Перетворює розібрані елементи у рядок HTML.

Як перетворити Markdown у HTML?
```js
import { Markdown } from "@nan0web/markdown"
const md = new Markdown()
md.parse("# Заголовок\n\nАбзац\n\n1. перший\n2. другий\n\n```js\nкод\n```\n\n")
const html = md.stringify()
console.info(html) // ← <h1>Заголовок</h1>...
```
### Кастомне Візуалізація через Перехоплювач

Необов’язково приймає функцію-перехоплювача для кастомного відтворення кожного елемента.

Як використовувати перехоплювача для налаштування HTML?
```js
import { Markdown } from "@nan0web/markdown"
const md = new Markdown()
md.parse("# Заголовок")
const html = md.stringify(({ element }) => {
  if (element instanceof MDHeading1) {
    return `<h1 class="кастомний">${element.content}</h1>`
  }
  return null
})
console.info(html) // ← <h1 class="кастомний">Заголовок</h1>
```
### Внутрішній код

Як парсити і відтворити внутрішній код у абзацах?
```js
import { Markdown } from "@nan0web/markdown"
const input = "`DB.path.test.js` – тестова suite з базового класу `DB`."
const elements = Markdown.parse(input)
const output = elements[0].toString()
console.info(output) // ← "`DB.path.test.js` – тестова suite з базового класу `DB`.\n\n"
```
### Робота зі Списками

Як працювати з невпорядкованими списками?
```js
import { Markdown } from "@nan0web/markdown"
const md = new Markdown()
const elements = md.parse("- пункт 1\n- пункт 2\n- пункт 3")
console.info(elements.length) // ← 1
console.info(elements[0] instanceof MDList) // ← true
const list = elements[0].children
console.info(list.length) // ← 3
console.info(list[0].content) // ← пункт 1
```
### Блоки Коду

Як парсити блоки коду з огорожею?
```js
import { Markdown } from "@nan0web/markdown"
const md = new Markdown()
const input = "```js\nconsole.log('hi')\n```\n\n"
const elements = md.parse(input)
console.info(elements.length) // ← 2 (блок коду, пробіл)
const code = /** @type {MDCodeBlock[]} */ (elements)[0] // обхід помилки d.ts
console.info(code.language) // ← "js"
console.info(code.content) // ← "console.log('hi')"
console.info(code instanceof MDCodeBlock) // ← true
```
### Таблиці

Як парсити таблиці?
```js
import { Markdown } from "@nan0web/markdown"
const mdText = [
  "| Заголовок 1 | Заголовок 2 | Заголовок 3 |",
  "|----------|----------|----------|",
  "| Комірка 1  | Комірка 2  | Комірка 3  |",
  "| Комірка 4  | Комірка 5  | Комірка 6  |",
].join("\n") + "\n\n"
const elements = Markdown.parse(mdText)
console.info(elements.length) // ← 5 (рядки таблиці + пробіл)
const table = elements[0]
console.info(table instanceof MDTableRow) // ← true
```
### Списки Завдань

Як парсити списки завдань?
```js
import { Markdown } from "@nan0web/markdown"
const input = "- [x] Написати прес-реліз\n- [ ] Оновити сайт\n- [ ] Зв'язатися з медіа"
const elements = Markdown.parse(input)
console.info(elements.length) // ← 1
const taskList = elements[0]
console.info(taskList.children.length) // ← 3
```
## API

### `Markdown`

Головний клас парсера.

* **Методи**
  * `parse(text: string): MDElement[]` – Парсить Markdown у об'єкти.
  * `stringify(interceptor?: Function): string` – Перетворює у HTML, опціонально через перехоплювач.
  * `asyncStringify(interceptor?: Function): Promise<string>` – Асинхронна версія stringify.

### `MDElement`

Базовий клас для всіх елементів Markdown.

* **Методи**
  * `toHTML(): string` – Представлення у вигляді HTML.
  * `toString(): string` – Представлення у вигляді Markdown.
  * `static from(input)` – Фабрика для створення із контенту або об’єкта.

### Підтримувані Елементи

- `MDHeading1` до `MDHeading6`
- `MDParagraph`
- `MDList`, `MDListItem`
- `MDCodeBlock`, `MDCodeInline`
- `MDLink`, `MDImage`
- `MDBlockquote`, `MDHorizontalRule`
- `MDTable`, `MDTaskList`

Як отримати доступ до основних класів?

## Java•Script

Використовує `d.ts` файли для автозавершення

## Консольний Демонстраційний Програвач

Як запустити демонстраційний скрипт?
```bash
# Клонуйте репозиторій та запустіть консольний програвач
git clone https://github.com/nan0web/markdown.git
cd markdown
npm install
npm run playground
```

## Внески

Як зробити внесок? - [перевірте тут](./CONTRIBUTING.md)

## Ліцензія

Як ліцензувати ISC? - [перевірте тут](./LICENSE)
