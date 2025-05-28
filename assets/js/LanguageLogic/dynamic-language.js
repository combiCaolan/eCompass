/**
 * DynamicLanguage.js
 * 
 * Loads language key-value pairs from sessionStorage and builds the LanguageDict object.
 * This dictionary is used for dynamic UI localization throughout the application.
 * Uses best practices for variable naming, code structure, and documentation.
 */

// Build LanguageDict from LanguageFileContents in sessionStorage
let LanguageDict = {};

if (sessionStorage.getItem('LanguageFileContents')) {
    const languageLines = sessionStorage.getItem('LanguageFileContents').split('\n');
    for (let i = 0; i < languageLines.length; i++) {
        const line = languageLines[i];
        if (!line) continue;
        const parts = line.split(':');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            const value = parts.slice(1).join(':').trim(); // Handles values with colons
            LanguageDict[key] = value;
        }
    }
}