# 🚀 Quick Start Guide

## Library Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Build Library
```bash
npm run build
```

### 3. Test Library
```bash
npm run serve
```

### 4. Open Browser
Open browser at: `http://localhost:8080`

## 📦 Publishing Library

### Publish to npm
```bash
# Login to npm
npm login

# Publish library
npm publish
```

### Publish to GitHub
```bash
# Add files
git add .

# Commit
git commit -m "Initial release: Smart UI Buttons Library v1.0.2"

# Push
git push origin main

# Create Tag
git tag v1.0.2
git push origin v1.0.2
```

## 🔧 Using the Library

### In HTML
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="dist/smart-ui-buttons.css">
</head>
<body>
    <script src="dist/smart-ui-buttons.js"></script>
    <script>
        const button = new SmartUIButtons.SmartButton({
            type: 'primary',
            text: 'زر ذكي',
            onClick: () => alert('تم النقر!')
        });
        document.body.appendChild(button.getElement());
    </script>
</body>
</html>
```

### في Node.js
```javascript
const { SmartButton } = require('smart-buttons');

const button = new SmartButton({
    type: 'primary',
    text: 'زر ذكي'
});
```

### في ES6 Modules
```javascript
import { SmartButton } from 'smart-buttons';

const button = new SmartButton({
    type: 'primary',
    text: 'زر ذكي'
});
```

## ✅ التحقق من النجاح

1. **البناء نجح** ✅
2. **الملفات في dist/** ✅
3. **الأمثلة تعمل** ✅
4. **المكتبة جاهزة** ✅

## 🎉 تهانينا!

مكتبتك جاهزة للاستخدام والنشر!
