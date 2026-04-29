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

## Repository Structure

```
NEU/
├── index.html          # Homepage
├── discover.html       # Browsable project catalogue
├── contribute.html     # Contribution guide
├── styles.css          # Stylesheet
├── script.js           # Client-side logic
├── database.json       # Project database (add entries here)
├── assets/
│   └── images/         # Project images
├── README.md           # This file
└── CONTRIBUTING.md     # Contribution guidelines
```

---

## How It Works

The website is a static site hosted on **GitHub Pages**. Project listings are stored in a single `database.json` file at the root of the repository. When a user visits the *Discover* page, the browser fetches `database.json` and renders the catalogue dynamically.

**No build step is required.** The site uses vanilla HTML, CSS, and JavaScript.

---

## Adding a Project

1. **Fork** this repository
2. Add your project image to `assets/images/`
3. Append your project entry to `database.json`
4. Open a **Pull Request** against `main`

For full instructions and the JSON schema, see [CONTRIBUTING.md](CONTRIBUTING.md) or visit the [Contribute page](https://sainsburywellcomecentre.github.io/NEU/contribute.html) on the live site.

---

## Running Locally

To preview the site on your machine, serve the repository with any static HTTP server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve .
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

---

## License

This project is open source. Individual listed projects retain their own licences as specified in their respective repositories.
