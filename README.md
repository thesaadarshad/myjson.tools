# JSON Playground

A minimalistic web application for transforming, formatting, and converting JSON data, built with design precision and following golden ratio principles.

## Features

- **JSON Compression**: Remove all unnecessary whitespace and minify JSON
- **JSON Beautify**: Format JSON with proper indentation for readability
- **JSON Sort**: Alphabetically sort all object keys recursively
- **JSON to YAML**: Convert JSON to YAML format with proper structure
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

4. **JSON to YAML**:
   - Paste JSON in the left panel
   - Click the "YAML" button (code brackets icon)
   - Properly formatted YAML appears in the right panel
   - Perfect for Kubernetes configs, Docker Compose, and more

5. **Dark Mode**:
   - Click the sun/moon icon in the header to toggle themes
   - Your preference is saved automatically

### Keyboard Shortcuts

- `Cmd/Ctrl + Enter` - Compress JSON
- `Cmd/Ctrl + Shift + Enter` - Decompress JSON
- `Cmd/Ctrl + K` - Clear input

### Additional Features

- **Theme Toggle**: Switch between light and dark modes with the sun/moon button
- **Language Selection**: Choose from 5 languages using the dropdown in the header
- **Clear**: Remove all content from input or output
- **Paste**: Paste from clipboard to input
- **Copy**: Copy output to clipboard
- **Download**: Save output as JSON file
- **Sample**: Load example JSON for testing

### Supported Languages

The application is fully translated into:
- **English** (en)
- **Spanish** (es)
- **Arabic** (ar) - with RTL support
- **French** (fr)
- **German** (de)

The selected language and theme are automatically saved in your browser's localStorage.

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
├── index.html          # Main HTML structure
├── styles.css          # CSS with golden ratio styling
├── languages.js        # Multilingual translations
├── app.js              # JavaScript application logic
├── nginx.conf          # Nginx configuration
├── Dockerfile          # Docker image definition
├── docker-compose.yml  # Docker Compose configuration
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

## Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

## Support

For issues or questions, please open an issue in the project repository.

---

Built with precision • Following golden ratio principles

