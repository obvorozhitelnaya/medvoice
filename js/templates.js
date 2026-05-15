/**
 * МОДУЛЬ: ШАБЛОНЫ ДОКУМЕНТОВ
 * Содержит шаблоны для медицинских документов на русском и английском языках
 */

// ========== РУССКИЕ ШАБЛОНЫ ==========
const RUSSIAN_TEMPLATES = {
    empty: ``,
    priem: `Пациент: [ФИО]
Дата: ${new Date().toLocaleDateString()}
Жалобы: 
Анамнез: 
Объективно: 
Диагноз: 
Назначения: `,
    recipe: `Рецепт
Пациент: [ФИО]
Препарат: 
Дозировка: 
Способ применения: 
Подпись врача: `,
    napravlenie: `Направление
Пациент: [ФИО]
Направляется к: 
Цель: 
Предварительный диагноз: 
Врач: `
};

// ========== АНГЛИЙСКИЕ ШАБЛОНЫ ==========
const ENGLISH_TEMPLATES = {
    empty: ``,
    priem: `Patient: [Full name]
Date: ${new Date().toLocaleDateString()}
Complaints: 
History: 
Objective examination: 
Diagnosis: 
Prescriptions: `,
    recipe: `Prescription
Patient: [Full name]
Medication: 
Dosage: 
Directions for use: 
Doctor's signature: `,
    napravlenie: `Referral
Patient: [Full name]
Referred to: 
Purpose: 
Preliminary diagnosis: 
Doctor: `
};

/**
 * Получить шаблон по ключу и языку
 * @param {string} key - Ключ шаблона ('empty', 'priem', 'recipe', 'napravlenie')
 * @param {string} lang - Язык ('ru' или 'en')
 * @returns {string} Текст шаблона
 */
function getTemplate(key, lang = 'ru') {
    const templates = lang === 'en' ? ENGLISH_TEMPLATES : RUSSIAN_TEMPLATES;
    return templates[key] || '';
}

/**
 * Применить шаблон к текстовому полю
 * @param {string} value - Значение из выпадающего списка
 * @param {HTMLTextAreaElement} textarea - Текстовое поле
 * @param {string} lang - Текущий язык
 */
function applyTemplateToField(value, textarea, lang) {
    if (!textarea) return;

    switch (value) {
        case 'empty':
            textarea.value = '';
            break;
        case 'priem':
            textarea.value = getTemplate('priem', lang);
            break;
        case 'recipe':
            textarea.value = getTemplate('recipe', lang);
            break;
        case 'napravlenie':
            textarea.value = getTemplate('napravlenie', lang);
            break;
        default:
            // Ничего не делаем
            break;
    }
}