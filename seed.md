# Seed: Markdown Engine (OLMUI Standard)

## 🎯 Intent (Intent)
Stabilize the `@nan0web/markdown` package to ensure it fully supports standard inline formatting (bold, italic, strikethrough) and correctly generates OLMUI-compatible HTML and structured blocks for cross-platform rendering (Web, CLI, Print).

## 🏗️ Execution Plan (Phases)

### Phase 1: Inline Rendering Integrity
- [x] **Bold/Italic Support**: Add regex-based parsing for `**bold**`, `__bold__`, `*italic*`, `_italic_` in `MDElement.processInline`.
- [x] **Strikethrough**: Add support for `~~text~~`.
- [x] **Nested Regex**: Refined to non-greedy `[\s\S]+?` for better accuracy.
- [ ] **Links in formatting**: Verify link labels with inline styles.

### Phase 2: Structural Wrapping (HTML)
- [x] **Tag Wrapping**: Fix `toHTML()` to correctly wrap children between tags.
- [x] **Block mapping**: Map `ui-html` blocks in SSR server.
- [ ] **Indentation**: Refine HTML indentation.

### Phase 3: Router-Aware Links (SSR Integration)
- [x] **Href Rewriting**: Implement smart link translation (README.md -> index.html).
- [x] **SSG Navigation**: Correct handling of trailing slashes and index naming in static export.
- [ ] **Internal Anchors**: Support `#anchor` resolution.

## 📜 Task List (next.md)
- [x] Fix `MDElement.toHTML` wrapping logic.
- [x] Add Bold/Italic/Strikethrough regex.
- [x] Integrate `PagesRouter.resolve` into `SSRServer` links.
- [x] Support `README.md` as `index.html` in SSG build.
- [x] Add `MarkdownModel` as standard elementary model.
- [ ] Add unit tests for nested inline formatting.
- [ ] Verify SSG output for cross-package links.
