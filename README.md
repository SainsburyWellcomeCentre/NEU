# Neuroscience Engineering Universe (NEU)

A collaborative platform for sharing open-source tools, products, and projects purpose-built for neuroscience experiments.

**🌐 Live site:** [https://sainsburywellcomecentre.github.io/NEU/](https://sainsburywellcomecentre.github.io/NEU/)

---

## About

The Neuroscience Engineering Universe (NEU) curates and shares hardware and software tools that have been tested and validated in real neuroscience experimental settings. Our goal is to reduce duplication of effort across labs and make it easier to discover reliable, purpose-built tools.

### Founding Members

| Institute | Location |
|-----------|----------|
| Sainsbury Wellcome Centre (SWC) | London, UK |
| Paris Brain Institute (ICM) | Paris, France |

---

## How It Works

The website is statically generated using **Eleventy (11ty)** and hosted on **GitHub Pages**. Each project listing is stored as an individual JSON file in `src/projects/`. At build time, Eleventy aggregates these files into a single `database.json` that the front-end fetches. This per-file approach eliminates merge conflicts when multiple contributors submit projects simultaneously.

The repository utilizes **GitHub Actions** to automatically validate the database schema, check for dead links, and deploy the site upon merging to the `main` branch.

---

## Repository Structure

```text
NEU/
├── src/
│   ├── _data/
│   │   └── learn_toc.json        # Wiki sidebar manifest
│   ├── _includes/                # 11ty Nunjucks layouts (base.njk, wiki.njk)
│   ├── assets/images/            # Project images
│   ├── learn/                    # Markdown wiki pages
│   ├── scripts/                  # Client-side JavaScript
│   ├── styles/                   # Modular CSS components
│   ├── projects/                  # Per-project JSON files (one per project)
│   ├── database.schema.json      # JSON Schema for project validation
│   ├── index.html                # Homepage
│   ├── discover.html             # Browsable project catalogue
│   ├── contribute.html           # Contribution guide
│   └── styles.css                # CSS entrypoint
├── .github/workflows/            # CI/CD pipelines (validation & deployment)
├── package.json                  # Dependencies and build scripts
├── README.md                     # This file
└── CONTRIBUTING.md               # Contribution guidelines
```

---

## Adding a Project

1. **Fork** this repository
2. Add your project image to `src/assets/images/`
3. Create your project entry as `src/projects/<your-id>.json`
4. Open a **Pull Request** against `main`

For full instructions and the JSON schema, see [CONTRIBUTING.md](CONTRIBUTING.md) or visit the [Contribute page](https://sainsburywellcomecentre.github.io/NEU/contribute/) on the live site.

---

## Running Locally

To preview the site on your machine, you'll need Node.js installed.

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```
   *This command runs Eleventy in watch mode and serves the site at `http://localhost:8080`. Any changes to files in `src/` will automatically rebuild and reload the browser.*

3. **Build for production:**
   ```bash
   npm run build
   ```
   *This compiles the final static site into the `_site/` directory.*

---

## Validation Pipeline

Before submitting a Pull Request, you can run the schema validator locally to ensure your project file is properly formatted:

```bash
npm run validate
```
This runs AJV against each `src/projects/*.json` file using the `src/database.schema.json` schema. This check is also automatically enforced by GitHub Actions on every Pull Request.

---

## License

This project is open source. Individual listed projects retain their own licences as specified in their respective repositories.
