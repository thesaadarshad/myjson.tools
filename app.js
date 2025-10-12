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
            themeIcon: 'themeIcon',
            // Compare mode elements
            jsonATextarea: 'jsonA',
            jsonBTextarea: 'jsonB',
            jsonALineNumbers: 'jsonALineNumbers',
            jsonBLineNumbers: 'jsonBLineNumbers',
            diffResult: 'diffResult'
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
        
        // Initialize mode
        this.currentMode = localStorage.getItem('json-compressor-mode') || 'transform';
        
        // Initialize diff tracking
        this.allDifferences = [];
        this.currentDiffIndex = -1;
        this.diffLineMap = { jsonA: {}, jsonB: {} };
        
        try {
            this.initializeEventListeners();
            this.setTheme(this.currentTheme);
            this.setLanguage(this.currentLanguage);
            this.switchMode(this.currentMode);
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
        
        // Mode switching buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mode = e.currentTarget.getAttribute('data-mode');
                this.switchMode(mode);
            });
        });

        // Collapsible button groups (accordion behavior)
        this.initializeAccordion();
        
        // Compression/Decompression/Beautify/Sort/TypeScript/YAML/XML/CSV/Flatten/Unflatten/Escape/Unescape buttons
        addListener('compressBtn', 'click', () => this.compress());
        addListener('beautifyBtn', 'click', () => this.beautify());
        addListener('sortBtn', 'click', () => this.sortJSON());
        addListener('typescriptBtn', 'click', () => this.convertToTypeScript());
        addListener('yamlBtn', 'click', () => this.convertToYAML());
        addListener('xmlBtn', 'click', () => this.convertToXML());
        addListener('csvBtn', 'click', () => this.convertToCSV());
        addListener('flattenBtn', 'click', () => this.flattenJSON());
        addListener('unflattenBtn', 'click', () => this.unflattenJSON());
        addListener('escapeBtn', 'click', () => this.escapeJSON());
        addListener('unescapeBtn', 'click', () => this.unescapeJSON());
        addListener('base64EncodeBtn', 'click', () => this.base64Encode());
        addListener('base64DecodeBtn', 'click', () => this.base64Decode());
        addListener('decompressBtn', 'click', () => this.decompress());

        // Input actions
        addListener('clearInput', 'click', () => this.clearInput());
        addListener('pasteBtn', 'click', () => this.pasteFromClipboard());
        addListener('loadSample', 'click', () => this.loadSample());
        
        // Output actions
        addListener('copyBtn', 'click', () => this.copyToClipboard());
        addListener('copyToInputBtn', 'click', () => this.copyOutputToInput());
        addListener('downloadBtn', 'click', () => this.downloadJSON());
        addListener('clearOutput', 'click', () => this.clearOutput());
        
        // Compare mode actions
        addListener('compareBtn', 'click', () => this.compareJSON());
        addListener('swapBtn', 'click', () => this.swapJSON());
        addListener('clearJsonA', 'click', () => this.clearJsonA());
        addListener('clearJsonB', 'click', () => this.clearJsonB());
        addListener('pasteJsonA', 'click', () => this.pasteJsonA());
        addListener('pasteJsonB', 'click', () => this.pasteJsonB());
        addListener('copyDiff', 'click', () => this.copyDiff());
        addListener('clearDiff', 'click', () => this.clearDiff());
        addListener('toggleDiffPanel', 'click', () => this.toggleDiffPanel());
        addListener('closeDiffPanel', 'click', () => this.toggleDiffPanel());
        addListener('nextDiff', 'click', () => this.navigateDiff('next'));
        addListener('prevDiff', 'click', () => this.navigateDiff('prev'));
        
        // Update stats and line numbers on input
        this.inputTextarea.addEventListener('input', () => {
            this.updateStats();
            this.updateLineNumbers();
            this.validateJSON('input');
        });
        this.outputTextarea.addEventListener('input', () => {
            this.updateStats();
            this.updateLineNumbers();
            this.validateJSON('output');
        });
        
        // Synchronize scroll between textarea and line numbers
        this.inputTextarea.addEventListener('scroll', () => this.syncScroll(this.inputTextarea, this.inputLineNumbers));
        this.outputTextarea.addEventListener('scroll', () => this.syncScroll(this.outputTextarea, this.outputLineNumbers));
        
        // Compare mode text areas
        if (this.jsonATextarea) {
            this.jsonATextarea.addEventListener('input', () => this.updateCompareLineNumbers());
            this.jsonATextarea.addEventListener('scroll', () => this.syncScroll(this.jsonATextarea, this.jsonALineNumbers));
        }
        if (this.jsonBTextarea) {
            this.jsonBTextarea.addEventListener('input', () => this.updateCompareLineNumbers());
            this.jsonBTextarea.addEventListener('scroll', () => this.syncScroll(this.jsonBTextarea, this.jsonBLineNumbers));
        }
        
        // Language selector and theme toggle
        if (this.languageSelect) {
            this.languageSelect.addEventListener('change', (e) => this.changeLanguage(e.target.value));
            console.log('Language selector listener added');
        }
        
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
            console.log('Theme toggle listener added');
        }
        
        // Data Summary toggles
        addListener('inputSummaryToggle', 'click', () => this.toggleSummary('input'));
        addListener('outputSummaryToggle', 'click', () => this.toggleSummary('output'));
        
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
     * Convert JSON to XML format
     */
    convertToXML() {
        const input = this.inputTextarea.value.trim();
        
        if (!input) {
            this.showNotification(this.t('nothingToXml'), 'error');
            return;
        }

        try {
            // Parse JSON to validate
            const parsed = JSON.parse(input);
            
            // Convert to XML
            const xml = this.jsonToXML(parsed);
            
            this.outputTextarea.value = xml;
            this.updateStats();
            this.updateLineNumbers();
            this.showNotification(this.t('xmlSuccess'), 'success');
        } catch (error) {
            this.showNotification(`${this.t('invalidJson')}: ${error.message}`, 'error');
            console.error('XML conversion error:', error);
        }
    }

    /**
     * Convert JSON object to XML format
     */
    jsonToXML(obj, rootName = 'root', indent = 0) {
        const spaces = '  '.repeat(indent);
        let xml = '';

        // Handle null
        if (obj === null) {
            return `${spaces}<${rootName}></${rootName}>`;
        }

        // Handle primitives (string, number, boolean)
        if (typeof obj !== 'object') {
            const escapedValue = this.escapeXML(String(obj));
            return `${spaces}<${rootName}>${escapedValue}</${rootName}>`;
        }

        // Handle arrays
        if (Array.isArray(obj)) {
            obj.forEach((item, index) => {
                const itemName = this.singularize(rootName) || 'item';
                xml += this.jsonToXML(item, itemName, indent) + '\n';
            });
            return xml.trimEnd();
        }

        // Handle objects
        xml += `${spaces}<${rootName}>\n`;
        
        for (const [key, value] of Object.entries(obj)) {
            const safeKey = this.sanitizeXMLTagName(key);
            
            if (value === null) {
                xml += `${spaces}  <${safeKey}></${safeKey}>\n`;
            } else if (Array.isArray(value)) {
                if (value.length === 0) {
                    xml += `${spaces}  <${safeKey}></${safeKey}>\n`;
                } else {
                    xml += `${spaces}  <${safeKey}>\n`;
                    value.forEach((item) => {
                        const itemName = this.singularize(safeKey) || 'item';
                        xml += this.jsonToXML(item, itemName, indent + 2) + '\n';
                    });
                    xml += `${spaces}  </${safeKey}>\n`;
                }
            } else if (typeof value === 'object') {
                xml += this.jsonToXML(value, safeKey, indent + 1) + '\n';
            } else {
                const escapedValue = this.escapeXML(String(value));
                xml += `${spaces}  <${safeKey}>${escapedValue}</${safeKey}>\n`;
            }
        }
        
        xml += `${spaces}</${rootName}>`;
        return xml;
    }

    /**
     * Escape special XML characters
     */
    escapeXML(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }

    /**
     * Sanitize string to be a valid XML tag name
     */
    sanitizeXMLTagName(str) {
        // Replace invalid characters with underscores
        // XML tag names must start with letter or underscore
        let sanitized = str.replace(/[^a-zA-Z0-9_-]/g, '_');
        
        // Ensure it starts with a letter or underscore
        if (!/^[a-zA-Z_]/.test(sanitized)) {
            sanitized = '_' + sanitized;
        }
        
        return sanitized;
    }

    /**
     * Convert JSON to CSV format
     */
    convertToCSV() {
        const input = this.inputTextarea.value.trim();
        
        if (!input) {
            this.showNotification(this.t('nothingToCsv'), 'error');
            return;
        }

        try {
            // Parse JSON to validate
            const parsed = JSON.parse(input);
            
            // Convert to CSV
            const csv = this.jsonToCSV(parsed);
            
            this.outputTextarea.value = csv;
            this.updateStats();
            this.updateLineNumbers();
            this.showNotification(this.t('csvSuccess'), 'success');
        } catch (error) {
            this.showNotification(`${this.t('invalidJson')}: ${error.message}`, 'error');
            console.error('CSV conversion error:', error);
        }
    }

    /**
     * Convert JSON to CSV format
     */
    jsonToCSV(data) {
        // Handle array of objects (most common case for CSV)
        if (Array.isArray(data)) {
            if (data.length === 0) {
                return '';
            }

            // Get all unique keys from all objects
            const allKeys = new Set();
            data.forEach(item => {
                if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
                    Object.keys(item).forEach(key => allKeys.add(key));
                }
            });

            if (allKeys.size === 0) {
                // Array of primitives
                return 'value\n' + data.map(item => this.escapeCSV(this.formatCSVValue(item))).join('\n');
            }

            // Array of objects - create table
            const keys = Array.from(allKeys);
            const header = keys.map(key => this.escapeCSV(key)).join(',');
            
            const rows = data.map(item => {
                return keys.map(key => {
                    const value = item && typeof item === 'object' ? item[key] : undefined;
                    return this.escapeCSV(this.formatCSVValue(value));
                }).join(',');
            });

            return header + '\n' + rows.join('\n');
        }

        // Handle single object - create two-column CSV (key, value)
        if (typeof data === 'object' && data !== null) {
            const header = 'key,value';
            const rows = Object.entries(data).map(([key, value]) => {
                return this.escapeCSV(key) + ',' + this.escapeCSV(this.formatCSVValue(value));
            });
            return header + '\n' + rows.join('\n');
        }

        // Handle primitive value
        return 'value\n' + this.escapeCSV(this.formatCSVValue(data));
    }

    /**
     * Format a value for CSV output
     */
    formatCSVValue(value) {
        if (value === null || value === undefined) {
            return '';
        }
        if (typeof value === 'object') {
            // For nested objects/arrays, stringify them
            return JSON.stringify(value);
        }
        return String(value);
    }

    /**
     * Escape a value for CSV format
     */
    escapeCSV(value) {
        const str = String(value);
        
        // If the value contains comma, newline, or double quote, wrap in quotes
        if (str.includes(',') || str.includes('\n') || str.includes('"') || str.includes('\r')) {
            // Escape double quotes by doubling them
            return '"' + str.replace(/"/g, '""') + '"';
        }
        
        return str;
    }

    /**
     * Flatten JSON to dot notation
     */
    flattenJSON() {
        const input = this.inputTextarea.value.trim();
        
        if (!input) {
            this.showNotification(this.t('nothingToFlatten'), 'error');
            return;
        }

        try {
            // Parse JSON to validate
            const parsed = JSON.parse(input);
            
            // Flatten the JSON
            const flattened = this.flatten(parsed);
            
            this.outputTextarea.value = JSON.stringify(flattened, null, 2);
            this.updateStats();
            this.updateLineNumbers();
            this.showNotification(this.t('flattenSuccess'), 'success');
        } catch (error) {
            this.showNotification(`${this.t('invalidJson')}: ${error.message}`, 'error');
            console.error('Flatten error:', error);
        }
    }

    /**
     * Flatten an object to dot notation
     */
    flatten(obj, prefix = '', separator = '.') {
        const flattened = {};

        const flattenHelper = (current, path) => {
            if (current === null || current === undefined) {
                flattened[path] = current;
                return;
            }

            if (Array.isArray(current)) {
                if (current.length === 0) {
                    flattened[path] = [];
                } else {
                    current.forEach((item, index) => {
                        flattenHelper(item, path ? `${path}${separator}${index}` : `${index}`);
                    });
                }
            } else if (typeof current === 'object') {
                const keys = Object.keys(current);
                if (keys.length === 0) {
                    flattened[path] = {};
                } else {
                    keys.forEach(key => {
                        flattenHelper(current[key], path ? `${path}${separator}${key}` : key);
                    });
                }
            } else {
                flattened[path] = current;
            }
        };

        flattenHelper(obj, prefix);
        return flattened;
    }

    /**
     * Unflatten JSON from dot notation
     */
    unflattenJSON() {
        const input = this.inputTextarea.value.trim();
        
        if (!input) {
            this.showNotification(this.t('nothingToUnflatten'), 'error');
            return;
        }

        try {
            // Parse JSON to validate
            const parsed = JSON.parse(input);
            
            // Unflatten the JSON
            const unflattened = this.unflatten(parsed);
            
            this.outputTextarea.value = JSON.stringify(unflattened, null, 2);
            this.updateStats();
            this.updateLineNumbers();
            this.showNotification(this.t('unflattenSuccess'), 'success');
        } catch (error) {
            this.showNotification(`${this.t('invalidJson')}: ${error.message}`, 'error');
            console.error('Unflatten error:', error);
        }
    }

    /**
     * Unflatten an object from dot notation
     */
    unflatten(obj, separator = '.') {
        const result = {};

        for (const [path, value] of Object.entries(obj)) {
            const keys = path.split(separator);
            let current = result;

            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const isLast = i === keys.length - 1;

                if (isLast) {
                    current[key] = value;
                } else {
                    // Determine if next level should be array or object
                    const nextKey = keys[i + 1];
                    const isArrayIndex = /^\d+$/.test(nextKey);

                    if (current[key] === undefined) {
                        current[key] = isArrayIndex ? [] : {};
                    }

                    current = current[key];
                }
            }
        }

        return result;
    }

    /**
     * Escape JSON string
     */
    escapeJSON() {
        const input = this.inputTextarea.value.trim();
        
        if (!input) {
            this.showNotification(this.t('nothingToEscape'), 'error');
            return;
        }

        try {
            // Simply escape the string to be JSON-safe
            const escaped = JSON.stringify(input);
            
            // Remove the surrounding quotes that JSON.stringify adds
            const result = escaped.slice(1, -1);
            
            this.outputTextarea.value = result;
            this.updateStats();
            this.updateLineNumbers();
            this.showNotification(this.t('escapeSuccess'), 'success');
        } catch (error) {
            this.showNotification(`${this.t('escapeError')}: ${error.message}`, 'error');
            console.error('Escape error:', error);
        }
    }

    /**
     * Unescape JSON string
     */
    unescapeJSON() {
        const input = this.inputTextarea.value.trim();
        
        if (!input) {
            this.showNotification(this.t('nothingToUnescape'), 'error');
            return;
        }

        try {
            // Wrap in quotes and parse to unescape
            const unescaped = JSON.parse('"' + input + '"');
            
            this.outputTextarea.value = unescaped;
            this.updateStats();
            this.updateLineNumbers();
            this.showNotification(this.t('unescapeSuccess'), 'success');
        } catch (error) {
            this.showNotification(`${this.t('unescapeError')}: ${error.message}`, 'error');
            console.error('Unescape error:', error);
        }
    }

    /**
     * Encode text to Base64
     */
    base64Encode() {
        const input = this.inputTextarea.value;
        
        if (!input) {
            this.showNotification(this.t('nothingToBase64Encode'), 'error');
            return;
        }

        try {
            // Encode to Base64
            const encoded = btoa(unescape(encodeURIComponent(input)));
            
            this.outputTextarea.value = encoded;
            this.updateStats();
            this.updateLineNumbers();
            this.showNotification(this.t('base64EncodeSuccess'), 'success');
        } catch (error) {
            this.showNotification(`Encode error: ${error.message}`, 'error');
            console.error('Base64 encode error:', error);
        }
    }

    /**
     * Decode Base64 to text
     */
    base64Decode() {
        const input = this.inputTextarea.value.trim();
        
        if (!input) {
            this.showNotification(this.t('nothingToBase64Decode'), 'error');
            return;
        }

        try {
            // Decode from Base64
            const decoded = decodeURIComponent(escape(atob(input)));
            
            this.outputTextarea.value = decoded;
            this.updateStats();
            this.updateLineNumbers();
            this.showNotification(this.t('base64DecodeSuccess'), 'success');
        } catch (error) {
            this.showNotification(this.t('invalidBase64'), 'error');
            console.error('Base64 decode error:', error);
        }
    }

    /**
     * Convert JSON to TypeScript interfaces
     */
    convertToTypeScript() {
        const input = this.inputTextarea.value.trim();
        
        if (!input) {
            this.showNotification(this.t('nothingToTypescript'), 'error');
            return;
        }

        try {
            // Parse JSON to validate
            const parsed = JSON.parse(input);
            
            // Generate TypeScript interfaces
            const interfaces = this.generateTypeScriptInterfaces(parsed);
            
            this.outputTextarea.value = interfaces;
            this.updateStats();
            this.updateLineNumbers();
            this.showNotification(this.t('typescriptSuccess'), 'success');
        } catch (error) {
            this.showNotification(`${this.t('invalidJson')}: ${error.message}`, 'error');
            console.error('TypeScript conversion error:', error);
        }
    }

    /**
     * Generate TypeScript interfaces from JSON object
     */
    generateTypeScriptInterfaces(obj, interfaceName = 'Root') {
        const interfaces = new Map();
        const seenTypes = new Set();
        
        // Analyze the object and collect all interface definitions
        this.analyzeAndCollectInterfaces(obj, interfaceName, interfaces, seenTypes);
        
        // Convert collected interfaces to TypeScript code
        let typescript = '';
        for (const [name, properties] of interfaces) {
            typescript += `interface ${name} {\n`;
            for (const [propName, propType] of Object.entries(properties)) {
                typescript += `  ${propName}: ${propType};\n`;
            }
            typescript += `}\n\n`;
        }
        
        return typescript.trim();
    }

    /**
     * Analyze JSON and collect interface definitions
     */
    analyzeAndCollectInterfaces(obj, interfaceName, interfaces, seenTypes) {
        if (obj === null || typeof obj !== 'object') {
            return this.getTypeName(obj);
        }

        if (Array.isArray(obj)) {
            if (obj.length === 0) {
                return 'any[]';
            }
            
            // Analyze array elements
            const elementTypes = new Set();
            obj.forEach(item => {
                const itemType = this.analyzeAndCollectInterfaces(item, interfaceName + 'Item', interfaces, seenTypes);
                elementTypes.add(itemType);
            });
            
            // Create union type if multiple types exist
            if (elementTypes.size === 1) {
                return `${Array.from(elementTypes)[0]}[]`;
            } else {
                return `(${Array.from(elementTypes).join(' | ')})[]`;
            }
        }

        // It's an object - create an interface for it
        if (!interfaces.has(interfaceName)) {
            const properties = {};
            
            for (const [key, value] of Object.entries(obj)) {
                if (value === null) {
                    properties[key] = 'null';
                } else if (Array.isArray(value)) {
                    if (value.length === 0) {
                        properties[key] = 'any[]';
                    } else {
                        // Check if array contains objects
                        const firstNonNull = value.find(item => item !== null);
                        if (firstNonNull && typeof firstNonNull === 'object' && !Array.isArray(firstNonNull)) {
                            // Array of objects - create interface for the object
                            const childInterfaceName = this.capitalize(this.singularize(key));
                            const arrayType = this.analyzeAndCollectInterfaces(firstNonNull, childInterfaceName, interfaces, seenTypes);
                            properties[key] = `${childInterfaceName}[]`;
                        } else {
                            // Array of primitives or mixed
                            const types = new Set();
                            value.forEach(item => {
                                types.add(this.getTypeName(item));
                            });
                            if (types.size === 1) {
                                properties[key] = `${Array.from(types)[0]}[]`;
                            } else {
                                properties[key] = `(${Array.from(types).join(' | ')})[]`;
                            }
                        }
                    }
                } else if (typeof value === 'object') {
                    // Nested object - create interface for it
                    const childInterfaceName = this.capitalize(key);
                    this.analyzeAndCollectInterfaces(value, childInterfaceName, interfaces, seenTypes);
                    properties[key] = childInterfaceName;
                } else {
                    // Primitive type
                    properties[key] = this.getTypeName(value);
                }
            }
            
            interfaces.set(interfaceName, properties);
        }
        
        return interfaceName;
    }

    /**
     * Get TypeScript type name for a JavaScript value
     */
    getTypeName(value) {
        if (value === null) return 'null';
        if (value === undefined) return 'undefined';
        if (Array.isArray(value)) return 'any[]';
        
        const type = typeof value;
        if (type === 'object') return 'object';
        if (type === 'string') return 'string';
        if (type === 'number') return 'number';
        if (type === 'boolean') return 'boolean';
        
        return 'any';
    }

    /**
     * Capitalize first letter of a string
     */
    capitalize(str) {
        if (!str) return 'Item';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * Convert plural to singular (simple heuristic)
     */
    singularize(str) {
        if (!str) return str;
        
        // Simple pluralization rules
        if (str.endsWith('ies')) {
            return str.slice(0, -3) + 'y';
        }
        if (str.endsWith('es')) {
            return str.slice(0, -2);
        }
        if (str.endsWith('s')) {
            return str.slice(0, -1);
        }
        return str;
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
     * Toggle data type summary panel
     */
    toggleSummary(type) {
        const summaryPanel = document.getElementById(`${type}Summary`);
        const toggleButton = document.getElementById(`${type}SummaryToggle`);
        
        if (summaryPanel && toggleButton) {
            const isCollapsed = summaryPanel.classList.contains('collapsed');
            
            if (isCollapsed) {
                summaryPanel.classList.remove('collapsed');
                toggleButton.classList.add('expanded');
                // Update summary when expanding
                this.updateDataSummary(type);
            } else {
                summaryPanel.classList.add('collapsed');
                toggleButton.classList.remove('expanded');
            }
        }
    }

    /**
     * Update data type summary for input or output
     */
    updateDataSummary(type) {
        const textarea = type === 'input' ? this.inputTextarea : this.outputTextarea;
        const text = textarea.value;
        
        if (!text) {
            // Reset to zeros if empty
            this.resetDataSummary(type);
            return;
        }
        
        try {
            const data = JSON.parse(text);
            const analysis = this.analyzeJSON(data);
            
            // Update counts
            document.getElementById(`${type}StringCount`).textContent = analysis.strings;
            document.getElementById(`${type}NumberCount`).textContent = analysis.numbers;
            document.getElementById(`${type}BooleanCount`).textContent = analysis.booleans;
            document.getElementById(`${type}ObjectCount`).textContent = analysis.objects;
            document.getElementById(`${type}ArrayCount`).textContent = analysis.arrays;
            document.getElementById(`${type}NullCount`).textContent = analysis.nulls;
            document.getElementById(`${type}MaxDepth`).textContent = analysis.maxDepth;
            document.getElementById(`${type}TotalKeys`).textContent = analysis.totalKeys;
        } catch (error) {
            // If JSON is invalid, reset to zeros
            this.resetDataSummary(type);
        }
    }

    /**
     * Reset data summary to zeros
     */
    resetDataSummary(type) {
        document.getElementById(`${type}StringCount`).textContent = '0';
        document.getElementById(`${type}NumberCount`).textContent = '0';
        document.getElementById(`${type}BooleanCount`).textContent = '0';
        document.getElementById(`${type}ObjectCount`).textContent = '0';
        document.getElementById(`${type}ArrayCount`).textContent = '0';
        document.getElementById(`${type}NullCount`).textContent = '0';
        document.getElementById(`${type}MaxDepth`).textContent = '0';
        document.getElementById(`${type}TotalKeys`).textContent = '0';
    }

    /**
     * Recursively analyze JSON structure
     */
    analyzeJSON(data, depth = 0) {
        const analysis = {
            strings: 0,
            numbers: 0,
            booleans: 0,
            objects: 0,
            arrays: 0,
            nulls: 0,
            maxDepth: depth,
            totalKeys: 0
        };
        
        if (data === null) {
            analysis.nulls = 1;
            return analysis;
        }
        
        const type = typeof data;
        
        if (type === 'string') {
            analysis.strings = 1;
        } else if (type === 'number') {
            analysis.numbers = 1;
        } else if (type === 'boolean') {
            analysis.booleans = 1;
        } else if (Array.isArray(data)) {
            analysis.arrays = 1;
            analysis.maxDepth = depth + 1;
            
            // Analyze each element
            data.forEach(item => {
                const itemAnalysis = this.analyzeJSON(item, depth + 1);
                analysis.strings += itemAnalysis.strings;
                analysis.numbers += itemAnalysis.numbers;
                analysis.booleans += itemAnalysis.booleans;
                analysis.objects += itemAnalysis.objects;
                analysis.arrays += itemAnalysis.arrays;
                analysis.nulls += itemAnalysis.nulls;
                analysis.totalKeys += itemAnalysis.totalKeys;
                analysis.maxDepth = Math.max(analysis.maxDepth, itemAnalysis.maxDepth);
            });
        } else if (type === 'object') {
            analysis.objects = 1;
            analysis.maxDepth = depth + 1;
            
            const keys = Object.keys(data);
            analysis.totalKeys = keys.length;
            
            // Analyze each value
            keys.forEach(key => {
                const valueAnalysis = this.analyzeJSON(data[key], depth + 1);
                analysis.strings += valueAnalysis.strings;
                analysis.numbers += valueAnalysis.numbers;
                analysis.booleans += valueAnalysis.booleans;
                analysis.objects += valueAnalysis.objects;
                analysis.arrays += valueAnalysis.arrays;
                analysis.nulls += valueAnalysis.nulls;
                analysis.totalKeys += valueAnalysis.totalKeys;
                analysis.maxDepth = Math.max(analysis.maxDepth, valueAnalysis.maxDepth);
            });
        }
        
        return analysis;
    }

    /**
     * Validate JSON and display errors
     */
    validateJSON(type) {
        const textarea = type === 'input' ? this.inputTextarea : this.outputTextarea;
        const text = textarea.value.trim();
        const errorPanel = document.getElementById(`${type}ValidationError`);
        
        // Hide error panel if text is empty
        if (!text) {
            errorPanel.classList.add('hidden');
            return;
        }
        
        try {
            JSON.parse(text);
            // Valid JSON - hide error panel
            errorPanel.classList.add('hidden');
        } catch (error) {
            // Invalid JSON - show error panel with details
            this.showValidationError(type, error, text);
        }
    }

    /**
     * Show validation error with details
     */
    showValidationError(type, error, text) {
        const errorPanel = document.getElementById(`${type}ValidationError`);
        const errorMessage = document.getElementById(`${type}ErrorMessage`);
        const errorLocation = document.getElementById(`${type}ErrorLocation`);
        const errorSuggestion = document.getElementById(`${type}ErrorSuggestion`);
        
        // Parse error message to extract line and column
        const errorInfo = this.parseJSONError(error.message);
        
        // Set error message
        errorMessage.textContent = errorInfo.message;
        
        // Set error location
        if (errorInfo.line && errorInfo.column) {
            errorLocation.innerHTML = `${this.t('errorAt')} <strong>${this.t('line')} ${errorInfo.line}, ${this.t('column')} ${errorInfo.column}</strong>`;
        } else {
            errorLocation.textContent = '';
        }
        
        // Set helpful suggestion
        errorSuggestion.textContent = this.getSuggestion(errorInfo, text);
        
        // Show error panel
        errorPanel.classList.remove('hidden');
    }

    /**
     * Parse JSON error message to extract line and column
     */
    parseJSONError(errorMessage) {
        const result = {
            message: errorMessage,
            line: null,
            column: null,
            type: 'unknown'
        };
        
        // Try to extract line and column from error message
        // Format: "Unexpected token } in JSON at position 123"
        // Or: "JSON.parse: unexpected character at line 5 column 10"
        
        const positionMatch = errorMessage.match(/at position (\d+)/);
        const lineColMatch = errorMessage.match(/line (\d+) column (\d+)/);
        
        if (lineColMatch) {
            result.line = parseInt(lineColMatch[1]);
            result.column = parseInt(lineColMatch[2]);
        } else if (positionMatch) {
            // Calculate line and column from position
            const position = parseInt(positionMatch[1]);
            const lines = errorMessage.split('\n');
            let currentPos = 0;
            for (let i = 0; i < lines.length; i++) {
                if (currentPos + lines[i].length >= position) {
                    result.line = i + 1;
                    result.column = position - currentPos + 1;
                    break;
                }
                currentPos += lines[i].length + 1; // +1 for newline
            }
        }
        
        // Identify error type
        if (errorMessage.includes('Unexpected token')) {
            const tokenMatch = errorMessage.match(/Unexpected token (.)/);
            if (tokenMatch) {
                result.type = 'unexpected_token';
                result.token = tokenMatch[1];
            }
        } else if (errorMessage.includes('Unexpected end')) {
            result.type = 'unexpected_end';
        } else if (errorMessage.includes('Expected')) {
            result.type = 'expected';
        }
        
        // Simplify message
        if (errorMessage.includes('Unexpected token')) {
            result.message = `Unexpected character found in JSON`;
        } else if (errorMessage.includes('Unexpected end')) {
            result.message = `Unexpected end of JSON input`;
        } else {
            result.message = errorMessage.replace('JSON.parse: ', '').replace('SyntaxError: ', '');
        }
        
        return result;
    }

    /**
     * Get helpful suggestion based on error type
     */
    getSuggestion(errorInfo, text) {
        switch (errorInfo.type) {
            case 'unexpected_token':
                if (errorInfo.token === '}') {
                    return 'You might have an extra closing brace or missing a comma between properties.';
                } else if (errorInfo.token === ']') {
                    return 'You might have an extra closing bracket or missing a comma between array elements.';
                } else if (errorInfo.token === ',') {
                    return 'You might have a trailing comma before a closing bracket/brace.';
                } else if (errorInfo.token === ':') {
                    return 'Property names must be enclosed in double quotes.';
                }
                return 'Check for missing commas, quotes, or extra characters.';
                
            case 'unexpected_end':
                if (text.includes('{') && !text.includes('}')) {
                    return 'Missing closing brace } at the end.';
                } else if (text.includes('[') && !text.includes(']')) {
                    return 'Missing closing bracket ] at the end.';
                } else if (text.includes('"') && (text.match(/"/g) || []).length % 2 !== 0) {
                    return 'Unclosed string - missing closing quote.';
                }
                return 'Your JSON appears to be incomplete. Check for missing closing brackets or braces.';
                
            case 'expected':
                return 'Check your JSON syntax - you might be missing quotes around property names or values.';
                
            default:
                return 'Common issues: missing commas, unquoted property names, trailing commas, or single quotes instead of double quotes.';
        }
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
     * Copy output to input for further processing
     */
    copyOutputToInput() {
        const outputText = this.outputTextarea.value;
        
        if (!outputText) {
            this.showNotification(this.t('nothingToCopyToInput'), 'error');
            return;
        }

        // Copy output to input
        this.inputTextarea.value = outputText;
        
        // Update line numbers and stats
        this.updateLineNumbers();
        this.updateStats();
        
        // Show success notification
        this.showNotification(this.t('copiedToInput'), 'success');
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
     * Switch between Transform and Compare modes
     */
    switchMode(mode) {
        this.currentMode = mode;
        localStorage.setItem('json-compressor-mode', mode);
        
        // Update mode button states
        document.querySelectorAll('.mode-btn').forEach(btn => {
            if (btn.getAttribute('data-mode') === mode) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Show/hide mode content
        const transformMode = document.getElementById('transformMode');
        const compareMode = document.getElementById('compareMode');
        
        if (mode === 'transform') {
            if (transformMode) transformMode.classList.add('active');
            if (compareMode) compareMode.classList.remove('active');
        } else if (mode === 'compare') {
            if (transformMode) transformMode.classList.remove('active');
            if (compareMode) compareMode.classList.add('active');
            // Update line numbers for compare mode
            this.updateCompareLineNumbers();
        }
    }

    /**
     * Initialize accordion behavior for button groups
     * Only one group can be expanded at a time
     */
    initializeAccordion() {
        const groups = document.querySelectorAll('.button-group');
        
        groups.forEach(group => {
            const label = group.querySelector('.group-label');
            
            if (label) {
                label.addEventListener('click', () => {
                    const isCollapsed = group.classList.contains('collapsed');
                    
                    if (isCollapsed) {
                        // Collapse all other groups
                        groups.forEach(g => {
                            if (g !== group) {
                                g.classList.add('collapsed');
                            }
                        });
                        
                        // Expand this group
                        group.classList.remove('collapsed');
                        
                        // Save expanded group to localStorage
                        const groupName = group.getAttribute('data-group');
                        if (groupName) {
                            localStorage.setItem('json-playground-expanded-group', groupName);
                        }
                    } else {
                        // Collapse this group
                        group.classList.add('collapsed');
                        localStorage.removeItem('json-playground-expanded-group');
                    }
                });
            }
        });
        
        // Restore previously expanded group
        const expandedGroup = localStorage.getItem('json-playground-expanded-group');
        if (expandedGroup) {
            const group = document.querySelector(`.button-group[data-group="${expandedGroup}"]`);
            if (group) {
                group.classList.remove('collapsed');
            }
        }
    }

    /**
     * Update line numbers for compare mode textareas
     */
    updateCompareLineNumbers() {
        if (this.jsonATextarea && this.jsonALineNumbers) {
            const lines = this.jsonATextarea.value.split('\n').length;
            this.jsonALineNumbers.innerHTML = Array.from({length: lines}, (_, i) => `<div>${i + 1}</div>`).join('');
        }
        if (this.jsonBTextarea && this.jsonBLineNumbers) {
            const lines = this.jsonBTextarea.value.split('\n').length;
            this.jsonBLineNumbers.innerHTML = Array.from({length: lines}, (_, i) => `<div>${i + 1}</div>`).join('');
        }
    }

    /**
     * Compare two JSON objects and display differences
     */
    compareJSON() {
        try {
            const jsonAText = this.jsonATextarea.value.trim();
            const jsonBText = this.jsonBTextarea.value.trim();
            
            if (!jsonAText || !jsonBText) {
                this.showNotification('Please enter JSON in both fields', 'error');
                return;
            }
            
            // Parse and format both JSONs
            const jsonA = JSON.parse(jsonAText);
            const jsonB = JSON.parse(jsonBText);
            
            const formattedA = JSON.stringify(jsonA, null, 2);
            const formattedB = JSON.stringify(jsonB, null, 2);
            
            // Update textareas with formatted JSON
            this.jsonATextarea.value = formattedA;
            this.jsonBTextarea.value = formattedB;
            
            // Find differences
            this.allDifferences = this.findDifferences(jsonA, jsonB);
            this.currentDiffIndex = -1;
            
            // Build line map for highlighting
            this.buildLineMap(jsonA, jsonB, formattedA, formattedB);
            
            // Update UI
            this.updateCompareLineNumbers();
            this.highlightDiffLines();
            this.updateDiffSummary();
            this.displayDiff(this.allDifferences);
            
            // Show diff summary
            const diffSummary = document.getElementById('diffSummary');
            if (diffSummary) {
                diffSummary.classList.remove('hidden');
            }
            
            this.showNotification('Comparison complete!', 'success');
        } catch (error) {
            this.showNotification(`Error: ${error.message}`, 'error');
        }
    }

    /**
     * Find differences between two JSON objects
     */
    findDifferences(objA, objB, path = '') {
        const diffs = [];
        
        // Get all unique keys from both objects
        const allKeys = new Set([
            ...Object.keys(objA || {}),
            ...Object.keys(objB || {})
        ]);
        
        for (const key of allKeys) {
            const currentPath = path ? `${path}.${key}` : key;
            const valueA = objA ? objA[key] : undefined;
            const valueB = objB ? objB[key] : undefined;
            
            const typeA = this.getType(valueA);
            const typeB = this.getType(valueB);
            
            if (valueA === undefined) {
                diffs.push({
                    type: 'added',
                    path: currentPath,
                    value: valueB
                });
            } else if (valueB === undefined) {
                diffs.push({
                    type: 'removed',
                    path: currentPath,
                    value: valueA
                });
            } else if (typeA === 'object' && typeB === 'object') {
                // Recursively compare objects
                diffs.push(...this.findDifferences(valueA, valueB, currentPath));
            } else if (typeA === 'array' && typeB === 'array') {
                // Compare arrays
                const arrayDiffs = this.compareArrays(valueA, valueB, currentPath);
                diffs.push(...arrayDiffs);
            } else if (JSON.stringify(valueA) !== JSON.stringify(valueB)) {
                diffs.push({
                    type: 'modified',
                    path: currentPath,
                    oldValue: valueA,
                    newValue: valueB
                });
            }
        }
        
        return diffs;
    }

    /**
     * Compare two arrays and find differences
     */
    compareArrays(arrA, arrB, path) {
        const diffs = [];
        const maxLength = Math.max(arrA.length, arrB.length);
        
        for (let i = 0; i < maxLength; i++) {
            const currentPath = `${path}[${i}]`;
            const valueA = arrA[i];
            const valueB = arrB[i];
            
            if (i >= arrA.length) {
                diffs.push({
                    type: 'added',
                    path: currentPath,
                    value: valueB
                });
            } else if (i >= arrB.length) {
                diffs.push({
                    type: 'removed',
                    path: currentPath,
                    value: valueA
                });
            } else if (this.getType(valueA) === 'object' && this.getType(valueB) === 'object') {
                diffs.push(...this.findDifferences(valueA, valueB, currentPath));
            } else if (this.getType(valueA) === 'array' && this.getType(valueB) === 'array') {
                diffs.push(...this.compareArrays(valueA, valueB, currentPath));
            } else if (JSON.stringify(valueA) !== JSON.stringify(valueB)) {
                diffs.push({
                    type: 'modified',
                    path: currentPath,
                    oldValue: valueA,
                    newValue: valueB
                });
            }
        }
        
        return diffs;
    }

    /**
     * Get the type of a value
     */
    getType(value) {
        if (value === null) return 'null';
        if (Array.isArray(value)) return 'array';
        return typeof value;
    }

    /**
     * Display differences in the diff result area
     */
    displayDiff(differences) {
        if (differences.length === 0) {
            this.diffResult.innerHTML = `
                <div class="diff-line diff-unchanged">
                    ✓ No differences found - JSON objects are identical
                </div>
            `;
            return;
        }
        
        let html = `<div class="diff-path">Found ${differences.length} difference(s):</div>`;
        
        differences.forEach(diff => {
            switch (diff.type) {
                case 'added':
                    html += `
                        <div class="diff-line diff-added">
                            + ${diff.path}: ${JSON.stringify(diff.value)}
                        </div>
                    `;
                    break;
                case 'removed':
                    html += `
                        <div class="diff-line diff-removed">
                            - ${diff.path}: ${JSON.stringify(diff.value)}
                        </div>
                    `;
                    break;
                case 'modified':
                    html += `
                        <div class="diff-line diff-modified">
                            ≠ ${diff.path}:
                        </div>
                        <div class="diff-line diff-removed" style="padding-left: 24px;">
                            - ${JSON.stringify(diff.oldValue)}
                        </div>
                        <div class="diff-line diff-added" style="padding-left: 24px;">
                            + ${JSON.stringify(diff.newValue)}
                        </div>
                    `;
                    break;
            }
        });
        
        this.diffResult.innerHTML = html;
    }

    /**
     * Swap JSON A and JSON B
     */
    swapJSON() {
        const temp = this.jsonATextarea.value;
        this.jsonATextarea.value = this.jsonBTextarea.value;
        this.jsonBTextarea.value = temp;
        this.updateCompareLineNumbers();
        this.showNotification('Swapped JSON A and JSON B', 'success');
    }

    /**
     * Clear JSON A
     */
    clearJsonA() {
        this.jsonATextarea.value = '';
        this.updateCompareLineNumbers();
        this.showNotification('Cleared JSON A', 'success');
    }

    /**
     * Clear JSON B
     */
    clearJsonB() {
        this.jsonBTextarea.value = '';
        this.updateCompareLineNumbers();
        this.showNotification('Cleared JSON B', 'success');
    }

    /**
     * Paste from clipboard to JSON A
     */
    async pasteJsonA() {
        try {
            const text = await navigator.clipboard.readText();
            this.jsonATextarea.value = text;
            this.updateCompareLineNumbers();
            this.showNotification('Pasted to JSON A', 'success');
        } catch (error) {
            this.showNotification('Failed to paste from clipboard', 'error');
        }
    }

    /**
     * Paste from clipboard to JSON B
     */
    async pasteJsonB() {
        try {
            const text = await navigator.clipboard.readText();
            this.jsonBTextarea.value = text;
            this.updateCompareLineNumbers();
            this.showNotification('Pasted to JSON B', 'success');
        } catch (error) {
            this.showNotification('Failed to paste from clipboard', 'error');
        }
    }

    /**
     * Copy diff result to clipboard
     */
    async copyDiff() {
        try {
            const text = this.diffResult.innerText;
            await navigator.clipboard.writeText(text);
            this.showNotification('Diff copied to clipboard!', 'success');
        } catch (error) {
            this.showNotification('Failed to copy diff', 'error');
        }
    }

    /**
     * Clear diff result
     */
    clearDiff() {
        this.diffResult.innerHTML = `
            <div class="diff-placeholder" data-i18n="diffPlaceholder">
                Click "Compare" button to see differences between JSON A and JSON B
            </div>
        `;
        this.allDifferences = [];
        this.currentDiffIndex = -1;
        this.diffLineMap = { jsonA: {}, jsonB: {} };
        
        // Hide diff summary
        const diffSummary = document.getElementById('diffSummary');
        if (diffSummary) {
            diffSummary.classList.add('hidden');
        }
        
        // Clear line highlighting
        this.updateCompareLineNumbers();
        
        this.showNotification('Cleared diff result', 'success');
    }

    /**
     * Build line map for highlighting differences
     */
    buildLineMap(jsonA, jsonB, formattedA, formattedB) {
        this.diffLineMap = { jsonA: {}, jsonB: {} };
        
        // Parse formatted JSON line by line and map paths to line numbers
        const linesA = formattedA.split('\n');
        const linesB = formattedB.split('\n');
        
        // Simple heuristic: find lines containing keys from differences
        this.allDifferences.forEach(diff => {
            const pathParts = diff.path.split(/[\.\[\]]+/).filter(p => p);
            const lastKey = pathParts[pathParts.length - 1];
            
            // Find line in JSON A
            linesA.forEach((line, lineNum) => {
                if (line.includes(`"${lastKey}"`) || line.includes(`${lastKey}:`)) {
                    if (!this.diffLineMap.jsonA[lineNum]) {
                        this.diffLineMap.jsonA[lineNum] = diff.type;
                    }
                }
            });
            
            // Find line in JSON B
            linesB.forEach((line, lineNum) => {
                if (line.includes(`"${lastKey}"`) || line.includes(`${lastKey}:`)) {
                    if (!this.diffLineMap.jsonB[lineNum]) {
                        this.diffLineMap.jsonB[lineNum] = diff.type;
                    }
                }
            });
        });
    }

    /**
     * Highlight lines with differences
     */
    highlightDiffLines() {
        // Highlight JSON A
        if (this.jsonALineNumbers) {
            const lineElements = this.jsonALineNumbers.querySelectorAll('div');
            lineElements.forEach((elem, index) => {
                // Remove existing classes
                elem.classList.remove('diff-line-added', 'diff-line-removed', 'diff-line-modified', 'diff-current');
                
                // Add diff class if this line has a difference
                const diffType = this.diffLineMap.jsonA[index];
                if (diffType) {
                    elem.classList.add(`diff-line-${diffType}`);
                }
            });
        }
        
        // Highlight JSON B
        if (this.jsonBLineNumbers) {
            const lineElements = this.jsonBLineNumbers.querySelectorAll('div');
            lineElements.forEach((elem, index) => {
                // Remove existing classes
                elem.classList.remove('diff-line-added', 'diff-line-removed', 'diff-line-modified', 'diff-current');
                
                // Add diff class if this line has a difference
                const diffType = this.diffLineMap.jsonB[index];
                if (diffType) {
                    elem.classList.add(`diff-line-${diffType}`);
                }
            });
        }
    }

    /**
     * Update diff summary with counts
     */
    updateDiffSummary() {
        const added = this.allDifferences.filter(d => d.type === 'added').length;
        const removed = this.allDifferences.filter(d => d.type === 'removed').length;
        const modified = this.allDifferences.filter(d => d.type === 'modified').length;
        const total = this.allDifferences.length;
        
        document.getElementById('diffCount').textContent = total === 1 ? '1 difference' : `${total} differences`;
        document.getElementById('addedCount').textContent = added;
        document.getElementById('removedCount').textContent = removed;
        document.getElementById('modifiedCount').textContent = modified;
        
        // Update navigation buttons
        this.updateNavigationButtons();
    }

    /**
     * Update navigation button states
     */
    updateNavigationButtons() {
        const prevBtn = document.getElementById('prevDiff');
        const nextBtn = document.getElementById('nextDiff');
        const positionSpan = document.getElementById('diffPosition');
        
        if (this.allDifferences.length === 0) {
            if (prevBtn) prevBtn.disabled = true;
            if (nextBtn) nextBtn.disabled = true;
            if (positionSpan) positionSpan.textContent = '-/-';
        } else {
            if (prevBtn) prevBtn.disabled = this.currentDiffIndex <= 0;
            if (nextBtn) nextBtn.disabled = this.currentDiffIndex >= this.allDifferences.length - 1;
            
            if (positionSpan && this.currentDiffIndex >= 0) {
                positionSpan.textContent = `${this.currentDiffIndex + 1}/${this.allDifferences.length}`;
            } else if (positionSpan) {
                positionSpan.textContent = `-/${this.allDifferences.length}`;
            }
        }
    }

    /**
     * Navigate to next/previous difference
     */
    navigateDiff(direction) {
        if (this.allDifferences.length === 0) return;
        
        if (direction === 'next') {
            this.currentDiffIndex = Math.min(this.currentDiffIndex + 1, this.allDifferences.length - 1);
        } else {
            this.currentDiffIndex = Math.max(this.currentDiffIndex - 1, 0);
        }
        
        this.updateNavigationButtons();
        this.scrollToDiff(this.currentDiffIndex);
    }

    /**
     * Scroll to specific difference
     */
    scrollToDiff(index) {
        if (index < 0 || index >= this.allDifferences.length) return;
        
        const diff = this.allDifferences[index];
        
        // Highlight current diff in detail panel
        const diffLines = this.diffResult.querySelectorAll('.diff-line');
        diffLines.forEach((line, idx) => {
            if (idx === index) {
                line.style.background = 'rgba(255, 193, 7, 0.2)';
                line.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                line.style.background = '';
            }
        });
        
        // Update line number highlighting
        this.highlightDiffLines();
        
        // Find and highlight current line in line numbers
        const pathParts = diff.path.split(/[\.\[\]]+/).filter(p => p);
        const lastKey = pathParts[pathParts.length - 1];
        
        // Scroll JSON textareas to relevant line
        const linesA = this.jsonATextarea.value.split('\n');
        const linesB = this.jsonBTextarea.value.split('\n');
        
        let targetLineA = linesA.findIndex(line => line.includes(`"${lastKey}"`));
        let targetLineB = linesB.findIndex(line => line.includes(`"${lastKey}"`));
        
        if (targetLineA >= 0 && this.jsonATextarea) {
            const lineHeight = 24; // approximate
            this.jsonATextarea.scrollTop = targetLineA * lineHeight - 100;
            
            // Add visual highlight to line number
            if (this.jsonALineNumbers) {
                const lineElements = this.jsonALineNumbers.querySelectorAll('div');
                lineElements.forEach((elem, idx) => {
                    elem.classList.remove('diff-current');
                    if (idx === targetLineA) {
                        elem.classList.add('diff-current');
                    }
                });
            }
        }
        
        if (targetLineB >= 0 && this.jsonBTextarea) {
            const lineHeight = 24;
            this.jsonBTextarea.scrollTop = targetLineB * lineHeight - 100;
            
            // Add visual highlight to line number
            if (this.jsonBLineNumbers) {
                const lineElements = this.jsonBLineNumbers.querySelectorAll('div');
                lineElements.forEach((elem, idx) => {
                    elem.classList.remove('diff-current');
                    if (idx === targetLineB) {
                        elem.classList.add('diff-current');
                    }
                });
            }
        }
    }

    /**
     * Toggle diff details panel
     */
    toggleDiffPanel() {
        const panel = document.getElementById('diffDetailsPanel');
        const toggleBtn = document.getElementById('toggleDiffPanel');
        
        if (panel) {
            panel.classList.toggle('collapsed');
            
            if (toggleBtn) {
                toggleBtn.classList.toggle('expanded');
            }
        }
    }

    /**
     * Handle keyboard shortcuts
     */
    handleKeyboardShortcuts(e) {
        // Cmd/Ctrl + Enter: Compress or Compare depending on mode
        if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
            e.preventDefault();
            if (this.currentMode === 'transform') {
                this.compress();
            } else if (this.currentMode === 'compare') {
                this.compareJSON();
            }
        }
        
        // Cmd/Ctrl + Shift + Enter: Decompress
        if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'Enter') {
            e.preventDefault();
            this.decompress();
        }
        
        // Cmd/Ctrl + K: Clear input
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            if (this.currentMode === 'transform') {
                this.clearInput();
            } else if (this.currentMode === 'compare') {
                this.clearJsonA();
            }
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

