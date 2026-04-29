const fs = require('fs');
const path = require('path');

module.exports = function(eleventyConfig) {
  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/styles");
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/scripts");
  eleventyConfig.addPassthroughCopy("src/database.schema.json");

  // Build-time aggregation: combine all src/projects/*.json into a single database.json
  eleventyConfig.on('eleventy.after', () => {
    const projectsDir = path.join(__dirname, 'src', 'projects');
    const outputFile = path.join(__dirname, '_site', 'database.json');

    const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.json'));
    const projects = files.map(f => {
      const raw = fs.readFileSync(path.join(projectsDir, f), 'utf-8');
      return JSON.parse(raw);
    });

    // Sort by id for deterministic output
    projects.sort((a, b) => a.id.localeCompare(b.id));

    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    fs.writeFileSync(outputFile, JSON.stringify(projects, null, 2));
  });

  return {
    pathPrefix: "/NEU/",
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["html", "md", "njk"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
