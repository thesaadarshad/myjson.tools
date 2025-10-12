/**
 * JSON Playground Application
 * Handles JSON transformation, formatting, conversion, and more
 */

class JSONCompressor {
    constructor() {
        console.log('JSONCompressor constructor called');
        console.log('Document ready state:', document.readyState);
        
        // Get all DOM elements with debugging
        const elements = {
            inputTextarea: 'inputJson',
            outputTextarea: 'outputJson',
            inputLineNumbers: 'inputLineNumbers',
            outputLineNumbers: 'outputLineNumbers',
            inputStats: 'inputStats',
            outputStats: 'outputStats',
            compressionRatio: 'compressionRatio',
            notification: 'notification',
            languageSelect: 'languageSelect',
            themeToggle: 'themeToggle',
            themeIcon: 'themeIcon'
        };
        
        // Try to get each element and log results
        for (const [key, id] of Object.entries(elements)) {
            this[key] = document.getElementById(id);
            if (!this[key]) {
                console.error(`Element not found: ${id}`);
            } else {
                console.log(`Element found: ${id}`);
            }
        }
        
        // Check if all critical elements exist
        const criticalElements = [
            'inputTextarea', 'outputTextarea', 'languageSelect', 
            'themeToggle', 'notification'
        ];
        
        const missingElements = criticalElements.filter(key => !this[key]);
        
        if (missingElements.length > 0) {
            console.error('Missing critical DOM elements:', missingElements);
            console.error('Cannot initialize application');
            return;
        }
        
        console.log('All critical elements found, initializing...');
        
        // Initialize i18n
        this.currentLanguage = localStorage.getItem('json-compressor-language') || 'en';
        this.translations = typeof translations !== 'undefined' ? translations : {};
        
        // Initialize theme
        this.currentTheme = localStorage.getItem('json-compressor-theme') || 'light';
        
        try {
            this.initializeEventListeners();
            this.setTheme(this.currentTheme);
            this.setLanguage(this.currentLanguage);
            this.updateStats();
            this.updateLineNumbers();
            console.log('JSONCompressor initialized successfully');
        } catch (error) {
            console.error('Error during initialization:', error);
        }
    }

    initializeEventListeners() {
        console.log('Initializing event listeners...');
        
        // Helper function to safely add event listener
        const addListener = (id, event, handler) => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener(event, handler);
                console.log(`Listener added for: ${id}`);
            } else {
                console.error(`Cannot add listener - element not found: ${id}`);
            }
        };
        
        // Compression/Decompression/Beautify/Sort/YAML buttons
        addListener('compressBtn', 'click', () => this.compress());
        addListener('beautifyBtn', 'click', () => this.beautify());
        addListener('sortBtn', 'click', () => this.sortJSON());
        addListener('yamlBtn', 'click', () => this.convertToYAML());
        addListener('decompressBtn', 'click', () => this.decompress());
        
        // Input actions
        addListener('clearInput', 'click', () => this.clearInput());
        addListener('pasteBtn', 'click', () => this.pasteFromClipboard());
        addListener('loadSample', 'click', () => this.loadSample());
        
        // Output actions
        addListener('copyBtn', 'click', () => this.copyToClipboard());
        addListener('downloadBtn', 'click', () => this.downloadJSON());
        addListener('clearOutput', 'click', () => this.clearOutput());
        
        // Update stats and line numbers on input
        this.inputTextarea.addEventListener('input', () => {
            this.updateStats();
            this.updateLineNumbers();
        });
        this.outputTextarea.addEventListener('input', () => {
            this.updateStats();
            this.updateLineNumbers();
        });
        
        // Synchronize scroll between textarea and line numbers
        this.inputTextarea.addEventListener('scroll', () => this.syncScroll(this.inputTextarea, this.inputLineNumbers));
        this.outputTextarea.addEventListener('scroll', () => this.syncScroll(this.outputTextarea, this.outputLineNumbers));
        
        // Language selector and theme toggle
        if (this.languageSelect) {
            this.languageSelect.addEventListener('change', (e) => this.changeLanguage(e.target.value));
            console.log('Language selector listener added');
        }
        
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
            console.log('Theme toggle listener added');
        }
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
        console.log('Keyboard shortcuts listener added');
        
        console.log('All event listeners initialized');
    }

    /**
     * Toggle between light and dark theme
     */
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        localStorage.setItem('json-compressor-theme', newTheme);
    }

    /**
     * Set the theme
     */
    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);
        
        // Update theme icon
        if (theme === 'dark') {
            // Moon icon for dark mode
            this.themeIcon.innerHTML = `
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            `;
        } else {
            // Sun icon for light mode
            this.themeIcon.innerHTML = `
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            `;
        }
    }

    /**
     * Change the application language
     */
    changeLanguage(languageCode) {
        this.setLanguage(languageCode);
        localStorage.setItem('json-compressor-language', languageCode);
    }

    /**
     * Set the language and update all text
     */
    setLanguage(languageCode) {
        if (!this.translations[languageCode]) {
            console.warn(`Language ${languageCode} not found, defaulting to English`);
            languageCode = 'en';
        }

        this.currentLanguage = languageCode;
        this.languageSelect.value = languageCode;

        const langData = this.translations[languageCode];
        const t = langData.translations;

        // Update document direction (RTL/LTR)
        document.body.setAttribute('dir', langData.dir);
        document.documentElement.setAttribute('lang', languageCode);

        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (t[key]) {
                element.textContent = t[key];
            }
        });

        // Update all elements with data-i18n-placeholder attribute
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (t[key]) {
                element.placeholder = t[key];
            }
        });

        // Update all elements with data-i18n-title attribute
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            if (t[key]) {
                element.title = t[key];
            }
        });

        // Update document title
        document.title = t.title || 'JSON Playground';
    }

    /**
     * Get translated text
     */
    t(key) {
        const langData = this.translations[this.currentLanguage];
        return langData?.translations[key] || key;
    }

    /**
     * Compress JSON - removes all unnecessary whitespace
     */
    compress() {
        const input = this.inputTextarea.value.trim();
        
        if (!input) {
            this.showNotification(this.t('nothingToCompress'), 'error');
            return;
        }

        try {
            // Parse JSON to validate
            const parsed = JSON.parse(input);
            
            // Stringify without whitespace (compressed)
            const compressed = JSON.stringify(parsed);
            
            this.outputTextarea.value = compressed;
            this.updateStats();
            this.updateLineNumbers();
            this.showNotification(this.t('compressSuccess'), 'success');
        } catch (error) {
            this.showNotification(`${this.t('invalidJson')}: ${error.message}`, 'error');
            console.error('Compression error:', error);
        }
    }

    /**
     * Beautify JSON - formats with proper indentation (alias for decompress)
     */
    beautify() {
        const input = this.inputTextarea.value.trim();
        
        if (!input) {
            this.showNotification(this.t('nothingToBeautify'), 'error');
            return;
        }

        try {
            // Parse JSON to validate
            const parsed = JSON.parse(input);
            
            // Stringify with 2-space indentation (beautified/pretty)
            const beautified = JSON.stringify(parsed, null, 2);
            
            this.outputTextarea.value = beautified;
            this.updateStats();
            this.updateLineNumbers();
            this.showNotification(this.t('beautifySuccess'), 'success');
        } catch (error) {
            this.showNotification(`${this.t('invalidJson')}: ${error.message}`, 'error');
            console.error('Beautify error:', error);
        }
    }

    /**
     * Sort JSON - recursively sorts all object keys alphabetically
     */
    sortJSON() {
        const input = this.inputTextarea.value.trim();
        
        if (!input) {
            this.showNotification(this.t('nothingToSort'), 'error');
            return;
        }

        try {
            // Parse JSON to validate
            const parsed = JSON.parse(input);
            
            // Recursively sort all object keys
            const sorted = this.sortObjectKeys(parsed);
            
            // Stringify with 2-space indentation
            const output = JSON.stringify(sorted, null, 2);
            
            this.outputTextarea.value = output;
            this.updateStats();
            this.updateLineNumbers();
            this.showNotification(this.t('sortSuccess'), 'success');
        } catch (error) {
            this.showNotification(`${this.t('invalidJson')}: ${error.message}`, 'error');
            console.error('Sort error:', error);
        }
    }

    /**
     * Recursively sort all object keys in a JSON structure
     */
    sortObjectKeys(obj) {
        if (Array.isArray(obj)) {
            // For arrays, recursively sort elements but keep array order
            return obj.map(item => this.sortObjectKeys(item));
        } else if (obj !== null && typeof obj === 'object') {
            // For objects, sort keys alphabetically
            const sorted = {};
            Object.keys(obj).sort().forEach(key => {
                sorted[key] = this.sortObjectKeys(obj[key]);
            });
            return sorted;
        }
        // For primitive values, return as is
        return obj;
    }

    /**
     * Convert JSON to YAML format
     */
    convertToYAML() {
        const input = this.inputTextarea.value.trim();
        
        if (!input) {
            this.showNotification(this.t('nothingToYaml'), 'error');
            return;
        }

        try {
            // Parse JSON to validate
            const parsed = JSON.parse(input);
            
            // Convert to YAML
            const yaml = this.jsonToYAML(parsed);
            
            this.outputTextarea.value = yaml;
            this.updateStats();
            this.updateLineNumbers();
            this.showNotification(this.t('yamlSuccess'), 'success');
        } catch (error) {
            this.showNotification(`${this.t('invalidJson')}: ${error.message}`, 'error');
            console.error('YAML conversion error:', error);
        }
    }

    /**
     * Convert JSON object to YAML format
     */
    jsonToYAML(obj, indent = 0) {
        const spaces = '  '.repeat(indent);
        let yaml = '';

        if (obj === null) {
            return 'null';
        }

        if (typeof obj === 'undefined') {
            return 'null';
        }

        if (typeof obj === 'string') {
            // Handle multi-line strings and special characters
            if (obj.includes('\n') || obj.includes('"') || obj.includes("'")) {
                return `|\n${spaces}  ${obj.split('\n').join(`\n${spaces}  `)}`;
            }
            // Quote strings that need quoting
            if (obj.match(/^[\d]/) || obj.includes(':') || obj.includes('#') || obj.trim() !== obj) {
                return `"${obj.replace(/"/g, '\\"')}"`;
            }
            return obj;
        }

        if (typeof obj === 'number' || typeof obj === 'boolean') {
            return String(obj);
        }

        if (Array.isArray(obj)) {
            if (obj.length === 0) {
                return '[]';
            }
            
            // Check if array contains only primitives
            const allPrimitives = obj.every(item => 
                typeof item !== 'object' || item === null
            );

            if (allPrimitives && obj.length < 5) {
                // Inline array for simple cases
                return `[${obj.map(item => this.jsonToYAML(item, 0)).join(', ')}]`;
            }

            // Multi-line array
            obj.forEach((item, index) => {
                if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
                    // Object in array
                    yaml += `\n${spaces}-`;
                    const itemYaml = this.jsonToYAML(item, indent + 1);
                    const lines = itemYaml.split('\n');
                    lines.forEach((line, i) => {
                        if (i === 0 && line.trim()) {
                            yaml += ` ${line}`;
                        } else if (line.trim()) {
                            yaml += `\n${spaces}  ${line}`;
                        }
                    });
                } else {
                    // Primitive or array in array
                    yaml += `\n${spaces}- ${this.jsonToYAML(item, indent + 1)}`;
                }
            });
            return yaml;
        }

        if (typeof obj === 'object') {
            const keys = Object.keys(obj);
            
            if (keys.length === 0) {
                return '{}';
            }

            keys.forEach((key, index) => {
                const value = obj[key];
                const safeKey = key.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/) ? key : `"${key}"`;
                
                if (value === null) {
                    yaml += `\n${spaces}${safeKey}: null`;
                } else if (typeof value === 'object' && !Array.isArray(value)) {
                    // Nested object
                    const nestedYaml = this.jsonToYAML(value, indent + 1);
                    if (nestedYaml === '{}') {
                        yaml += `\n${spaces}${safeKey}: {}`;
                    } else {
                        yaml += `\n${spaces}${safeKey}:${nestedYaml}`;
                    }
                } else if (Array.isArray(value)) {
                    // Array value
                    const arrayYaml = this.jsonToYAML(value, indent + 1);
                    if (arrayYaml.startsWith('[')) {
                        // Inline array
                        yaml += `\n${spaces}${safeKey}: ${arrayYaml}`;
                    } else {
                        // Multi-line array
                        yaml += `\n${spaces}${safeKey}:${arrayYaml}`;
                    }
                } else {
                    // Primitive value
                    yaml += `\n${spaces}${safeKey}: ${this.jsonToYAML(value, indent + 1)}`;
                }
            });
            return yaml;
        }

        return String(obj);
    }

    /**
     * Decompress JSON - formats with proper indentation
     */
    decompress() {
        const input = this.inputTextarea.value.trim();
        
        if (!input) {
            this.showNotification(this.t('nothingToDecompress'), 'error');
            return;
        }

        try {
            // Parse JSON to validate
            const parsed = JSON.parse(input);
            
            // Stringify with 2-space indentation (decompressed/pretty)
            const decompressed = JSON.stringify(parsed, null, 2);
            
            this.outputTextarea.value = decompressed;
            this.updateStats();
            this.updateLineNumbers();
            this.showNotification(this.t('decompressSuccess'), 'success');
        } catch (error) {
            this.showNotification(`${this.t('invalidJson')}: ${error.message}`, 'error');
            console.error('Decompression error:', error);
        }
    }

    /**
     * Update line numbers for both textareas
     */
    updateLineNumbers() {
        this.updateLineNumbersForTextarea(this.inputTextarea, this.inputLineNumbers);
        this.updateLineNumbersForTextarea(this.outputTextarea, this.outputLineNumbers);
    }

    /**
     * Update line numbers for a specific textarea
     */
    updateLineNumbersForTextarea(textarea, lineNumbersElement) {
        const text = textarea.value;
        const lines = text ? text.split('\n').length : 1;
        
        // Generate line numbers
        const lineNumbers = Array.from({ length: lines }, (_, i) => i + 1).join('\n');
        lineNumbersElement.textContent = lineNumbers;
        
        // Sync scroll position
        this.syncScroll(textarea, lineNumbersElement);
    }

    /**
     * Synchronize scroll position between textarea and line numbers
     */
    syncScroll(textarea, lineNumbersElement) {
        lineNumbersElement.scrollTop = textarea.scrollTop;
    }

    /**
     * Update statistics for both textareas
     */
    updateStats() {
        const inputText = this.inputTextarea.value;
        const outputText = this.outputTextarea.value;
        
        // Input stats
        const inputSize = new Blob([inputText]).size;
        const inputLines = inputText.split('\n').length;
        this.inputStats.textContent = inputText ? 
            `${this.formatBytes(inputSize)} • ${inputLines.toLocaleString()} ${this.t('lines')}` : 
            '';
        
        // Output stats
        const outputSize = new Blob([outputText]).size;
        const outputLines = outputText.split('\n').length;
        this.outputStats.textContent = outputText ? 
            `${this.formatBytes(outputSize)} • ${outputLines.toLocaleString()} ${this.t('lines')}` : 
            '';
        
        // Compression ratio
        if (inputText && outputText) {
            const ratio = ((1 - outputSize / inputSize) * 100).toFixed(1);
            const changeKey = inputSize > outputSize ? 'smaller' : 'larger';
            const color = inputSize > outputSize ? 'var(--color-success)' : 'var(--color-accent)';
            
            this.compressionRatio.textContent = `${Math.abs(ratio)}% ${this.t(changeKey)}`;
            this.compressionRatio.style.color = color;
        } else {
            this.compressionRatio.textContent = '';
        }
    }

    /**
     * Format bytes to human-readable format
     */
    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    /**
     * Copy output to clipboard
     */
    async copyToClipboard() {
        const text = this.outputTextarea.value;
        
        if (!text) {
            this.showNotification(this.t('nothingToCopy'), 'error');
            return;
        }

        try {
            await navigator.clipboard.writeText(text);
            this.showNotification(this.t('copiedToClipboard'), 'success');
        } catch (error) {
            // Fallback for older browsers
            this.outputTextarea.select();
            document.execCommand('copy');
            this.showNotification(this.t('copiedToClipboard'), 'success');
        }
    }

    /**
     * Paste from clipboard to input
     */
    async pasteFromClipboard() {
        try {
            const text = await navigator.clipboard.readText();
            this.inputTextarea.value = text;
            this.updateStats();
            this.updateLineNumbers();
            this.showNotification(this.t('pastedFromClipboard'), 'success');
        } catch (error) {
            this.showNotification(this.t('clipboardAccessError'), 'error');
        }
    }

    /**
     * Download JSON as file
     */
    downloadJSON() {
        const text = this.outputTextarea.value;
        
        if (!text) {
            this.showNotification(this.t('nothingToDownload'), 'error');
            return;
        }

        const blob = new Blob([text], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `json-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification(this.t('fileDownloaded'), 'success');
    }

    /**
     * Clear input textarea
     */
    clearInput() {
        this.inputTextarea.value = '';
        this.updateStats();
        this.updateLineNumbers();
    }

    /**
     * Clear output textarea
     */
    clearOutput() {
        this.outputTextarea.value = '';
        this.updateStats();
        this.updateLineNumbers();
    }

    /**
     * Load sample JSON for testing
     */
    loadSample() {
        const sampleJSON = {
            "name": "John Doe",
            "age": 30,
            "email": "john.doe@example.com",
            "address": {
                "street": "123 Main St",
                "city": "San Francisco",
                "state": "CA",
                "zipCode": "94102",
                "coordinates": {
                    "latitude": 37.7749,
                    "longitude": -122.4194
                }
            },
            "phoneNumbers": [
                {
                    "type": "home",
                    "number": "555-1234"
                },
                {
                    "type": "work",
                    "number": "555-5678"
                }
            ],
            "preferences": {
                "notifications": {
                    "email": true,
                    "sms": false,
                    "push": true
                },
                "privacy": {
                    "shareData": false,
                    "publicProfile": true
                }
            },
            "metadata": {
                "createdAt": "2025-01-15T10:30:00Z",
                "updatedAt": "2025-10-11T08:45:00Z",
                "version": "2.1.0"
            }
        };

        this.inputTextarea.value = JSON.stringify(sampleJSON, null, 2);
        this.updateStats();
        this.updateLineNumbers();
        this.showNotification(this.t('sampleLoaded'), 'success');
    }

    /**
     * Show notification message
     */
    showNotification(message, type = 'info') {
        this.notification.textContent = message;
        this.notification.className = `notification ${type} show`;
        
        setTimeout(() => {
            this.notification.classList.remove('show');
        }, 3000);
    }

    /**
     * Handle keyboard shortcuts
     */
    handleKeyboardShortcuts(e) {
        // Cmd/Ctrl + Enter: Compress
        if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
            e.preventDefault();
            this.compress();
        }
        
        // Cmd/Ctrl + Shift + Enter: Decompress
        if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'Enter') {
            e.preventDefault();
            this.decompress();
        }
        
        // Cmd/Ctrl + K: Clear input
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            this.clearInput();
        }
    }
}

// Initialize the application when DOM is fully ready
console.log('App.js loaded, document ready state:', document.readyState);

function initApp() {
    console.log('initApp called, ready state:', document.readyState);
    console.log('Body children count:', document.body ? document.body.children.length : 'no body');
    
    // Wait a bit longer to ensure all elements are rendered
    setTimeout(() => {
        console.log('Creating JSONCompressor instance...');
        try {
            window.jsonCompressor = new JSONCompressor();
            console.log('JSONCompressor instance created successfully');
        } catch (error) {
            console.error('Failed to create JSONCompressor:', error);
        }
    }, 250);
}

if (document.readyState === 'loading') {
    console.log('Document still loading, waiting for DOMContentLoaded...');
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    console.log('Document already loaded, initializing immediately...');
    initApp();
}

