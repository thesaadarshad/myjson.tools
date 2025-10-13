#!/bin/bash

# Cache Busting Version Bumper
# This script updates version numbers across all files for cache busting

set -e

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get current version
CURRENT_VERSION=$(cat VERSION)
echo -e "${BLUE}Current version: ${CURRENT_VERSION}${NC}"

# Ask for new version
read -p "Enter new version (e.g., 1.0.2): " NEW_VERSION

if [ -z "$NEW_VERSION" ]; then
    echo "Error: Version cannot be empty"
    exit 1
fi

echo -e "${YELLOW}Updating version from ${CURRENT_VERSION} to ${NEW_VERSION}...${NC}"

# Update VERSION file
echo "$NEW_VERSION" > VERSION

# Update index.html
sed -i.bak "s/?v=${CURRENT_VERSION}/?v=${NEW_VERSION}/g" src/index.html && rm src/index.html.bak
echo -e "${GREEN}✓${NC} Updated src/index.html"

# Update service-worker.js
sed -i.bak "s/const CACHE_VERSION = '${CURRENT_VERSION}'/const CACHE_VERSION = '${NEW_VERSION}'/g" public/service-worker.js && rm public/service-worker.js.bak
echo -e "${GREEN}✓${NC} Updated public/service-worker.js"

# Update manifest.json version if it exists
if grep -q "\"version\"" public/manifest.json 2>/dev/null; then
    sed -i.bak "s/\"version\": \"${CURRENT_VERSION}\"/\"version\": \"${NEW_VERSION}\"/g" public/manifest.json && rm public/manifest.json.bak
    echo -e "${GREEN}✓${NC} Updated public/manifest.json"
fi

echo ""
echo -e "${GREEN}✅ Version bump complete!${NC}"
echo -e "${BLUE}New version: ${NEW_VERSION}${NC}"
echo ""
echo "Next steps:"
echo "1. Review changes: git diff"
echo "2. Test locally: cd docker && docker-compose up -d --build"
echo "3. Commit: git add . && git commit -m \"Bump version to ${NEW_VERSION}\""
echo "4. Tag: git tag v${NEW_VERSION}"
echo "5. Push: git push && git push --tags"

