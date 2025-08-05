# Тестовое задание. Выполнено на Playwright в двух вариантах:

1. Целым файлом с проверками - /tests/fullTest.spec.js
2. Через РОМ - /POM/...
Для того чтобы тестировать разными вариантами, необходимо в файле **playwright.config.js** изменить директорию тестовых файлов: **testDir: './POM/tests' или './tests'**, 

* Команда установки Playwright: **npm init playwright@latest**
* Команда запуска Playwright: **npx playwright test --ui**
