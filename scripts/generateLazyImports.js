import fs from 'fs';
import path from 'path';

const SRC_DIR = path.resolve('src');
const COMPONENTS_DIR = path.join(SRC_DIR, 'components');
const PAGES_DIR = path.join(SRC_DIR, 'pages');
const OUTPUT_FILE = path.join(SRC_DIR, 'lazyImports.ts');

function pascalCase(str) {
  return str
    .replace(/[-_ ]+(.)/g, (_, c) => c.toUpperCase())
    .replace(/^(.)/, (_, c) => c.toUpperCase());
}


function collectFiles(dir) {
  const files = [];
  fs.readdirSync(dir).forEach(item => {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      files.push(...collectFiles(fullPath));
    } else if (/\.(t|j)sx?$/.test(item)) {
      files.push(fullPath);
    }
  });
  return files;
}

function generate() {
  const componentFiles = [
    ...collectFiles(COMPONENTS_DIR),
    ...collectFiles(PAGES_DIR),
  ];

  let imports = "import React, { Suspense } from 'react';\n";
  imports += "import App from './App';\n\n";

  const exports = [];
  const seen = new Set();

  componentFiles.forEach(file => {
    const rel = './' + path.relative(SRC_DIR, file).replace(/\\/g, '/');
    const name = pascalCase(path.basename(file, path.extname(file)));
    if (seen.has(name)) return;
    seen.add(name);
    const importPath = rel.replace(/\.[tj]sx?$/, '');
    imports += `const ${name} = React.lazy(() => import('${importPath}'));
`;
    exports.push(name);
  });

  imports += `\nfunction LazyApp() {\n  return (\n    <Suspense fallback={<div>Loading...</div>}>\n      <App />\n    </Suspense>\n  );\n}\n\n`;

  imports += `export default LazyApp;\nexport { ${exports.join(', ')} };\n`;

  fs.writeFileSync(OUTPUT_FILE, imports);
  console.log(`Lazy imports generated in ${OUTPUT_FILE}`);
}

generate();
