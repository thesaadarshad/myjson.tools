# MyJSON Tools

> **Your Personal JSON Toolkit** - Transform, format, and convert JSON with ease

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PWA](https://img.shields.io/badge/PWA-ready-brightgreen.svg)](https://myjson.tools)
[![Offline](https://img.shields.io/badge/Works-Offline-orange.svg)](https://myjson.tools)

**Live:** [https://myjson.tools](https://myjson.tools)

## 🎯 Overview

MyJSON Tools is a free, privacy-first online JSON formatter, validator, and converter with 15+ powerful features. Built with modern web technologies, it works completely client-side—your data never leaves your browser.

Perfect for developers, data analysts, and anyone working with JSON data regularly.

---

## ✨ Features

### 🔄 Transform Operations
- **JSON Formatter/Beautifier** - Format JSON with proper indentation
- **JSON Minifier/Compressor** - Remove whitespace to compress JSON
- **JSON Validator** - Detect and fix syntax errors with detailed messages
- **JSON Sorter** - Alphabetically sort JSON keys

### 🔀 Format Converters
- **JSON to YAML** - Convert JSON to YAML format
- **JSON to CSV** - Export JSON arrays to CSV
- **JSON to XML** - Transform JSON to XML structure
- **JSON to Query Params** - Convert between JSON and URL query strings
- **TypeScript Interface Generator** - Generate TypeScript types from JSON

### 🛠️ Data Tools
- **Flatten/Unflatten JSON** - Convert between nested and dot-notation JSON
- **Escape/Unescape Strings** - Handle JSON string escaping
- **Base64 Encode/Decode** - Encode/decode data to/from Base64
- **Import from URL** - Fetch and load JSON from any URL

### 🔍 Analysis & Comparison
- **JSON Compare & Diff** - Find differences between two JSON objects
- **Data Type Summary** - Analyze JSON structure and types
- **Validation Errors** - Clear error messages with suggestions

### 🎨 User Experience
- **Dark Mode** - Eye-friendly dark theme
- **Multilingual** - Available in 5 languages (EN, ES, AR, FR, DE)
- **Line Numbers** - Easy-to-read line numbers with sync scroll
- **Real-time Stats** - Character count, line count, size tracking
- **Keyboard Shortcuts** - Productive keyboard navigation
- **Copy/Download** - Quick clipboard and file download actions

### 🚀 Technical Features
- **100% Client-Side** - All processing happens in your browser
- **Offline PWA** - Works without internet after first visit
- **Privacy-First** - No data collection, no server communication
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Golden Ratio UI** - Beautiful, minimalist design principles

---

## 🚀 Quick Start

### Using the Live Version

Visit [https://myjson.tools](https://myjson.tools) and start using it immediately. No installation or registration required!

### Running Locally with Docker

```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/myjson-tools.git
cd myjson-tools

# Run with Docker Compose
docker-compose up

# Access at http://localhost:8090
```

### Running Without Docker

```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/myjson-tools.git
cd myjson-tools

# Serve with any static server
# Example with Python:
python3 -m http.server 8090

# Or with Node.js:
npx http-server -p 8090

# Access at http://localhost:8090
```

---

## 📖 Usage Guide

### Transform Mode

1. **Paste or type** JSON into the left panel
2. **Click a button** to perform an operation:
   - **Beautify** - Format with indentation
   - **Compress** - Minify to single line
   - **Sort** - Sort keys alphabetically
   - **TypeScript** - Generate TypeScript interfaces
   - **YAML/CSV/XML** - Convert to other formats
3. **View results** in the right panel
4. **Copy or download** the output

### Compare Mode

1. **Switch to Compare mode** using the mode toggle
2. **Paste JSON** into panels A and B
3. **Click Compare** to see differences
4. **Navigate** through changes with prev/next buttons
5. **View details** in the collapsible diff panel

### Import from URL

1. **Click the download icon** in the input panel
2. **Enter a URL** that returns JSON
3. **Click Import** to load the data
4. JSON is automatically validated and formatted

### Keyboard Shortcuts

- `Ctrl/Cmd + Enter` - Process JSON (Transform/Compare)
- `Ctrl/Cmd + K` - Clear input
- `Ctrl/Cmd + D` - Download result
- `Ctrl/Cmd + /` - Toggle dark mode

---

## 🎨 Design Philosophy

MyJSON Tools follows the **Golden Ratio** (φ = 1.618) in spacing, typography, and layout for a harmonious, balanced interface.

### Color Palette

**Light Mode:**
- Primary: #3b82f6 (Blue)
- Background: #f8f9fa
- Surface: #ffffff
- Text: #1f2937

**Dark Mode:**
- Primary: #3b82f6 (Blue)
- Background: #0f0f0f
- Surface: #1a1a1a
- Text: #f8f9fa

---

## 🏗️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Variables
- **Vanilla JavaScript** - No framework dependencies
- **PWA** - Progressive Web App capabilities
- **Nginx** - Production web server
- **Docker** - Containerized deployment

---

## 📁 Project Structure

```
myjson-tools/
├── index.html              # Main HTML structure
├── styles.css              # All CSS styling
├── app.js                  # Core application logic
├── languages.js            # i18n translations (5 languages)
├── manifest.json           # PWA manifest
├── service-worker.js       # Offline caching
├── sitemap.xml             # SEO sitemap
├── robots.txt              # Search engine directives
├── browserconfig.xml       # Windows tile config
├── logo.svg                # Application logo
├── favicon.svg             # Favicon
├── nginx.conf              # Nginx configuration
├── Dockerfile              # Docker image definition
├── docker-compose.yml      # Docker Compose setup
├── generate-icons.sh       # PWA icon generator
├── icon-*.png              # PWA icons (various sizes)
├── seo-plan.md             # SEO implementation guide
├── domain-research.md      # Domain selection research
├── future-releases.md      # Feature roadmap
└── README.md               # This file
```

---

## 🌍 Multilingual Support

MyJSON Tools is available in:

- 🇺🇸 **English** (default)
- 🇪🇸 **Español** (Spanish)
- 🇸🇦 **العربية** (Arabic) - with RTL support
- 🇫🇷 **Français** (French)
- 🇩🇪 **Deutsch** (German)

Language preference is saved in localStorage and persists across sessions.

---

## 🔒 Privacy & Security

- **100% Client-Side** - All JSON processing happens in your browser
- **No Data Collection** - We don't track, store, or transmit your data
- **No Cookies** - Only localStorage for preferences
- **No External Requests** - Except when you explicitly import from URL
- **HTTPS Only** - Secure connection required
- **Open Source** - Full transparency, audit the code yourself

---

## 🎯 Use Cases

- **API Development** - Test and debug API responses
- **Configuration Files** - Format and validate JSON configs
- **Data Migration** - Convert between JSON and other formats
- **Code Generation** - Generate TypeScript/interfaces from JSON
- **Data Analysis** - Compare JSON from different sources
- **Learning** - Understand JSON structure and syntax
- **Documentation** - Create readable JSON examples

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Report Bugs** - Open an issue with details
2. **Suggest Features** - Check `future-releases.md` first
3. **Submit PRs** - Fork, create a branch, make changes, submit PR
4. **Improve Translations** - Help translate to more languages
5. **Share** - Tell others about MyJSON Tools

### Development Setup

```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/myjson-tools.git
cd myjson-tools

# Make changes to files

# Test locally
docker-compose up

# Submit a pull request
```

---

## 📈 Roadmap

See `future-releases.md` for a comprehensive list of planned features.

**Coming Soon:**
- JSON Path Tester
- History/Recent Files
- File Upload Support
- JWT Decoder
- More code generators (Go, Python, Java)

---

## 📝 License

MIT License - see LICENSE file for details

---

## 🙏 Acknowledgments

- Inspired by the need for a privacy-first JSON tool
- Built with love for the developer community
- Thanks to all contributors and users

---

## 📞 Support

- **Website:** [https://myjson.tools](https://myjson.tools)
- **Issues:** [GitHub Issues](https://github.com/YOUR-USERNAME/myjson-tools/issues)
- **Discussions:** [GitHub Discussions](https://github.com/YOUR-USERNAME/myjson-tools/discussions)

---

## ⭐ Show Your Support

If you find MyJSON Tools useful, please:
- ⭐ Star the repository on GitHub
- 🐦 Share on Twitter/social media
- 📝 Write a blog post or review
- 🤝 Contribute code or translations
- 💬 Tell your friends and colleagues

---

<div align="center">

**Made with ❤️ for developers**

[Website](https://myjson.tools) • [GitHub](https://github.com/YOUR-USERNAME/myjson-tools) • [Report Bug](https://github.com/YOUR-USERNAME/myjson-tools/issues)

</div>
