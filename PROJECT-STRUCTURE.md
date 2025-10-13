# Project Structure

> **Clean, organized directory structure for MyJSON Tools**

---

## 📂 Directory Overview

```
json-compressor/
├── src/                          # Source code
│   ├── js/                      # JavaScript files
│   │   ├── app.js              # Main application logic
│   │   └── languages.js        # i18n translations
│   ├── css/                     # Stylesheets
│   │   └── styles.css          # All CSS styling
│   └── index.html               # Main HTML file
│
├── public/                       # Static assets & runtime files
│   ├── assets/                  # Media assets
│   │   ├── icons/              # PWA icons (*.png)
│   │   └── images/             # Logo, favicon (*.svg)
│   ├── libs/                    # Third-party libraries
│   │   ├── prism/              # Prism.js syntax highlighting
│   │   ├── jsonrepair.min.js   # JSON repair library
│   │   └── tabular-json.min.js # Tabular-JSON library
│   ├── manifest.json            # PWA manifest
│   ├── service-worker.js        # Offline caching
│   ├── sitemap.xml             # SEO sitemap
│   ├── robots.txt              # Search engine directives
│   └── browserconfig.xml        # Windows tile config
│
├── docker/                       # Docker configuration
│   ├── Dockerfile              # Container image definition
│   ├── docker-compose.yml      # Orchestration config
│   └── nginx.conf              # Web server config
│
├── docs/                         # Documentation
│   ├── TABULAR-JSON.md         # Tabular-JSON feature docs
│   ├── CACHE-BUSTING.md        # Cache busting strategy
│   ├── seo-plan.md             # SEO implementation
│   ├── domain-research.md      # Domain selection research
│   └── future-releases.md      # Feature roadmap
│
├── scripts/                      # Build & utility scripts
│   ├── bump-version.sh         # Version management
│   └── generate-icons.sh       # PWA icon generator
│
├── .gitignore                   # Git ignore rules
├── .dockerignore               # Docker ignore rules
├── README.md                    # Project documentation
├── CHANGELOG.md                # Version history
├── LICENSE                      # MIT license
├── VERSION                      # Current version
├── package.json                # npm dependencies
└── package-lock.json           # Dependency lock file
```

---

## 🎯 Benefits

### Before (Messy Root)
- ❌ 40+ files in root directory
- ❌ Hard to find specific files
- ❌ Mixed concerns (source, assets, config)
- ❌ Difficult to scale
- ❌ Confusing for new contributors

### After (Clean Structure)
- ✅ **Only 10 files** in root (configs only)
- ✅ **Logical grouping** by purpose
- ✅ **Clear separation** of concerns
- ✅ **Easy to navigate** and find files
- ✅ **Scalable** for future growth
- ✅ **Professional** standard structure

---

## 📁 Directory Purposes

### `src/` - Source Code
Application source files that get served to users.
- HTML, CSS, JavaScript
- The core of the application

### `public/` - Static Assets
Files that are served as-is without processing.
- Assets (images, icons)
- Third-party libraries
- PWA files (manifest, service worker)
- SEO files (sitemap, robots.txt)

### `docker/` - Docker Configuration
Everything related to containerization.
- Dockerfile (image definition)
- docker-compose.yml (orchestration)
- nginx.conf (web server config)

### `docs/` - Documentation
Project documentation and planning.
- Feature documentation
- Technical guides
- Planning documents

### `scripts/` - Automation Scripts
Build and utility scripts.
- Version management
- Icon generation
- Other automation tasks

---

## 🔧 Path Updates

All path references were updated in:

### Files Modified
1. **`src/index.html`**
   - CSS: `/css/styles.css`
   - JS: `/js/app.js`, `/js/languages.js`
   - Libs: `/libs/prism/*`, `/libs/jsonrepair.min.js`, etc.
   - Icons: `/assets/icons/*`
   - Images: `/assets/images/*`

2. **`docker/Dockerfile`**
   - Updated all `COPY` commands
   - Source files from `src/`
   - Public files from `public/`
   - Build context set to project root

3. **`docker/docker-compose.yml`**
   - Context: `..` (parent directory)
   - Dockerfile: `docker/Dockerfile`

4. **`public/service-worker.js`**
   - Updated all cached URLs
   - New paths for CSS, JS, libs, assets

5. **`public/manifest.json`**
   - Updated all icon paths
   - Shortcut icon paths

6. **`scripts/bump-version.sh`**
   - Updated file paths for version bumping
   - Docker command path

---

## 🚀 How to Use

### Development
```bash
# From project root
cd docker
docker-compose up -d --build

# Access at http://localhost:8090
```

### Build for Production
```bash
cd docker
docker-compose build
```

### Version Bump
```bash
# From project root
bash scripts/bump-version.sh
```

### Generate Icons
```bash
bash scripts/generate-icons.sh
```

---

## 📦 Deployment

When deploying, the Docker container:
1. **Copies** files from `src/` and `public/`
2. **Serves** them via Nginx
3. **Maps** directory structure to web paths

**Result:** URLs work correctly (e.g., `/css/styles.css` → `public/css/styles.css`)

---

## 🔄 Git History

All files were moved using `git mv`, preserving full history:
- ✅ **Commit history** intact
- ✅ **Blame** still works
- ✅ **Diffs** traceable across moves

---

## 📊 File Count

| Location | Before | After | Reduction |
|----------|--------|-------|-----------|
| Root directory | 40+ files | 10 files | **75%** |
| Total project | Same | Same | Organized! |

---

## 🎉 Result

**Clean, professional, scalable directory structure** that follows industry best practices!

---

**Branch:** `feature/restructure`  
**Status:** ✅ Built & Running  
**Ready:** For testing and merge

