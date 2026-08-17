import fs from 'fs';
import path from 'path';

const projectRoot = 'd:/work/real projects/NexarchV2/implementation/nexarch';
const nextDir = path.join(projectRoot, '.next');
const publicFontsDir = path.join(projectRoot, 'public', 'fonts', 'Archivo-Expanded-Font-Family');
const staticMediaDir = path.join(nextDir, 'static', 'media');
const staticCssDir = path.join(nextDir, 'static', 'css');

console.log('================================================================');
console.log('🔍 ARCHIVO EXPANDED FONT INTEGRATION & VERIFICATION SUITE');
console.log('================================================================\n');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    passCount++;
  } else {
    console.error(`❌ FAIL: ${message}`);
    failCount++;
  }
}

// -------------------------------------------------------------
// Test 1: Verify Core Source Font Files
// -------------------------------------------------------------
console.log('--- Test 1: Local Font Files in public/fonts/Archivo-Expanded-Font-Family ---');
const expectedWeights = [
  { name: 'Thin', weight: 100, file: 'Archivo_Expanded-Thin.ttf' },
  { name: 'ExtraLight', weight: 200, file: 'Archivo_Expanded-ExtraLight.ttf' },
  { name: 'Light', weight: 300, file: 'Archivo_Expanded-Light.ttf' },
  { name: 'Regular', weight: 400, file: 'Archivo_Expanded-Regular.ttf' },
  { name: 'Medium', weight: 500, file: 'Archivo_Expanded-Medium.ttf' },
  { name: 'SemiBold', weight: 600, file: 'Archivo_Expanded-SemiBold.ttf' },
  { name: 'Bold', weight: 700, file: 'Archivo_Expanded-Bold.ttf' },
  { name: 'ExtraBold', weight: 800, file: 'Archivo_Expanded-ExtraBold.ttf' },
  { name: 'Black', weight: 900, file: 'Archivo_Expanded-Black.ttf' },
];

expectedWeights.forEach(({ name, weight, file }) => {
  const filePath = path.join(publicFontsDir, file);
  const exists = fs.existsSync(filePath);
  const size = exists ? fs.statSync(filePath).size : 0;
  assert(exists && size > 50000, `Font weight ${weight} (${name}) present: ${file} (${(size / 1024).toFixed(1)} KB)`);
});

// -------------------------------------------------------------
// Test 2: Next.js next/font/local Compilation & Bundled Assets
// -------------------------------------------------------------
console.log('\n--- Test 2: Next.js Font Asset Generation (.next/static/media) ---');
assert(fs.existsSync(staticMediaDir), 'Static media directory exists in production build');
const mediaFiles = fs.readdirSync(staticMediaDir);
const ttfMediaFiles = mediaFiles.filter(f => f.endsWith('.ttf') || f.endsWith('.woff2') || f.endsWith('.woff'));
console.log(`   Found ${ttfMediaFiles.length} optimized font assets hashed and compiled by Webpack/Next.js`);
assert(ttfMediaFiles.length >= 9, 'All 9 weights compiled into Next.js optimized assets');

// -------------------------------------------------------------
// Test 3: CSS @font-face and Variable Binding in layout.css
// -------------------------------------------------------------
console.log('\n--- Test 3: CSS @font-face Declarations & Variable Binding ---');
function getAllCss(dir) {
  let combined = '';
  if (!fs.existsSync(dir)) return combined;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      combined += getAllCss(fullPath);
    } else if (file.endsWith('.css')) {
      combined += fs.readFileSync(fullPath, 'utf-8');
    }
  }
  return combined;
}

const cssBundle = getAllCss(staticCssDir);
assert(cssBundle.includes('--font-archivo-expanded'), 'CSS defines CSS variable --font-archivo-expanded');
assert(cssBundle.includes('font-family: var(--font-archivo-expanded)'), 'CSS applies var(--font-archivo-expanded) to font-sans and body');

const fontFaceMatches = (cssBundle.match(/@font-face/g) || []).length;
console.log(`   Found ${fontFaceMatches} @font-face declarations in production CSS`);
assert(fontFaceMatches >= 9, 'All 9 @font-face rules generated in production CSS bundle');

// -------------------------------------------------------------
// Test 4: Verify All App Routes Inherit the Font
// -------------------------------------------------------------
console.log('\n--- Test 4: Route & Layout Inspection (Public & Admin) ---');
const layoutPath = path.join(projectRoot, 'app', 'layout.jsx');
const layoutContent = fs.readFileSync(layoutPath, 'utf-8');
assert(layoutContent.includes('import { archivoExpanded } from "@/lib/fonts"'), 'Root layout imports archivoExpanded');
assert(layoutContent.includes('archivoExpanded.variable'), 'Root layout applies archivoExpanded.variable to <html>');
assert(layoutContent.includes('font-sans'), 'Root layout applies font-sans to <html> and <body>');

const adminLayoutPath = path.join(projectRoot, 'app', 'admin', '(dashboard)', 'layout.jsx');
const adminLayoutContent = fs.readFileSync(adminLayoutPath, 'utf-8');
assert(adminLayoutContent.includes('font-sans') || !adminLayoutContent.includes('font-'), 'Admin dashboard layout inherits font-sans from root layout');

const adminLoginPath = path.join(projectRoot, 'app', 'admin', 'login', 'page.jsx');
const adminLoginContent = fs.readFileSync(adminLoginPath, 'utf-8');
assert(adminLoginContent.includes('font-display') && adminLoginContent.includes('font-mono'), 'Admin login page uses Tailwind typography classes mapped to Archivo Expanded');

// -------------------------------------------------------------
// Test 5: Verify Tailwind Configuration
// -------------------------------------------------------------
console.log('\n--- Test 5: Tailwind Configuration Mapping ---');
const tailwindConfigPath = path.join(projectRoot, 'tailwind.config.js');
const tailwindConfig = fs.readFileSync(tailwindConfigPath, 'utf-8');
assert(tailwindConfig.includes('sans: ["var(--font-archivo-expanded)"'), 'Tailwind sans -> var(--font-archivo-expanded)');
assert(tailwindConfig.includes('display: ["var(--font-archivo-expanded)"'), 'Tailwind display -> var(--font-archivo-expanded)');
assert(tailwindConfig.includes('mono: ["var(--font-archivo-expanded)"'), 'Tailwind mono -> var(--font-archivo-expanded)');

// -------------------------------------------------------------
// Test 6: Verify Zero External Google Font Dependencies
// -------------------------------------------------------------
console.log('\n--- Test 6: Zero Remote Font Dependencies Check ---');
function scanDirForGoogleFonts(dir) {
  let found = 0;
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    if (entry === 'node_modules' || entry === '.next' || entry === '.git') continue;
    const fullPath = path.join(dir, entry);
    if (fs.statSync(fullPath).isDirectory()) {
      found += scanDirForGoogleFonts(fullPath);
    } else if (/\.(jsx|js|css|html)$/.test(entry)) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      if (content.includes('fonts.googleapis.com') || content.includes('fonts.gstatic.com')) {
        console.error(`   Found remote font reference in: ${fullPath}`);
        found++;
      }
    }
  }
  return found;
}

const remoteFontOccurrences = scanDirForGoogleFonts(projectRoot);
assert(remoteFontOccurrences === 0, 'Entire project codebase has 0 remote Google Font links or imports');

// -------------------------------------------------------------
// Summary
// -------------------------------------------------------------
console.log('\n================================================================');
console.log(`🏁 TEST RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
console.log('================================================================');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('\n🎉 ALL FONT INTEGRATION CHECKS PASSED 100%!');
}
