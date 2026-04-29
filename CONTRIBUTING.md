# Contributing to the NEU Catalogue

Thank you for your interest in contributing to the Neuroscience Engineering Universe! This document explains how to add your project to the catalogue.

---

## Prerequisites

- A [GitHub account](https://github.com)
- Basic familiarity with Git (fork, commit, push, pull request)
- Your project must have been **tested or validated in a neuroscience experiment**

---

## Step-by-step Guide

### 1. Fork & Clone

```bash
# Fork via the GitHub UI, then clone your fork:
git clone https://github.com/YOUR_USERNAME/NEU.git
cd NEU
```

### 2. Add Your Project Image

Place a clear image of your project in the `src/assets/images/` directory.

**Requirements:**
- **Format:** `.webp`, `.png`, or `.jpg`
- **Filename:** Use kebab-case, e.g. `my-lick-detector.webp`
- **Size:** Aim for ≤ 500 KB. Images will be displayed at a 16:10 aspect ratio.

### 3. Add Your Entry to `src/database.json`

Open `src/database.json` and append a new JSON object to the array. Follow this schema exactly:

```json
{
  "id": "my-project-name",
  "name": "My Project Name",
  "category": "Sensors/Touch Sensors",
  "description": "A brief description of your project and its neuroscience application.",
  "authors": ["Your Institute"],
  "image": "assets/images/my-project-name.webp",
  "link": "https://github.com/org/repo",
  "tags": ["capacitive", "lick detection"],
  "specs": {
    "Type": "Capacitive",
    "Response Time": "<1 ms"
  }
}
```

#### Field Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | ✅ | Unique kebab-case identifier |
| `name` | `string` | ✅ | Human-readable project name |
| `category` | `string` | ✅ | Slash-delimited category path (e.g. `Sensors/Touch Sensors`). Supports unlimited depth. |
| `description` | `string` | ✅ | Brief description of the project |
| `authors` | `string[]` | ✅ | List of contributing institutions or individuals |
| `image` | `string` | ✅ | Relative path to image in `assets/images/` |
| `link` | `string` | ✅ | URL to the project repo or product page |
| `tags` | `string[]` | ✅ | Free-form keywords for search |
| `specs` | `object` | ✅ | Key-value pairs for technical specifications |

#### Category Hierarchy

Categories use `/` as a delimiter to create a hierarchy of any depth. Examples:

```
Sensors/Photodetectors
Sensors/Touch Sensors
Sensors/Touch Sensors/Capacitive        ← deeper nesting is supported
Actuator Controllers/Stepper Motor Controllers
Actuator Controllers/BLDC Controllers
```

> **Note:** If your project doesn't fit an existing category path, you may propose a new one in your pull request description. The hierarchy is inferred automatically from the `/` delimiter.

### 4. Validate Your JSON

Before committing, make sure your entry conforms to our JSON schema. You can check with:

```bash
npm run validate
```

### 5. Commit & Push

```bash
git add src/database.json src/assets/images/my-project-name.webp
git commit -m "Add my-project-name to catalogue"
git push origin main
```

### 6. Open a Pull Request

Go to the [NEU repository](https://github.com/SainsburyWellcomeCentre/NEU) and open a pull request from your fork. In the PR description, briefly explain:

- What the project does
- Where it has been used (lab / institute)
- Any new category being proposed (if applicable)

---

## Review Process

An NEU administrator will review your pull request. We check for:

1. **Valid JSON** — The database file must parse without errors
2. **Complete fields** — All required fields are present
3. **Image included** — A project image exists at the specified path
4. **Neuroscience relevance** — The project is designed for or tested in neuroscience experiments

Once approved, your project will appear on the live site automatically after the PR is merged.

---

## Questions?

If you have any questions or run into issues, please [open an issue](https://github.com/SainsburyWellcomeCentre/NEU/issues) on the repository.
