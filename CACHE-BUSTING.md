# Cache Busting Strategy

## 🎯 Overview

This project implements a comprehensive cache busting strategy to ensure users always get the latest version of the application without hard refreshes.

## 📦 Current Version

**Version:** `1.0.1`

The current version is stored in the `VERSION` file at the root of the project.

## 🔧 How It Works

### 1. **Query String Versioning**

All static assets (CSS, JS) include a version query parameter:

```html
<link rel="stylesheet" href="styles.css?v=1.0.1">
<script src="app.js?v=1.0.1"></script>
```

**How it works:**
- Browser sees `app.js?v=1.0.1` as a different file than `app.js?v=1.0.0`
- When version changes, browser fetches new files
- Old cached versions are ignored

### 2. **Service Worker Cache Management**

The Service Worker (`service-worker.js`) uses versioned cache names:

```javascript
const CACHE_VERSION = '1.0.1';
const CACHE_NAME = `json-playground-v${CACHE_VERSION}`;
```

**Behavior:**
- New version = new cache name
- Old caches are automatically cleaned up
- Ensures PWA users get updates

### 3. **Nginx Cache Headers**

Smart caching configuration in `nginx.conf`:

#### HTML Files (Always Fresh)
```nginx
location ~* \.html$ {
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```
- HTML is never cached
- Always serves latest with updated version query strings

#### Versioned CSS/JS (Long Cache)
```nginx
location ~* \.(css|js)$ {
    if ($args) {
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```
- Files with `?v=x.x.x` cached for 1 year
- Safe because version changes = new URL

#### Non-versioned Assets (Short Cache)
```nginx
if ($args = "") {
    add_header Cache-Control "public, max-age=300";
}
```
- 5 minutes cache for development

## 🚀 Updating Version

### Automatic (Recommended)

Use the provided script:

```bash
./bump-version.sh
```

The script will:
1. ✅ Prompt for new version number
2. ✅ Update `VERSION` file
3. ✅ Update all query strings in `index.html`
4. ✅ Update `CACHE_VERSION` in `service-worker.js`
5. ✅ Update version in `manifest.json` (if exists)
6. ✅ Show next steps (commit, tag, push)

**Example:**
```bash
$ ./bump-version.sh
Current version: 1.0.1
Enter new version (e.g., 1.0.2): 1.0.2

Updating version from 1.0.1 to 1.0.2...
✓ Updated index.html
✓ Updated service-worker.js
✓ Updated manifest.json

✅ Version bump complete!
New version: 1.0.2

Next steps:
1. Review changes: git diff
2. Test locally: docker-compose up -d --build
3. Commit: git add . && git commit -m "Bump version to 1.0.2"
4. Tag: git tag v1.0.2
5. Push: git push && git push --tags
```

### Manual

If you prefer manual updates:

1. **Update VERSION file:**
   ```bash
   echo "1.0.2" > VERSION
   ```

2. **Update index.html:**
   - Find all occurrences of `?v=1.0.1`
   - Replace with `?v=1.0.2`

3. **Update service-worker.js:**
   ```javascript
   const CACHE_VERSION = '1.0.2';
   ```

4. **Rebuild and deploy:**
   ```bash
   docker-compose down
   docker-compose up -d --build
   ```

## 📋 When to Bump Version

### Patch Version (x.x.X)
Bump for:
- ✅ Bug fixes
- ✅ Minor styling changes
- ✅ Small improvements
- ✅ Translations updates

**Example:** `1.0.1` → `1.0.2`

### Minor Version (x.X.x)
Bump for:
- ✅ New features
- ✅ New tools/converters
- ✅ Significant UI changes
- ✅ New functionality

**Example:** `1.0.2` → `1.1.0`

### Major Version (X.x.x)
Bump for:
- ✅ Breaking changes
- ✅ Complete redesign
- ✅ Architecture changes
- ✅ Major rewrites

**Example:** `1.1.0` → `2.0.0`

## 🧪 Testing Cache Busting

### Test 1: Version Update Works

1. Note current version in browser DevTools (Network tab)
2. Run `./bump-version.sh` to bump version
3. Rebuild: `docker-compose up -d --build`
4. Hard refresh browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
5. Check Network tab - should see new `?v=x.x.x` query strings

### Test 2: Service Worker Updates

1. Open DevTools → Application → Service Workers
2. Note current cache name (e.g., `json-playground-v1.0.1`)
3. Bump version and rebuild
4. Refresh page
5. New cache should appear (e.g., `json-playground-v1.0.2`)
6. Old cache should be deleted after activation

### Test 3: No Hard Refresh Needed

1. Deploy new version with bumped version number
2. Users should get updates automatically on next visit
3. No need for Cmd+Shift+R or cache clearing

## 🛠️ Troubleshooting

### Problem: Changes not showing up

**Solution 1: Check version is bumped**
```bash
cat VERSION
grep "v=" index.html | head -1
grep "CACHE_VERSION" service-worker.js
```
All should show the same new version.

**Solution 2: Hard refresh once**
```
Mac: Cmd + Shift + R
Windows/Linux: Ctrl + Shift + R
```

**Solution 3: Clear Service Worker**
1. DevTools → Application → Service Workers
2. Click "Unregister"
3. Refresh page

### Problem: Service Worker not updating

**Check:**
```javascript
// In service-worker.js
self.addEventListener('install', (event) => {
  return self.skipWaiting(); // ✅ Should be present
});

self.addEventListener('activate', (event) => {
  return self.clients.claim(); // ✅ Should be present
});
```

### Problem: Files still cached incorrectly

**Check nginx logs:**
```bash
docker exec -it json-playground cat /var/log/nginx/access.log
docker exec -it json-playground cat /var/log/nginx/error.log
```

**Verify headers:**
```bash
curl -I http://localhost:8090/app.js?v=1.0.1
```
Should show: `Cache-Control: public, max-age=31536000, immutable`

## 📊 Cache Strategy Summary

| Asset Type | Cache Duration | Update Strategy |
|------------|---------------|-----------------|
| **HTML** | No cache | Always fresh |
| **Versioned CSS/JS** | 1 year | Version bump forces reload |
| **Non-versioned CSS/JS** | 5 minutes | For development |
| **Service Worker** | No cache | Always checks for updates |
| **Manifest** | 1 week | Rarely changes |
| **Icons** | 1 year | Immutable |
| **Images** | 1 year | Immutable |

## 🎯 Benefits

### For Users
- ✅ Always get latest features automatically
- ✅ No need to clear cache manually
- ✅ No hard refreshes needed
- ✅ Fast loading (aggressive caching when possible)

### For Developers
- ✅ Simple version bump script
- ✅ Confidence that users see updates
- ✅ No cache-related support issues
- ✅ Easy rollback (just revert version)

### For Performance
- ✅ Aggressive caching of versioned assets (1 year)
- ✅ Reduced server load
- ✅ Faster page loads for returning users
- ✅ Efficient PWA offline experience

## 📚 Resources

- **Service Worker Lifecycle:** https://web.dev/service-worker-lifecycle/
- **HTTP Caching:** https://web.dev/http-cache/
- **Versioning Best Practices:** https://semver.org/

## 🔄 Deployment Workflow

1. **Make changes** to code
2. **Run script:** `./bump-version.sh`
3. **Enter new version:** e.g., `1.0.2`
4. **Review changes:** `git diff`
5. **Test locally:** `docker-compose up -d --build`
6. **Commit:** `git add . && git commit -m "Release v1.0.2"`
7. **Tag:** `git tag v1.0.2`
8. **Push:** `git push && git push --tags`
9. **Deploy** to production

## ✅ Checklist Before Release

- [ ] Version bumped in all files
- [ ] Tested locally with new version
- [ ] Service Worker cache name updated
- [ ] Git commit includes version in message
- [ ] Git tag created with `v` prefix
- [ ] Changes documented in CHANGELOG.md
- [ ] Tested in incognito/private window
- [ ] Verified Network tab shows new version query strings

---

**Current Implementation Date:** October 2025  
**Last Updated:** v1.0.1

