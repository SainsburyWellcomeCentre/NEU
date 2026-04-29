const fs = require('fs');

const files = [
  { path: 'src/discover.html', title: 'Discover Projects — NEU' },
  { path: 'src/contribute.html', title: 'Contribute — NEU' },
  { path: 'src/learn.html', title: 'Learn — NEU' }
];

files.forEach(f => {
  let html = fs.readFileSync(f.path, 'utf8');
  
  html = html.replace(
    /<!DOCTYPE html>[\s\S]*?<!-- ====== Navigation ====== -->[\s\S]*?<\/neu-nav>/,
    `---\nlayout: base.njk\ntitle: ${f.title}\n---\n`
  );

  html = html.replace(
    /<!-- ====== Footer ====== -->[\s\S]*?<\/html>/,
    ''
  );

  if (f.path === 'src/discover.html') {
    html = html.replace(
      `---\nlayout: base.njk\ntitle: Discover Projects — NEU\n---\n`,
      `---\nlayout: base.njk\ntitle: Discover Projects — NEU\nextra_scripts: '<script src="/scripts/discover.js"></script>'\n---\n`
    );
  }

  fs.writeFileSync(f.path, html.trim() + '\n');
  console.log('Updated ' + f.path);
});
