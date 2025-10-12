# JSON Playground

A minimalistic web application for transforming, formatting, and converting JSON data, built with design precision and following golden ratio principles.

## Features

### Transform Mode
- **JSON Compression**: Remove all unnecessary whitespace and minify JSON
- **JSON Beautify**: Format JSON with proper indentation for readability
- **JSON Sort**: Alphabetically sort all object keys recursively
- **TypeScript Interface Generator**: Auto-generate TypeScript interfaces from JSON
- **JSON to YAML**: Convert JSON to YAML format with proper structure
- **JSON to XML**: Convert JSON to XML format with proper tag structure

### Compare Mode
- **JSON Diff/Compare**: Compare two JSON objects side-by-side and see detailed differences
- **Visual Diff Display**: Color-coded differences (added, removed, modified)
- **Deep Comparison**: Recursively compares nested objects and arrays
- **Swap Functionality**: Quickly swap JSON A and JSON B

### General Features
- **Mode Switcher**: Seamlessly switch between Transform and Compare modes
- **Dark Mode**: Toggle between light and dark themes with smooth transitions
- **Multilingual Support**: Available in English, Spanish, Arabic, French, and German
- **RTL Support**: Full right-to-left language support for Arabic
- **Line Numbers**: Easy-to-read line numbers with synchronized scrolling
- **Real-time Statistics**: View size, line count, and compression ratio
- **Clipboard Integration**: Quick paste and copy functionality
- **File Download**: Export processed JSON as a file
- **Sample Data**: Load example JSON for testing
- **Keyboard Shortcuts**: Speed up your workflow
- **Beautiful UI**: Minimalistic design following golden ratio principles

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Web Server**: Nginx (Alpine Linux)
- **Containerization**: Docker & Docker Compose
- **Design**: Golden ratio-based layout and spacing

## Quick Start

### Prerequisites

- Docker
- Docker Compose

### Running the Application

1. Clone or navigate to the project directory:
   ```bash
   cd /Users/saad/Documents/cursor/json-compressor
   ```

2. Build and run with Docker Compose:
   ```bash
   docker-compose up -d
   ```

3. Access the application:
   ```
   http://localhost:8090
   ```

### Stopping the Application

```bash
docker-compose down
```

## Usage

### Basic Operations

1. **Compress JSON**:
   - Paste or type JSON in the left panel
   - Click the "Compress" button or press `Cmd/Ctrl + Enter`
   - Compressed JSON appears in the right panel

2. **Beautify JSON**:
   - Paste minified or messy JSON in the left panel
   - Click the "Beautify" button (star icon)
   - Beautifully formatted JSON appears in the right panel

3. **Sort JSON**:
   - Paste JSON in the left panel
   - Click the "Sort" button
   - JSON with alphabetically sorted keys appears in the right panel
   - Note: Arrays maintain their original order, only object keys are sorted

4. **TypeScript Interface Generator**:
   - Paste JSON in the left panel
   - Click the "TypeScript" button
   - TypeScript interfaces are automatically generated in the right panel
   - Handles nested objects, arrays, and complex structures
   - Perfect for rapid TypeScript development and type-safe API integration

5. **JSON to YAML**:
   - Paste JSON in the left panel
   - Click the "YAML" button (code brackets icon)
   - Properly formatted YAML appears in the right panel
   - Perfect for Kubernetes configs, Docker Compose, and more

6. **JSON to XML**:
   - Paste JSON in the left panel
   - Click the "XML" button (document icon)
   - Properly formatted XML appears in the right panel
   - Handles nested objects, arrays, and special XML characters
   - Perfect for API integrations, data exchange, and legacy systems

7. **Dark Mode**:
   - Click the sun/moon icon in the header to toggle themes
   - Your preference is saved automatically

### Compare Mode

**NEW: JSON Diff/Compare functionality!**

1. **Switch to Compare Mode**:
   - Click the "Compare" button at the top (below the header)
   - The layout will change to show two side-by-side JSON inputs

2. **Compare JSON objects**:
   - Paste your original JSON into the left panel (JSON A)
   - Paste your modified JSON into the right panel (JSON B)
   - Click the "Compare" button in the center
   - View detailed differences in the output section below

3. **Understanding the Diff**:
   - **Green (+ Added)**: Fields that exist in JSON B but not in JSON A
   - **Red (- Removed)**: Fields that exist in JSON A but not in JSON B
   - **Blue (≠ Modified)**: Fields that have different values between the two JSONs
   - Deep comparison works recursively through nested objects and arrays

4. **Additional Compare Features**:
   - **Swap**: Quickly exchange JSON A and JSON B contents
   - **Paste**: Paste from clipboard to either JSON field
   - **Clear**: Clear individual JSON fields or the diff output
   - **Copy**: Copy the diff results to clipboard

### Keyboard Shortcuts

- `Cmd/Ctrl + Enter` - Compress JSON (Transform mode) / Compare JSON (Compare mode)
- `Cmd/Ctrl + Shift + Enter` - Decompress JSON (Transform mode)
- `Cmd/Ctrl + K` - Clear input

### Additional Features

- **Mode Switcher**: Toggle between Transform and Compare modes (preference saved)
- **Theme Toggle**: Switch between light and dark modes with the sun/moon button
- **Language Selection**: Choose from 5 languages using the dropdown in the header
- **Clear**: Remove all content from input or output
- **Paste**: Paste from clipboard to input
- **Copy**: Copy output to clipboard
- **Download**: Save output as JSON file (Transform mode)
- **Sample**: Load example JSON for testing (Transform mode)

### Supported Languages

The application is fully translated into:
- **English** (en)
- **Spanish** (es)
- **Arabic** (ar) - with RTL support
- **French** (fr)
- **German** (de)

The selected language, theme, and mode are automatically saved in your browser's localStorage.

## Design Philosophy

This application follows strict design principles:

### Golden Ratio (φ ≈ 1.618)

The entire UI is built around the golden ratio for harmonious proportions:

- **Spacing**: All margins and paddings use golden ratio multipliers
- **Typography**: Font sizes scale using φ
- **Layout**: Component sizes follow golden ratio proportions

### Minimalism

- Clean, uncluttered interface
- Focus on core functionality
- No unnecessary decorations
- Intuitive user experience

### Color Palette

**Light Mode:**
- Background: #FAFAFA
- Surface: #FFFFFF
- Primary: #2C3E50
- Accent: #3498DB

**Dark Mode:**
- Background: #1A1A1A
- Surface: #2D2D2D
- Primary: #E8E8E8
- Accent: #5DADE2

Both themes use the golden ratio for spacing and maintain perfect contrast ratios for accessibility.

## Project Structure

```
json-playground/
├── index.html          # Main HTML structure with Transform and Compare modes
├── styles.css          # CSS with golden ratio styling and dark mode
├── languages.js        # Multilingual translations (EN, ES, AR, FR, DE)
├── app.js              # JavaScript application logic with diff algorithm
├── nginx.conf          # Nginx configuration
├── Dockerfile          # Docker image definition
├── docker-compose.yml  # Docker Compose configuration
├── future-releases.md  # Upcoming features roadmap
└── README.md           # This file
```

## Adding New Languages

To add a new language:

1. Open `languages.js`
2. Add a new language object following this structure:

```javascript
languageCode: {
    name: "Language Name",
    dir: "ltr",  // or "rtl" for right-to-left languages
    translations: {
        title: "Translated Title",
        // ... add all translation keys
    }
}
```

3. Add the language option to the dropdown in `index.html`:

```html
<option value="languageCode">Language Name</option>
```

4. Rebuild the Docker image:

```bash
docker-compose up -d --build
```

## Development

### Running Locally (without Docker)

You can also run this application locally using any static file server:

```bash
# Using Python
python -m http.server 8090

# Using Node.js
npx serve -p 8090

# Using PHP
php -S localhost:8090
```

### Rebuilding the Docker Image

After making changes to the code:

```bash
docker-compose up -d --build
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Performance

- Lightweight: ~25KB total (uncompressed)
- Fast load times
- No external dependencies
- Client-side processing (no server required)

## Security

- No data is sent to any server
- All processing happens in the browser
- Secure headers configured in Nginx
- XSS protection enabled

## License

This project is open source and available for personal and commercial use.

## Future Roadmap

We have exciting features planned! Check out our [Future Releases Roadmap](future-releases.md) to see what's coming next and vote on features you'd like to see.

**Upcoming highlights:**
- JSON Diff/Compare
- TypeScript Interface Generator
- History/Recent Files
- JSON Path Tester
- And 36 more features!

## Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

## Support

For issues or questions, please open an issue in the project repository.

---

Built with precision • Following golden ratio principles

