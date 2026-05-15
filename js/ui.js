/**
 * МОДУЛЬ: ПОЛЬЗОВАТЕЛЬСКИЙ ИНТЕРФЕЙС
 * Управление переводами, режимом для слабовидящих, навигацией
 */

// ========== ГЛОБАЛЬНЫЕ ПЕРЕВОДЫ ==========
const translations = {
    ru: {
        // Навигация
        visionBtn: 'Версия для слабовидящих',
        visionBtnActive: 'Обычная версия',
        service: 'Сервис',
        about: 'О сервисе',
        howto: 'Как пользоваться',

        // Секция Сервис
        serviceTitle: 'Голосовой диктофон',
        docTextLabel: 'Текст документа',
        templateLabel: 'Шаблон документа',
        recordControlLabel: 'Управление записью',
        startBtn: 'Начать запись',
        stopBtn: 'Остановить',
        saveBtn: 'Сформировать документ',
        newDocBtn: 'Новый документ',
        settingsTitle: 'Настройки',
        autoSaveLabel: 'Автоматически сохранять введенный текст',

        // Секция About
        aboutLead: 'Голосовое заполнение медицинской документации',
        goalTitle: 'Цель сервиса',
        goalDesc: 'Сократить время сотрудника на заполнение документации',
        advTitle: 'Преимущества',
        advDesc: 'Экономия времени, готовые шаблоны, работает в браузере',
        securityTitle: 'Безопасность',
        securityDesc: 'Данные хранятся локально, не передаются на сервер',

        // Секция Howto
        howtoTitle: 'Как пользоваться сервисом',
        step1: '<h4>Шаг 1:</h4><p>Разрешите доступ к микрофону в браузере</p>',
        step2: '<h4>Шаг 2:</h4><p>Выберите шаблон документа (по желанию)</p>',
        step3: '<h4>Шаг 3:</h4><p>Нажмите "Начать запись" и говорите четко</p>',
        step4: '<h4>Шаг 4:</h4><p>Нажмите "Остановить" когда закончите</p>',
        step5: '<h4>Шаг 5:</h4><p>Нажмите "Сформировать документ"</p>',
        step6: '<h4>Шаг 6*:</h4><p>Для печати: ПК - Ctrl+P, Телефон - ⋮ (меню) → "Печать"</p>',

        // Футер
        footerText: 'MedVoice — дипломный проект',

        // Welcome screen
        welcomeSubtitle: 'Выберите язык / Choose language',

        // Плейсхолдер
        textareaPlaceholder: 'Нажмите "Начать запись" и говорите...'
    },
    en: {
        visionBtn: 'Vision impaired version',
        visionBtnActive: 'Regular version',
        service: 'Service',
        about: 'About',
        howto: 'How to use',

        serviceTitle: 'Voice Recorder',
        docTextLabel: 'Document Text',
        templateLabel: 'Document Template',
        recordControlLabel: 'Recording Control',
        startBtn: 'Start Recording',
        stopBtn: 'Stop',
        saveBtn: 'Generate Document',
        newDocBtn: 'New Document',
        settingsTitle: 'Settings',
        autoSaveLabel: 'Auto save entered text',

        aboutLead: 'Voice filling of medical documentation',
        goalTitle: 'Service Goal',
        goalDesc: 'Reduce the time for filling out documentation',
        advTitle: 'Advantages',
        advDesc: 'Time saving, ready templates, works in browser',
        securityTitle: 'Security',
        securityDesc: 'Data is stored locally, not transmitted to the server',

        howtoTitle: 'How to use the service',
        step1: '<h4>Step 1:</h4><p>Allow microphone access in your browser</p>',
        step2: '<h4>Step 2:</h4><p>Select a document template (optional)</p>',
        step3: '<h4>Step 3:</h4><p>Press "Start Recording" and speak clearly</p>',
        step4: '<h4>Step 4:</h4><p>Press "Stop" when finished</p>',
        step5: '<h4>Step 5:</h4><p>Click "Generate Document"</p>',
        step6: '<h4>Step 6*:</h4><p>To print: PC - Ctrl+P, Phone - ⋮ (menu) → "Print"</p>',

        footerText: 'MedVoice — Diploma project',

        welcomeSubtitle: 'Choose language',
        textareaPlaceholder: 'Press "Start Recording" and speak...'
    }
};

/**
 * Переключить язык интерфейса
 * @param {string} lang - Язык ('ru' или 'en')
 */
function switchLanguage(lang) {
    const t = translations[lang];
    if (!t) return;

    // Навигация
    const visionBtnSpan = document.getElementById('visionBtnText');
    if (visionBtnSpan) visionBtnSpan.textContent = document.body.classList.contains('vision-mode') ? t.visionBtnActive : t.visionBtn;

    const navLinks = document.querySelectorAll('.nav-link');
    if (navLinks[0]) navLinks[0].textContent = t.service;
    if (navLinks[1]) navLinks[1].textContent = t.about;
    if (navLinks[2]) navLinks[2].textContent = t.howto;

    // Секция Сервис
    const serviceTitle = document.getElementById('serviceTitle');
    if (serviceTitle) serviceTitle.textContent = t.serviceTitle;

    const docTextLabel = document.getElementById('docTextLabel');
    if (docTextLabel) docTextLabel.textContent = t.docTextLabel;

    const templateLabel = document.getElementById('templateLabel');
    if (templateLabel) templateLabel.textContent = t.templateLabel;

    const recordControlLabel = document.getElementById('recordControlLabel');
    if (recordControlLabel) recordControlLabel.textContent = t.recordControlLabel;

    const startBtnSpan = document.getElementById('startBtnText');
    if (startBtnSpan) startBtnSpan.textContent = t.startBtn;

    const stopBtnSpan = document.getElementById('stopBtnText');
    if (stopBtnSpan) stopBtnSpan.textContent = t.stopBtn;

    const saveBtnSpan = document.getElementById('saveBtnText');
    if (saveBtnSpan) saveBtnSpan.textContent = t.saveBtn;

    const newDocBtnSpan = document.getElementById('newDocBtnText');
    if (newDocBtnSpan) newDocBtnSpan.textContent = t.newDocBtn;

    const settingsTitle = document.getElementById('settingsTitle');
    if (settingsTitle) settingsTitle.textContent = t.settingsTitle;

    const autoSaveLabel = document.getElementById('autoSaveLabel');
    if (autoSaveLabel) autoSaveLabel.textContent = t.autoSaveLabel;

    // Секция About
    const aboutLead = document.getElementById('aboutLead');
    if (aboutLead) aboutLead.textContent = t.aboutLead;

    const goalTitle = document.getElementById('goalTitle');
    if (goalTitle) goalTitle.textContent = t.goalTitle;

    const goalDesc = document.getElementById('goalDesc');
    if (goalDesc) goalDesc.textContent = t.goalDesc;

    const advTitle = document.getElementById('advTitle');
    if (advTitle) advTitle.textContent = t.advTitle;

    const advDesc = document.getElementById('advDesc');
    if (advDesc) advDesc.textContent = t.advDesc;

    const securityTitle = document.getElementById('securityTitle');
    if (securityTitle) securityTitle.textContent = t.securityTitle;

    const securityDesc = document.getElementById('securityDesc');
    if (securityDesc) securityDesc.textContent = t.securityDesc;

    // Секция Howto
    const howtoTitle = document.getElementById('howtoTitle');
    if (howtoTitle) howtoTitle.textContent = t.howtoTitle;

    const stepsList = document.getElementById('stepsList');
    if (stepsList) {
        const steps = stepsList.children;
        if (steps[0]) steps[0].innerHTML = t.step1;
        if (steps[1]) steps[1].innerHTML = t.step2;
        if (steps[2]) steps[2].innerHTML = t.step3;
        if (steps[3]) steps[3].innerHTML = t.step4;
        if (steps[4]) steps[4].innerHTML = t.step5;
        if (steps[5]) steps[5].innerHTML = t.step6;
    }

    // Футер
    const footerText = document.getElementById('footerText');
    if (footerText) footerText.textContent = t.footerText;

    // Welcome subtitle
    const welcomeSubtitle = document.getElementById('welcomeSubtitle');
    if (welcomeSubtitle) welcomeSubtitle.textContent = t.welcomeSubtitle;

    // Плейсхолдер текстового поля
    const textarea = document.getElementById('voiceText');
    if (textarea) textarea.placeholder = t.textareaPlaceholder;

    // Обновляем опции выпадающего списка
    const select = document.getElementById('templateSelect');
    if (select) {
        if (lang === 'en') {
            select.options[0].text = '-- Select template --';
            select.options[1].text = '📄 Empty template';
            select.options[2].text = '🩺 Initial appointment';
            select.options[3].text = '💊 Prescription';
            select.options[4].text = '📋 Referral';
        } else {
            select.options[0].text = '-- Выберите шаблон --';
            select.options[1].text = '📄 Пустой шаблон';
            select.options[2].text = '🩺 Первичный прием';
            select.options[3].text = '💊 Рецепт';
            select.options[4].text = '📋 Направление';
        }
    }
}

// ========== РЕЖИМ ДЛЯ СЛАБОВИДЯЩИХ ==========
let isVisionMode = false;

/**
 * Инициализация режима для слабовидящих
 */
function initVisionMode() {
    const visionBtn = document.getElementById('visionModeBtn');
    if (!visionBtn) return;

    // Загружаем сохраненное состояние
    isVisionMode = loadVisionModeState();
    if (isVisionMode) {
        document.body.classList.add('vision-mode');
        visionBtn.classList.add('btn-success');
        visionBtn.classList.remove('btn-warning');
        updateVisionButtonText();
    }

    visionBtn.addEventListener('click', toggleVisionMode);
}

/**
 * Переключить режим для слабовидящих
 */
function toggleVisionMode() {
    const visionBtn = document.getElementById('visionModeBtn');
    isVisionMode = !isVisionMode;

    if (isVisionMode) {
        document.body.classList.add('vision-mode');
        visionBtn.classList.add('btn-success');
        visionBtn.classList.remove('btn-warning');
    } else {
        document.body.classList.remove('vision-mode');
        visionBtn.classList.remove('btn-success');
        visionBtn.classList.add('btn-warning');
    }

    saveVisionModeState(isVisionMode);
    updateVisionButtonText();
}

/**
 * Обновить текст кнопки режима для слабовидящих
 */
function updateVisionButtonText() {
    const visionBtnSpan = document.getElementById('visionBtnText');
    if (!visionBtnSpan) return;

    const lang = loadLanguage();
    const t = translations[lang];

    visionBtnSpan.textContent = isVisionMode ? t.visionBtnActive : t.visionBtn;
}

// ========== НАВИГАЦИЯ И КНОПКА НАВЕРХ ==========

/**
 * Инициализация плавной прокрутки для навигационных ссылок
 */
function initSmoothScroll() {
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    });
}

/**
 * Инициализация кнопки "Наверх"
 */
function initBackToTopButton() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        backToTopBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}