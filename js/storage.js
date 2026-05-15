/**
 * МОДУЛЬ: ХРАНИЛИЩЕ (localStorage)
 * Управление автосохранением и настройками пользователя
 */

// Ключи для localStorage
const STORAGE_KEYS = {
    LAST_DOCUMENT: 'lastDocument',
    AUTO_SAVE_ENABLED: 'autoSaveEnabled',
    MEDVOICE_LANG: 'medvoice_lang',
    VISION_MODE: 'visionMode'
};

/**
 * Сохранить текст документа в localStorage
 * @param {string} text - Текст для сохранения
 */
function saveDocumentToStorage(text) {
    if (text && text.trim() !== '') {
        localStorage.setItem(STORAGE_KEYS.LAST_DOCUMENT, text);
        console.log('Документ сохранен в localStorage');
    }
}

/**
 * Загрузить сохраненный документ из localStorage
 * @returns {string|null} Сохраненный текст или null
 */
function loadDocumentFromStorage() {
    return localStorage.getItem(STORAGE_KEYS.LAST_DOCUMENT);
}

/**
 * Очистить сохраненный документ
 */
function clearDocumentFromStorage() {
    localStorage.removeItem(STORAGE_KEYS.LAST_DOCUMENT);
}

/**
 * Сохранить состояние автосохранения
 * @param {boolean} enabled - Включено ли автосохранение
 */
function saveAutoSaveState(enabled) {
    localStorage.setItem(STORAGE_KEYS.AUTO_SAVE_ENABLED, enabled ? 'true' : 'false');
}

/**
 * Загрузить состояние автосохранения
 * @returns {boolean} Включено ли автосохранение
 */
function loadAutoSaveState() {
    return localStorage.getItem(STORAGE_KEYS.AUTO_SAVE_ENABLED) === 'true';
}

/**
 * Сохранить выбранный язык
 * @param {string} lang - Язык ('ru' или 'en')
 */
function saveLanguage(lang) {
    localStorage.setItem(STORAGE_KEYS.MEDVOICE_LANG, lang);
}

/**
 * Загрузить выбранный язык
 * @returns {string} Язык ('ru' или 'en'), по умолчанию 'ru'
 */
function loadLanguage() {
    const saved = localStorage.getItem(STORAGE_KEYS.MEDVOICE_LANG);
    return saved === 'en' ? 'en' : 'ru';
}

/**
 * Сохранить состояние режима для слабовидящих
 * @param {boolean} enabled - Включен ли режим
 */
function saveVisionModeState(enabled) {
    localStorage.setItem(STORAGE_KEYS.VISION_MODE, enabled ? 'true' : 'false');
}

/**
 * Загрузить состояние режима для слабовидящих
 * @returns {boolean} Включен ли режим
 */
function loadVisionModeState() {
    return localStorage.getItem(STORAGE_KEYS.VISION_MODE) === 'true';
}