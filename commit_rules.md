# 🚀 Git Commit & Branch Naming Convention

This document outlines the rules for commit messages and branch naming in this project. Consistent conventions make the repository history more readable and enable powerful automation tools.

## 1. Commit Message Convention

We follow the **Conventional Commits** specification to create an explicit and structured commit history.

### Structure
```
<type>(<scope>): <short description>

<optional body>

<optional footer>
```

### Commit Types (`<type>`)

| Type       | Description                                                                                                |
| :--------- | :--------------------------------------------------------------------------------------------------------- |
| `feat`     | A new feature for the user.                                                                                 |
| `fix`      | A bug fix for the user.                                                                                     |
| `docs`     | Documentation only changes.                                                                                 |
| `style`    | Changes that do not affect meaning (white-space, formatting, semicolons).                                   |
| `refactor` | A code change that neither fixes a bug nor adds a feature.                                                  |
| `perf`     | A code change that improves performance.                                                                    |
| `test`     | Adding missing tests or correcting existing tests.                                                          |
| `build`    | Changes that affect the build system or external dependencies (npm, webpack, etc.).                         |
| `ci`       | Changes to CI configuration files and scripts (GitHub Actions, etc.).                                       |
| `chore`    | Other changes that don't modify `src` or test files (e.g., updating dependencies).                          |
| `revert`   | Reverts a previous commit.                                                                                  |

### Scope (`<scope>`)
*   Optional. A noun describing the part of the codebase that changed.
*   Examples: `auth`, `ui`, `api`, `blog`, `database`.

### Examples
- `feat: add dark mode toggle`
- `fix(blog): correct image not displaying in post`
- `docs: update installation guide for Windows`
- `chore: update eslint dependencies`

---

## 2. Branch Naming Convention

Branches are named to quickly identify their purpose and order. This is ideal for linear, ticket-based workflows.

### Structure
```
<2-digit_number>/<short_description_snake_case>
```

### Rules
1.  **Number Prefix:** Start with a two-digit number (e.g., `01`, `02`, `15`). This allows for easy sorting and indicates the order of feature development.
2.  **Description:** A very short, max 3-4 word description in **snake_case** (lowercase with underscores).
3.  **Be Specific & Concise:** The description should clearly state the branch's single purpose.

### Examples of Good Branch Names
- `01/initial_home_page`
- `02/add_contact_form`
- `03/fix_navbar_mobile`
- `04/integrate_github_api`
- `15/refactor_auth_logic`

### Examples of Bad Branch Names
- `add-stuff` (❌ No number, uses kebab-case)
- `1/fixit` (❌ Single-digit number, vague description)
- `02/ImplementingTheNewDashboardForTheUserProfile` (❌ Too long, not snake_case)
- `new_feature` (❌ No number prefix)

---

## Summary: Quick Guide

### When creating a branch:
```bash
# Good
git checkout -b 03/add_github_links

# Bad
git checkout -b my-new-branch
```

### When making a commit:
```bash
# Good
git commit -m "feat: add project section to homepage"

# Also Good (with scope)
git commit -m "feat(homepage): add project section"

# Bad
git commit -m "changed some things"
```

---