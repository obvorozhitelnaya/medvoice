/**
 * ГЛАВНЫЙ ФАЙЛ ПРИЛОЖЕНИЯ
 * Инициализация всех модулей и управление приложением
 */

// Ждем полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {

    // ========== ЭЛЕМЕНТЫ DOM ==========
    const welcomeScreen = document.getElementById('welcomeScreen');
    const mainContent = document.getElementById('mainContent');
    const textOutput = document.getElementById('voiceText');
    const templateSelect = document.getElementById('templateSelect');
    const autoSaveCheckbox = document.getElementById('autoSave');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const saveBtn = document.getElementById('saveBtn');
    const newDocBtn = document.getElementById('newDocBtn');

    // ========== ПРОВЕРКА НАЛИЧИЯ ЭЛЕМЕНТОВ ==========
    if (!welcomeScreen || !mainContent) {
        console.error('Критическая ошибка: не найдены основные элементы страницы');
        return;
    }

    // ========== ВСЕГДА ПОКАЗЫВАЕМ ЭКРАН ПРИВЕТСТВИЯ ПРИ ЗАГРУЗКЕ ==========
    welcomeScreen.classList.remove('hidden');
    welcomeScreen.style.opacity = '1';
    mainContent.classList.add('hidden');

    // Очищаем URL от хэша, чтобы не было мелькания
    if (window.location.hash === '#main') {
        history.replaceState({ page: 'welcome' }, '', window.location.pathname);
    }

    // ========== ФУНКЦИЯ ПЕРЕХОДА НА ГЛАВНЫЙ ЭКРАН ==========
    function showMainContent(lang) {
        // Анимация исчезновения экрана приветствия
        welcomeScreen.style.opacity = '0';
        welcomeScreen.style.transition = 'opacity 0.5s ease';

        setTimeout(() => {
            welcomeScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');

            // Применяем язык интерфейса
            if (lang) {
                switchLanguage(lang);
                // Обновляем язык распознавания речи
                if (typeof updateRecognitionLanguage === 'function') {
                    updateRecognitionLanguage();
                }
            }

            // Обновляем URL без хэша, чтобы при обновлении не было скачков
            history.replaceState({ page: 'main' }, '', window.location.pathname);
            console.log('Переход на главный экран, язык:', lang);
        }, 500);
    }

    // ========== ФУНКЦИЯ ВОЗВРАТА НА ЭКРАН ПРИВЕТСТВИЯ ==========
    function showWelcomeScreen() {
        mainContent.classList.add('hidden');
        welcomeScreen.classList.remove('hidden');
        welcomeScreen.style.opacity = '1';
        history.replaceState({ page: 'welcome' }, '', window.location.pathname);
        console.log('Возврат на экран приветствия');
    }

    // ========== ЗАГРУЗКА СОХРАНЕННЫХ НАСТРОЕК (без автоматического перехода) ==========
    // Просто загружаем значения, но не переходим на главную

    // ========== ВОССТАНОВЛЕНИЕ СОХРАНЕННОГО ДОКУМЕНТА ==========
    const savedDoc = loadDocumentFromStorage();
    if (savedDoc && savedDoc.trim() !== '' && textOutput) {
        textOutput.value = savedDoc;
        console.log('Загружен сохраненный документ');
    }

    // ========== ВОССТАНОВЛЕНИЕ СОСТОЯНИЯ АВТОСОХРАНЕНИЯ ==========
    let autoSaveHandler = null;

    if (autoSaveCheckbox && textOutput) {
        autoSaveHandler = () => saveDocumentToStorage(textOutput.value);

        const autoSaveEnabled = loadAutoSaveState();
        autoSaveCheckbox.checked = autoSaveEnabled;

        if (autoSaveEnabled) {
            textOutput.addEventListener('input', autoSaveHandler);
        }

        autoSaveCheckbox.addEventListener('change', () => {
            if (autoSaveCheckbox.checked) {
                textOutput.addEventListener('input', autoSaveHandler);
                saveAutoSaveState(true);
            } else {
                textOutput.removeEventListener('input', autoSaveHandler);
                saveAutoSaveState(false);
            }
        });
    }

    // ========== ИНИЦИАЛИЗАЦИЯ РАСПОЗНАВАНИЯ РЕЧИ ==========
    // Откладываем инициализацию до момента, когда пользователь нажмет кнопку
    let speechInitialized = false;

    function initSpeechOnFirstUse() {
        if (speechInitialized) return;

        if (startBtn && stopBtn && textOutput) {
            const success = initSpeechRecognition(textOutput, startBtn, stopBtn);
            if (success) {
                // Назначаем обработчики кнопок
                startBtn.onclick = startSpeechRecognition;
                stopBtn.onclick = stopSpeechRecognition;
                speechInitialized = true;
                console.log('Распознавание речи инициализировано');
            } else {
                console.warn('Распознавание речи не поддерживается');
                if (startBtn) startBtn.disabled = true;
            }
        }
    }

    // Инициализируем при первом клике на кнопку записи
    if (startBtn) {
        startBtn.addEventListener('click', initSpeechOnFirstUse, { once: true });
    }

    // ========== ШАБЛОНЫ ДОКУМЕНТОВ ==========
    if (templateSelect && textOutput) {
        templateSelect.addEventListener('change', () => {
            const currentLang = loadLanguage();
            applyTemplateToField(templateSelect.value, textOutput, currentLang);
        });
    }

    // ========== НОВЫЙ ДОКУМЕНТ ==========
    if (newDocBtn && textOutput) {
        newDocBtn.addEventListener('click', () => {
            textOutput.value = '';
            clearDocumentFromStorage();
            if (templateSelect) templateSelect.value = '';
            // Обновляем позицию курсора в speech модуле
            if (typeof updateCursorPosition === 'function') {
                setTimeout(() => updateCursorPosition(), 10);
            }
        });
    }

    // ========== ФОРМИРОВАНИЕ ДОКУМЕНТА ==========
    if (saveBtn && textOutput) {
        saveBtn.addEventListener('click', () => {
            generatePrintDocument(textOutput.value);
        });
    }

    // ========== ИНИЦИАЛИЗАЦИЯ UI (кроме распознавания речи) ==========
    initVisionMode();
    initSmoothScroll();
    initBackToTopButton();

    // ========== ВЫБОР ЯЗЫКА ==========
    const langBtns = document.querySelectorAll('.lang-btn');

    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = btn.getAttribute('data-lang');
            if (!lang) return;

            // Сохраняем язык
            saveLanguage(lang);

            // Показываем главный контент с выбранным языком
            showMainContent(lang);
        });
    });

    // ========== ОБРАБОТКА КНОПКИ НАЗАД В БРАУЗЕРЕ ==========
    window.addEventListener('popstate', (event) => {
        // Проверяем, на каком мы сейчас экране
        const isMainVisible = !mainContent.classList.contains('hidden');
        const isWelcomeVisible = !welcomeScreen.classList.contains('hidden');

        if (isMainVisible) {
            // Если на главном экране - возвращаемся на приветствие
            showWelcomeScreen();
        } else if (isWelcomeVisible) {
            // Если уже на приветствии, ничего не делаем, но можно добавить логику
            console.log('Уже на экране приветствия');
        }
    });

    // Устанавливаем начальное состояние истории (без хэша)
    history.replaceState({ page: 'welcome' }, '', window.location.pathname);

    // Сохраняем ссылку на функцию showWelcomeScreen для возможного использования
    window.showWelcomeScreen = showWelcomeScreen;

    console.log('Приложение MedVoice инициализировано');
});