const fs = require('fs');

// Update learn_toc.json to use "url" instead of "path"
const tocPath = 'src/_data/learn_toc.json';
if (fs.existsSync(tocPath)) {
  let toc = JSON.parse(fs.readFileSync(tocPath, 'utf8'));
  toc.forEach(topic => {
    topic.url = `/learn/${topic.id}/`;
    delete topic.path;
  });
  fs.writeFileSync(tocPath, JSON.stringify(toc, null, 2));
}

// Update base.njk links
let baseNjk = fs.readFileSync('src/_includes/base.njk', 'utf8');
baseNjk = baseNjk.replace(/\/learn\.html/g, '/learn/');
baseNjk = baseNjk.replace(/\/discover\.html/g, '/discover/');
baseNjk = baseNjk.replace(/\/contribute\.html/g, '/contribute/');
baseNjk = baseNjk.replace(/contribute\.html/g, '/contribute/');
fs.writeFileSync('src/_includes/base.njk', baseNjk);

// Update wiki.njk
let wikiNjk = fs.readFileSync('src/_includes/wiki.njk', 'utf8');
wikiNjk = wikiNjk.replace(/\/learn\.html/g, '/learn/');
// Replace active logic
wikiNjk = wikiNjk.replace(
  /{% set isActive = \(page\.fileSlug \+ '\.html' == topic\.path\) %}/g,
  '{% set isActive = (page.url == topic.url) %}'
);
// Replace links
wikiNjk = wikiNjk.replace(
  /href="{{ '\/learn\/' \| url }}{{ topic\.path }}"/g,
  'href="{{ topic.url | url }}"'
);
// Replace page nav logic
wikiNjk = wikiNjk.replace(
  /{% if \(page\.fileSlug \+ '\.html'\) == topic\.path %}/g,
  '{% if page.url == topic.url %}'
);
wikiNjk = wikiNjk.replace(
  /href="{{ '\/learn\/' \| url }}{{ prev\.path }}"/g,
  'href="{{ prev.url | url }}"'
);
wikiNjk = wikiNjk.replace(
  /href="{{ '\/learn\/' \| url }}{{ next\.path }}"/g,
  'href="{{ next.url | url }}"'
);
fs.writeFileSync('src/_includes/wiki.njk', wikiNjk);

// Update index.html
let indexHtml = fs.readFileSync('src/index.html', 'utf8');
indexHtml = indexHtml.replace(/discover\.html/g, '/discover/');
indexHtml = indexHtml.replace(/contribute\.html/g, '/contribute/');
fs.writeFileSync('src/index.html', indexHtml);

// Update learn.html
let learnHtml = fs.readFileSync('src/learn.html', 'utf8');
learnHtml = learnHtml.replace(/learn\/electronics\.html/g, '/learn/electronics/');
learnHtml = learnHtml.replace(/learn\/mechanical\.html/g, '/learn/mechanical/');
learnHtml = learnHtml.replace(/learn\/programming\.html/g, '/learn/programming/');
fs.writeFileSync('src/learn.html', learnHtml);

console.log("Updated URIs successfully.");
