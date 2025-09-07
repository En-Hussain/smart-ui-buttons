

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building Smart UI Buttons Library...');

try {
  // تنظيف مجلد dist
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true });
    console.log('✅ Cleaned dist folder');
  }

  console.log('📦 Building TypeScript...');
  execSync('npx tsc', { stdio: 'inherit' });

  console.log('🔧 Building Webpack...');
  execSync('webpack --mode=production', { stdio: 'inherit' });

  console.log('📋 Copying additional files...');
  
  if (fs.existsSync('README.md')) {
    fs.copyFileSync('README.md', 'dist/README.md');
  }

  if (fs.existsSync('LICENSE')) {
    fs.copyFileSync('LICENSE', 'dist/LICENSE');
  }

  if (fs.existsSync('CHANGELOG.md')) {
    fs.copyFileSync('CHANGELOG.md', 'dist/CHANGELOG.md');
  }

  console.log('✅ Library built successfully!');
  console.log('📁 Files available in dist/ folder');

} catch (error) {
  console.error('❌ Build error:', error.message);
  process.exit(1);
}
