# Social Media Images TODO

These images need to be created for full SEO optimization:

## 🎨 Required Images

### 1. og-image.png
**Purpose:** Open Graph image for Facebook, LinkedIn, etc.
**Dimensions:** 1200 x 630 pixels
**Format:** PNG or JPG
**File size:** < 1MB recommended

**Content Suggestions:**
- MyJSON Tools logo (centered or top-left)
- Main heading: "MyJSON Tools"
- Tagline: "Your Personal JSON Toolkit"
- Feature highlights: "Format • Validate • Convert • Compare"
- Clean background with brand colors (#3b82f6 blue)
- Consider showing a screenshot of the tool

**Tools to Use:**
- Figma (https://figma.com)
- Canva (https://canva.com)
- Photoshop/Sketch
- Online generators: https://www.opengraph.xyz/

**Template Ideas:**
```
┌─────────────────────────────────────────────┐
│  {·}  MyJSON Tools                          │
│       Your Personal JSON Toolkit            │
│                                             │
│  ✓ Format   ✓ Validate                     │
│  ✓ Convert  ✓ Compare                      │
│                                             │
│  15+ Features • Works Offline • Free        │
│                                             │
│  myjson.tools                               │
└─────────────────────────────────────────────┘
```

---

### 2. twitter-card.png
**Purpose:** Twitter card image
**Dimensions:** 1200 x 600 pixels (2:1 ratio)
**Format:** PNG or JPG
**File size:** < 1MB recommended

**Content Suggestions:**
- Similar to OG image but optimized for Twitter's 2:1 ratio
- More horizontal layout
- Same branding elements
- Consider a cleaner, simpler design for Twitter

---

### 3. screenshot.png
**Purpose:** JSON-LD structured data, app stores
**Dimensions:** 1280 x 720 pixels (16:9 ratio)
**Format:** PNG
**File size:** Optimized for web

**Content:**
- Clean screenshot of the tool in action
- Show both input and output panels
- Include some sample JSON being formatted
- Ideally show the tool with one of the popular features
- Light mode recommended (or both light/dark)

**How to Create:**
1. Open https://myjson.tools in browser
2. Set window to 1280x720 or larger
3. Load some sample JSON
4. Perform a transformation (e.g., beautify)
5. Use browser screenshot tool or screen capture
6. Crop to exactly 1280x720
7. Optimize file size

---

### 4. screenshot-wide.png (Optional PWA)
**Purpose:** PWA screenshot for wide displays
**Dimensions:** 1280 x 720 pixels
**Format:** PNG

**Content:**
- Desktop view of the application
- Shows full interface with all features visible

---

### 5. screenshot-narrow.png (Optional PWA)
**Purpose:** PWA screenshot for mobile devices
**Dimensions:** 750 x 1334 pixels (iPhone aspect ratio)
**Format:** PNG

**Content:**
- Mobile view of the application
- Shows responsive mobile interface

---

## 🎯 Brand Colors

Use these colors consistently across all images:

**Primary Blue:** #3b82f6
**Accent Blue:** #2563eb
**Background Light:** #f8f9fa
**Background Dark:** #0f0f0f
**Text:** #1f2937 (light mode) or #f8f9fa (dark mode)

---

## 📐 Design Tips

1. **Keep it simple** - Don't overcrowd the image
2. **High contrast** - Text should be easily readable
3. **Brand consistent** - Use logo and brand colors
4. **Mobile preview** - Test how it looks on small devices
5. **File optimization** - Compress images for faster loading
6. **Test before deploy** - Preview on Facebook/Twitter debuggers

---

## ✅ Where to Place Files

Once created, place these files in the project root:

```
myjson-tools/
├── og-image.png          ← Create this (1200x630)
├── twitter-card.png      ← Create this (1200x600)
├── screenshot.png        ← Create this (1280x720)
├── screenshot-wide.png   ← Optional (1280x720)
└── screenshot-narrow.png ← Optional (750x1334)
```

And update the Dockerfile to copy them:

```dockerfile
# Add after the logo/favicon section:
COPY og-image.png /usr/share/nginx/html/
COPY twitter-card.png /usr/share/nginx/html/
COPY screenshot.png /usr/share/nginx/html/
```

---

## 🧪 Testing Tools

### After creating images, test them with:

1. **Facebook Debugger**
   https://developers.facebook.com/tools/debug/

2. **Twitter Card Validator**
   https://cards-dev.twitter.com/validator

3. **LinkedIn Post Inspector**
   https://www.linkedin.com/post-inspector/

4. **Schema Markup Validator**
   https://validator.schema.org/

---

## 📝 Current Status

- [ ] og-image.png (1200x630)
- [ ] twitter-card.png (1200x600)
- [ ] screenshot.png (1280x720)
- [ ] screenshot-wide.png (optional)
- [ ] screenshot-narrow.png (optional)
- [ ] Add images to Dockerfile
- [ ] Test with social media debuggers
- [ ] Deploy and verify

---

## 💡 Quick Win

If you don't have time to create professional graphics right away:

1. Take a clean screenshot of the tool → `screenshot.png`
2. Use Canva's free OG image template
3. Add logo + text overlay
4. Export as PNG
5. Deploy and iterate later

**The SEO meta tags are already in place and waiting for these images!**

