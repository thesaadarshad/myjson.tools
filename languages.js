/**
 * Multilingual support for JSON Compressor
 * Add new languages by extending the translations object
 */

const translations = {
    en: {
        name: "English",
        dir: "ltr",
        translations: {
            // Header
            title: "JSON Playground",
            subtitle: "Transform, format, and convert JSON with ease",
            
            // Input Panel
            inputTitle: "Input JSON",
            inputPlaceholder: "Paste your JSON here...",
            clearInput: "Clear",
            paste: "Paste",
            sample: "Sample",
            
            // Output Panel
            outputTitle: "Output JSON",
            outputPlaceholder: "Output will appear here...",
            copy: "Copy",
            download: "Download",
            clearOutput: "Clear",
            
            // Control Buttons
            compress: "Compress",
            beautify: "Beautify",
            sort: "Sort",
            yaml: "YAML",
            decompress: "Decompress",
            
            // Stats
            lines: "lines",
            smaller: "smaller",
            larger: "larger",
            
            // Notifications
            compressSuccess: "JSON compressed successfully",
            beautifySuccess: "JSON beautified successfully",
            sortSuccess: "JSON sorted successfully",
            yamlSuccess: "JSON converted to YAML successfully",
            decompressSuccess: "JSON decompressed successfully",
            invalidJson: "Invalid JSON",
            nothingToCopy: "Nothing to copy",
            copiedToClipboard: "Copied to clipboard",
            nothingToCompress: "Please enter some JSON to compress",
            nothingToBeautify: "Please enter some JSON to beautify",
            nothingToSort: "Please enter some JSON to sort",
            nothingToYaml: "Please enter some JSON to convert to YAML",
            nothingToDecompress: "Please enter some JSON to decompress",
            pastedFromClipboard: "Pasted from clipboard",
            clipboardAccessError: "Could not access clipboard",
            nothingToDownload: "Nothing to download",
            fileDownloaded: "File downloaded",
            sampleLoaded: "Sample JSON loaded",
            
            // Footer
            footer: "Built with precision • Following golden ratio principles",
            
            // Tooltips
            tooltipClearInput: "Clear input",
            tooltipPaste: "Paste from clipboard",
            tooltipSample: "Load sample JSON",
            tooltipCopy: "Copy to clipboard",
            tooltipDownload: "Download as file",
            tooltipClearOutput: "Clear output",
            tooltipCompress: "Compress JSON",
            tooltipBeautify: "Beautify JSON",
            tooltipSort: "Sort JSON keys",
            tooltipYaml: "Convert JSON to YAML",
            tooltipDecompress: "Decompress JSON"
        }
    },
    
    es: {
        name: "Español",
        dir: "ltr",
        translations: {
            title: "JSON Playground",
            subtitle: "Transforma, formatea y convierte JSON con facilidad",
            
            inputTitle: "JSON de Entrada",
            inputPlaceholder: "Pega tu JSON aquí...",
            clearInput: "Limpiar",
            paste: "Pegar",
            sample: "Ejemplo",
            
            outputTitle: "JSON de Salida",
            outputPlaceholder: "La salida aparecerá aquí...",
            copy: "Copiar",
            download: "Descargar",
            clearOutput: "Limpiar",
            
            compress: "Comprimir",
            beautify: "Embellecer",
            sort: "Ordenar",
            yaml: "YAML",
            decompress: "Descomprimir",
            
            lines: "líneas",
            smaller: "más pequeño",
            larger: "más grande",
            
            compressSuccess: "JSON comprimido exitosamente",
            beautifySuccess: "JSON embellecido exitosamente",
            sortSuccess: "JSON ordenado exitosamente",
            yamlSuccess: "JSON convertido a YAML exitosamente",
            decompressSuccess: "JSON descomprimido exitosamente",
            invalidJson: "JSON inválido",
            nothingToCopy: "Nada que copiar",
            copiedToClipboard: "Copiado al portapapeles",
            nothingToCompress: "Por favor ingresa un JSON para comprimir",
            nothingToBeautify: "Por favor ingresa un JSON para embellecer",
            nothingToSort: "Por favor ingresa un JSON para ordenar",
            nothingToYaml: "Por favor ingresa un JSON para convertir a YAML",
            nothingToDecompress: "Por favor ingresa un JSON para descomprimir",
            pastedFromClipboard: "Pegado desde el portapapeles",
            clipboardAccessError: "No se pudo acceder al portapapeles",
            nothingToDownload: "Nada que descargar",
            fileDownloaded: "Archivo descargado",
            sampleLoaded: "JSON de ejemplo cargado",
            
            footer: "Construido con precisión • Siguiendo principios de proporción áurea",
            
            tooltipClearInput: "Limpiar entrada",
            tooltipPaste: "Pegar desde portapapeles",
            tooltipSample: "Cargar JSON de ejemplo",
            tooltipCopy: "Copiar al portapapeles",
            tooltipDownload: "Descargar como archivo",
            tooltipClearOutput: "Limpiar salida",
            tooltipCompress: "Comprimir JSON",
            tooltipBeautify: "Embellecer JSON",
            tooltipSort: "Ordenar claves JSON",
            tooltipYaml: "Convertir JSON a YAML",
            tooltipDecompress: "Descomprimir JSON"
        }
    },
    
    ar: {
        name: "العربية",
        dir: "rtl",
        translations: {
            title: "JSON Playground",
            subtitle: "حوّل، نسّق، وغيّر JSON بسهولة",
            
            inputTitle: "JSON الإدخال",
            inputPlaceholder: "الصق JSON هنا...",
            clearInput: "مسح",
            paste: "لصق",
            sample: "مثال",
            
            outputTitle: "JSON الإخراج",
            outputPlaceholder: "سيظهر الإخراج هنا...",
            copy: "نسخ",
            download: "تحميل",
            clearOutput: "مسح",
            
            compress: "ضغط",
            beautify: "تجميل",
            sort: "ترتيب",
            yaml: "YAML",
            decompress: "فك الضغط",
            
            lines: "أسطر",
            smaller: "أصغر",
            larger: "أكبر",
            
            compressSuccess: "تم ضغط JSON بنجاح",
            beautifySuccess: "تم تجميل JSON بنجاح",
            sortSuccess: "تم ترتيب JSON بنجاح",
            yamlSuccess: "تم تحويل JSON إلى YAML بنجاح",
            decompressSuccess: "تم فك ضغط JSON بنجاح",
            invalidJson: "JSON غير صالح",
            nothingToCopy: "لا يوجد شيء للنسخ",
            copiedToClipboard: "تم النسخ إلى الحافظة",
            nothingToCompress: "الرجاء إدخال JSON للضغط",
            nothingToBeautify: "الرجاء إدخال JSON للتجميل",
            nothingToSort: "الرجاء إدخال JSON للترتيب",
            nothingToYaml: "الرجاء إدخال JSON للتحويل إلى YAML",
            nothingToDecompress: "الرجاء إدخال JSON لفك الضغط",
            pastedFromClipboard: "تم اللصق من الحافظة",
            clipboardAccessError: "تعذر الوصول إلى الحافظة",
            nothingToDownload: "لا يوجد شيء للتحميل",
            fileDownloaded: "تم تحميل الملف",
            sampleLoaded: "تم تحميل مثال JSON",
            
            footer: "بُني بدقة • باتباع مبادئ النسبة الذهبية",
            
            tooltipClearInput: "مسح الإدخال",
            tooltipPaste: "لصق من الحافظة",
            tooltipSample: "تحميل مثال JSON",
            tooltipCopy: "نسخ إلى الحافظة",
            tooltipDownload: "تحميل كملف",
            tooltipClearOutput: "مسح الإخراج",
            tooltipCompress: "ضغط JSON",
            tooltipBeautify: "تجميل JSON",
            tooltipSort: "ترتيب مفاتيح JSON",
            tooltipYaml: "تحويل JSON إلى YAML",
            tooltipDecompress: "فك ضغط JSON"
        }
    },
    
    fr: {
        name: "Français",
        dir: "ltr",
        translations: {
            title: "JSON Playground",
            subtitle: "Transformez, formatez et convertissez JSON facilement",
            
            inputTitle: "JSON d'Entrée",
            inputPlaceholder: "Collez votre JSON ici...",
            clearInput: "Effacer",
            paste: "Coller",
            sample: "Exemple",
            
            outputTitle: "JSON de Sortie",
            outputPlaceholder: "La sortie apparaîtra ici...",
            copy: "Copier",
            download: "Télécharger",
            clearOutput: "Effacer",
            
            compress: "Compresser",
            beautify: "Embellir",
            sort: "Trier",
            yaml: "YAML",
            decompress: "Décompresser",
            
            lines: "lignes",
            smaller: "plus petit",
            larger: "plus grand",
            
            compressSuccess: "JSON compressé avec succès",
            beautifySuccess: "JSON embelli avec succès",
            sortSuccess: "JSON trié avec succès",
            yamlSuccess: "JSON converti en YAML avec succès",
            decompressSuccess: "JSON décompressé avec succès",
            invalidJson: "JSON invalide",
            nothingToCopy: "Rien à copier",
            copiedToClipboard: "Copié dans le presse-papiers",
            nothingToCompress: "Veuillez entrer un JSON à compresser",
            nothingToBeautify: "Veuillez entrer un JSON à embellir",
            nothingToSort: "Veuillez entrer un JSON à trier",
            nothingToYaml: "Veuillez entrer un JSON à convertir en YAML",
            nothingToDecompress: "Veuillez entrer un JSON à décompresser",
            pastedFromClipboard: "Collé depuis le presse-papiers",
            clipboardAccessError: "Impossible d'accéder au presse-papiers",
            nothingToDownload: "Rien à télécharger",
            fileDownloaded: "Fichier téléchargé",
            sampleLoaded: "Exemple JSON chargé",
            
            footer: "Construit avec précision • Suivant les principes du nombre d'or",
            
            tooltipClearInput: "Effacer l'entrée",
            tooltipPaste: "Coller depuis le presse-papiers",
            tooltipSample: "Charger un exemple JSON",
            tooltipCopy: "Copier dans le presse-papiers",
            tooltipDownload: "Télécharger comme fichier",
            tooltipClearOutput: "Effacer la sortie",
            tooltipCompress: "Compresser JSON",
            tooltipBeautify: "Embellir JSON",
            tooltipSort: "Trier les clés JSON",
            tooltipYaml: "Convertir JSON en YAML",
            tooltipDecompress: "Décompresser JSON"
        }
    },
    
    de: {
        name: "Deutsch",
        dir: "ltr",
        translations: {
            title: "JSON Playground",
            subtitle: "JSON einfach transformieren, formatieren und konvertieren",
            
            inputTitle: "Eingabe-JSON",
            inputPlaceholder: "JSON hier einfügen...",
            clearInput: "Löschen",
            paste: "Einfügen",
            sample: "Beispiel",
            
            outputTitle: "Ausgabe-JSON",
            outputPlaceholder: "Die Ausgabe erscheint hier...",
            copy: "Kopieren",
            download: "Herunterladen",
            clearOutput: "Löschen",
            
            compress: "Komprimieren",
            beautify: "Verschönern",
            sort: "Sortieren",
            yaml: "YAML",
            decompress: "Dekomprimieren",
            
            lines: "Zeilen",
            smaller: "kleiner",
            larger: "größer",
            
            compressSuccess: "JSON erfolgreich komprimiert",
            beautifySuccess: "JSON erfolgreich verschönert",
            sortSuccess: "JSON erfolgreich sortiert",
            yamlSuccess: "JSON erfolgreich in YAML konvertiert",
            decompressSuccess: "JSON erfolgreich dekomprimiert",
            invalidJson: "Ungültiges JSON",
            nothingToCopy: "Nichts zu kopieren",
            copiedToClipboard: "In Zwischenablage kopiert",
            nothingToCompress: "Bitte geben Sie JSON zum Komprimieren ein",
            nothingToBeautify: "Bitte geben Sie JSON zum Verschönern ein",
            nothingToSort: "Bitte geben Sie JSON zum Sortieren ein",
            nothingToYaml: "Bitte geben Sie JSON zum Konvertieren in YAML ein",
            nothingToDecompress: "Bitte geben Sie JSON zum Dekomprimieren ein",
            pastedFromClipboard: "Aus Zwischenablage eingefügt",
            clipboardAccessError: "Zugriff auf Zwischenablage nicht möglich",
            nothingToDownload: "Nichts zum Herunterladen",
            fileDownloaded: "Datei heruntergeladen",
            sampleLoaded: "Beispiel-JSON geladen",
            
            footer: "Mit Präzision gebaut • Nach dem Goldenen Schnitt",
            
            tooltipClearInput: "Eingabe löschen",
            tooltipPaste: "Aus Zwischenablage einfügen",
            tooltipSample: "Beispiel-JSON laden",
            tooltipCopy: "In Zwischenablage kopieren",
            tooltipDownload: "Als Datei herunterladen",
            tooltipClearOutput: "Ausgabe löschen",
            tooltipCompress: "JSON komprimieren",
            tooltipBeautify: "JSON verschönern",
            tooltipSort: "JSON-Schlüssel sortieren",
            tooltipYaml: "JSON in YAML konvertieren",
            tooltipDecompress: "JSON dekomprimieren"
        }
    }
};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = translations;
}

