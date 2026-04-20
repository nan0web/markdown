# 🏗️ Architecture Audit — Healing Report

**Score: {passed}/{total} ({pct}%)**

## Issues Found

- [ ] [phase] .npmignore: `Public package is missing .npmignore`
- [ ] [hygiene] scripts.knip: `Missing required script: {script}`
- [ ] [hygiene] knip.json: `Missing config file: {file}`
- [ ] [exports] src/index.js: `Default export found in {file} — only named exports allowed`

## Recommended Subagents

- `@[/inspect-structure]`
- `@[/package-hygiene]`
- `@[/inspect-anti-pattern]`
- `@[/inspect-models]`
