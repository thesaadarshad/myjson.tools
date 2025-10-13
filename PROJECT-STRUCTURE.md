# Project Structure

> **GitHub Pages compatible directory structure for MyJSON Tools**

---

## 📂 Directory Overview

```
json-compressor/
├── index.html                    # Main HTML file (root for GitHub Pages)
├── css/                          # Stylesheets
│   └── styles.css               # All CSS styling
├── js/                           # JavaScript files
│   ├── app.js                   # Main application logic
│   └── languages.js             # i18n translations
├── libs/                         # Third-party libraries
│   ├── prism/                   # Prism.js syntax highlighting
│   ├── jsonrepair.min.js        # JSON repair library
│   └── tabular-json.min.js      # Tabular-JSON library
├── assets/                       # Media assets
│   ├── icons/                   # PWA icons (*.png)
│   └── images/                  # Logo, favicon (*.svg)
├── manifest.json                 # PWA manifest
├── service-worker.js             # Offline caching
├── sitemap.xml                  # SEO sitemap
├── robots.txt                   # Search engine directives
├── browserconfig.xml             # Windows tile config
│
├── docker/                       # Docker configuration
│   ├── Dockerfile               # Container image definition
│   ├── docker-compose.yml       # Orchestration config
│   └── nginx.conf               # Web server config
│
├── docs/                         # Documentation
│   ├── TABULAR-JSON.md          # Tabular-JSON feature docs
│   ├── CACHE-BUSTING.md         # Cache busting strategy
│   ├── seo-plan.md              # SEO implementation
│   ├── domain-research.md       # Domain selection research
│   └── future-releases.md       # Feature roadmap
│
├── scripts/                      # Build & utility scripts
│   ├── bump-version.sh          # Version management
│   └── generate-icons.sh        # PWA icon generator
│
├── .gitignore                   # Git ignore rules
├── .dockerignore                # Docker ignore rules
├── README.md                    # Project documentation
├── CHANGELOG.md                 # Version history
├── LICENSE                      # MIT license
├── VERSION                      # Current version
├── package.json                 # npm dependencies
└── package-lock.json            # Dependency lock file
```

---

## 🎯 Design Philosophy

### GitHub Pages Compatible
- ✅ **`index.html` in root** - Required for GitHub Pages
- ✅ **All web assets accessible** - CSS, JS, libs, assets in root
- ✅ **Clean organization** - Docker, docs, scripts separated
- ✅ **Direct deployment** - No build step needed

### Best of Both Worlds
- ✅ **Web files in root** - GitHub Pages ready
- ✅ **Infrastructure organized** - docker/, docs/, scripts/
- ✅ **Scalable** - Easy to add new features
- ✅ **Professional** - Clean separation

---

## 📁 Directory Purposes

### Root Level (Web Accessible)
Files that need to be directly accessible via URL.
- `index.html` - Main application
- `css/`, `js/` - Source code
- `libs/` - Third-party libraries
- `assets/` - Images, icons
- PWA files (manifest, service-worker)
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

## 🚀 Deployment

### GitHub Pages
```bash
# Simply push to main branch
git push origin main

# GitHub Pages will automatically serve from root
# Access at: https://yourusername.github.io/repo-name
```

### Docker (Local/Production)
```bash
# From project root
cd docker
docker-compose up -d --build

# Access at http://localhost:8090
```

---

## 🔧 Development Workflow

### Version Bump
```bash
# From project root
bash scripts/bump-version.sh
```

### Generate Icons
```bash
bash scripts/generate-icons.sh
```

### Local Development
```bash
# Option 1: Docker
cd docker && docker-compose up -d --build

# Option 2: Simple HTTP server
python3 -m http.server 8090
# or
npx http-server -p 8090
```

---

## 📊 Benefits

✅ **GitHub Pages Ready** - `index.html` in root  
✅ **No Build Required** - Direct deployment  
✅ **Organized Infrastructure** - docker/, docs/, scripts/  
✅ **Clean Root** - Only essential web files  
✅ **Easy Navigation** - Logical structure  
✅ **Git History Preserved** - All moves tracked  

---

## 🔄 URLs Map Directly

GitHub Pages serves files from root:
- `/` → `index.html`
- `/css/styles.css` → `css/styles.css`
- `/js/app.js` → `js/app.js`
- `/libs/prism/prism.min.js` → `libs/prism/prism.min.js`
- `/assets/icons/icon-192x192.png` → `assets/icons/icon-192x192.png`

**No path translation needed!** ✅

---

## 📝 Notes

- **Docker still works** - Dockerfile updated to copy from new paths
- **All features work** - No functionality changes
- **Git history intact** - Used `git mv` for all moves
- **Version 1.0.8** - Structure finalized

---

**Structure optimized for GitHub Pages deployment! 🚀**
