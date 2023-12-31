# Структура проекту

Цей проект містить наступну структуру директорій і файлів:

- `.git`: Директорія, що містить дані Git для керування версіями.
- `node_modules`: Директорія, де зберігаються залежності проекту, і її можна відновити за допомогою команди `npm install`.
- `public`: Директорія, що містить головний HTML-файл і інші ресурси, які необхідні для відображення вашого додатку.
- `src`: Основна директорія, де розміщений весь вихідний код проекту.

### Директорії проекту

- `src/api`: Містить файли та логіку для взаємодії з API або зовнішніми джерелами даних.
- `src/App`: Містить основний компонент додатку або контейнер верхнього рівня.
- `src/components`: Директорія, де розміщені всі компоненти додатку.
- `src/fonts`: Директорія для шрифтів, які використовуються у проекті.
- `src/helpers`: Утилітарні функції та допоміжні файли для додатку.
- `src/icons`: Зображення або SVG-файли, що використовуються для іконок.
- `src/pages`: Кожна сторінка додатку має свою окрему директорію, яка містить компоненти цієї сторінки.
- `src/store`: Директорія для керування станом додатку, включаючи Redux або інші засоби стану.

### Файли проекту

- `src/App.test.js`: Тести для компонента `App`.
- `src/index.css`: Глобальні стилі для додатку.
- `src/index.js`: Точка входу у додаток.
- `src/serviceWorker.js`: Файл для реєстрації служби роботи в фоновому режимі (Service Worker).
- `src/setupTests.js`: Конфігурація тестів для додатку.
- `src/variables.scss`: Глобальні змінні для стилів (наприклад, кольори).

# Компоненти

## `src/components`

Ця директорія містить всі компоненти, які використовуються у додатку. Ось короткий опис деяких з них:

### `Card`

Компонент `Card` відображає окремий товар. Він містить зображення товару, його назву, ціну та іншу інформацію.

### Інші компоненти

У цій директорії також містяться інші компоненти, такі
