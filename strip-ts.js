const { transformFileSync } = require('@babel/core');
const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.next')) {
        results = results.concat(walk(file));
      }
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./');
files.forEach(file => {
  if (file.includes('next-env.d.ts')) return;
  const isTsx = file.endsWith('.tsx');
  const result = transformFileSync(file, {
    presets: ['@babel/preset-typescript'],
    plugins: ['@babel/plugin-syntax-jsx'],
    retainLines: true,
    filename: file,
  });
  const newPath = file.replace(/\.tsx?$/, isTsx ? '.jsx' : '.js');
  fs.writeFileSync(newPath, result.code);
  fs.unlinkSync(file);
  console.log(`Converted ${file} to ${newPath}`);
});
