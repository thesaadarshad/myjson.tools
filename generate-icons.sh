#!/bin/bash

# Generate PWA icons for JSON Playground
# This script creates simple colored icons with text

# Icon sizes needed for PWA
SIZES=(72 96 128 144 152 192 384 512)

# Colors for the icon (JSON Playground theme)
BG_COLOR="#3b82f6"
TEXT_COLOR="#ffffff"

# Create icons directory if it doesn't exist
mkdir -p icons

# Function to create SVG icon
create_svg() {
  local size=$1
  local filename="icon-${size}x${size}.svg"
  
  cat > "$filename" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="${BG_COLOR}" rx="$((size/8))"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${TEXT_COLOR}" font-family="Arial, sans-serif" font-weight="bold" font-size="$((size/3))">{ }</text>
</svg>
EOF
  
  echo "Created $filename"
}

# Function to convert SVG to PNG (if ImageMagick is installed)
convert_to_png() {
  local size=$1
  local svg_file="icon-${size}x${size}.svg"
  local png_file="icon-${size}x${size}.png"
  
  if command -v convert &> /dev/null; then
    convert -background none "$svg_file" -resize "${size}x${size}" "$png_file"
    echo "Converted to $png_file"
    rm "$svg_file"
  elif command -v magick &> /dev/null; then
    magick -background none "$svg_file" -resize "${size}x${size}" "$png_file"
    echo "Converted to $png_file"
    rm "$svg_file"
  else
    echo "ImageMagick not found. Keeping $svg_file (you can manually convert it)"
    mv "$svg_file" "$png_file.svg"
  fi
}

echo "Generating PWA icons for JSON Playground..."
echo "============================================"

for size in "${SIZES[@]}"; do
  create_svg "$size"
  convert_to_png "$size"
done

echo ""
echo "Icon generation complete!"
echo ""
echo "If PNG files were not created (ImageMagick not installed),"
echo "you can use online tools like:"
echo "  - https://convertio.co/svg-png/"
echo "  - https://cloudconvert.com/svg-to-png"
echo ""
echo "Or install ImageMagick:"
echo "  macOS: brew install imagemagick"
echo "  Linux: sudo apt-get install imagemagick"
echo "  Windows: https://imagemagick.org/script/download.php"

