/**
 * МОДУЛЬ: РАСПОЗНАВАНИЕ РЕЧИ (Web Speech API)
 * Управление голосовым вводом
 */

let recognition = null;
let currentCursorPosition = 0;
let textOutputElement = null;
let startBtnElement = null;
let stopBtnElement = null;
let isListening = false;

/**
 * Инициализация модуля распознавания речи
 * @param {HTMLTextAreaElement} textarea - Текстовое поле для вставки результата
 * @param {HTMLButtonElement} startBtn - Кнопка "Начать запись"
 * @param {HTMLButtonElement} stopBtn - Кнопка "Остановить"
 * @returns {boolean} Успешность инициализации
 */
function initSpeechRecognition(textarea, startBtn, stopBtn) {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
        console.warn('Браузер не поддерживает распознавание речи');
        if (startBtn) startBtn.disabled = true;
        return false;
    }

    textOutputElement = textarea;
    startBtnElement = startBtn;
    stopBtnElement = stopBtn;

    // Следим за позицией курсора
    textOutputElement.addEventListener('click', updateCursorPosition);
    textOutputElement.addEventListener('keyup', updateCursorPosition);
    textOutputElement.addEventListener('select', updateCursorPosition);

    // Создаем экземпляр распознавания
    createRecognition();
    return true;
}

/**
 * Обновить позицию курсора в текстовом поле
 */
function updateCursorPosition() {
    if (textOutputElement) {
        currentCursorPosition = textOutputElement.selectionStart;
    }
}

/**
 * Создать новый экземпляр распознавания с текущим языком
 */
function createRecognition() {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) return;

    const lang = loadLanguage();

    // Если уже есть существующий, завершаем его
    if (recognition) {
        try {
            recognition.abort();
        } catch (e) {
            // игнорируем ошибки при остановке
        }
    }

    recognition = new SpeechRecognitionAPI();
    recognition.lang = lang === 'en' ? 'en-US' : 'ru-RU';
    recognition.interimResults = true;
    recognition.continuous = true;

    setupRecognitionHandlers();

    console.log('Распознавание речи создано, язык:', recognition.lang);
}

/**
 * Настроить обработчики событий распознавания
 */
function setupRecognitionHandlers() {
    if (!recognition) return;

    recognition.onstart = () => {
        isListening = true;
        console.log('Распознавание начато');
    };

    recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
                transcript += event.results[i][0].transcript + ' ';
            }
        }

        // Приводим к нижнему регистру
        transcript = transcript.toLowerCase();

        if (textOutputElement && transcript.trim()) {
            insertTextAtCursor(transcript);

            // Вызываем автосохранение
            const autoSaveCheckbox = document.getElementById('autoSave');
            if (autoSaveCheckbox && autoSaveCheckbox.checked && textOutputElement.value) {
                saveDocumentToStorage(textOutputElement.value);
            }
        }
    };

    recognition.onerror = (event) => {
        console.error('Ошибка распознавания:', event.error);

        // Обрабатываем конкретные ошибки
        switch (event.error) {
            case 'not-allowed':
                const lang = loadLanguage();
                alert(lang === 'en'
                    ? 'Microphone access denied. Please allow microphone access in your browser settings and try again.'
                    : 'Доступ к микрофону запрещен. Пожалуйста, разрешите доступ к микрофону в настройках браузера и попробуйте снова.');
                break;
            case 'no-speech':
                console.log('Речь не обнаружена');
                break;
            case 'audio-capture':
                console.error('Микрофон не найден');
                break;
            default:
                console.log('Ошибка:', event.error);
        }

        if (startBtnElement) startBtnElement.disabled = false;
        if (stopBtnElement) stopBtnElement.disabled = true;
        isListening = false;
    };

    recognition.onend = () => {
        console.log('Распознавание завершено');
        if (startBtnElement) startBtnElement.disabled = false;
        if (stopBtnElement) stopBtnElement.disabled = true;
        isListening = false;
    };
}

/**
 * Вставить текст в текущую позицию курсора
 * @param {string} text - Текст для вставки
 */
function insertTextAtCursor(text) {
    if (!textOutputElement) return;

    const currentText = textOutputElement.value;
    const start = currentCursorPosition;

    textOutputElement.value = currentText.substring(0, start) + text + currentText.substring(start);
    currentCursorPosition = start + text.length;
    textOutputElement.setSelectionRange(currentCursorPosition, currentCursorPosition);
    textOutputElement.focus();

    // Триггерим событие input для автосохранения
    const inputEvent = new Event('input', { bubbles: true });
    textOutputElement.dispatchEvent(inputEvent);
}

/**
 * Обновить язык распознавания (вызывается при смене языка)
 */
function updateRecognitionLanguage() {
    if (recognition) {
        const wasListening = isListening;

        // Останавливаем если слушали
        if (wasListening) {
            try {
                recognition.stop();
            } catch (e) { }
        }

        // Пересоздаем с новым языком
        createRecognition();

        console.log('Язык распознавания обновлен');
    }
}

/**
 * Начать распознавание речи
 */
function startSpeechRecognition() {
    if (!recognition) {
        console.error('Распознавание речи не инициализировано');
        // Пробуем пересоздать
        if (textOutputElement && startBtnElement && stopBtnElement) {
            initSpeechRecognition(textOutputElement, startBtnElement, stopBtnElement);
        }
        if (!recognition) {
            alert('Распознавание речи не поддерживается вашим браузером');
            return;
        }
    }

    try {
        // Запрашиваем разрешение на микрофон
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(() => {
                recognition.start();
                if (startBtnElement) startBtnElement.disabled = true;
                if (stopBtnElement) stopBtnElement.disabled = false;
            })
            .catch(err => {
                console.error('Ошибка доступа к микрофону:', err);
                const lang = loadLanguage();
                alert(lang === 'en'
                    ? 'Cannot access microphone. Please check your permissions.'
                    : 'Не удалось получить доступ к микрофону. Пожалуйста, проверьте разрешения.');
            });
    } catch (e) {
        console.error('Ошибка при запуске распознавания:', e);
        // Если уже запущено, пробуем пересоздать
        createRecognition();
        if (recognition) {
            try {
                recognition.start();
                if (startBtnElement) startBtnElement.disabled = true;
                if (stopBtnElement) stopBtnElement.disabled = false;
            } catch (err) {
                console.error('Не удалось запустить распознавание:', err);
            }
        }
    }
}

/**
 * Остановить распознавание речи
 */
function stopSpeechRecognition() {
    if (recognition && isListening) {
        try {
            recognition.stop();
        } catch (e) {
            console.error('Ошибка при остановке распознавания:', e);
        }
    }
}

// Экспортируем функции в глобальную область для доступа из HTML
window.initSpeechRecognition = initSpeechRecognition;
window.startSpeechRecognition = startSpeechRecognition;
window.stopSpeechRecognition = stopSpeechRecognition;
window.updateRecognitionLanguage = updateRecognitionLanguage;
window.updateCursorPosition = updateCursorPosition;