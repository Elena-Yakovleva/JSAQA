### Jest. Playwright

Основные фреймворки для тестирования: 
* Playwright
* Puppeeter
* Cypress

### Jest - фреймворк используется в основном для UNIT-тестирования.

Основной подход к тестированию:
  * Организация тестовых данных и определение ожидаемого результата.
  * Вызов функции и получение фактического результата.
  * Сравнени фактического и ожидаемого результата.

Создание
* инициализация проекта ```npm init```
* установка пакета ```npm install --save-dev jest```

* вставка скрипта в ```package.json``` для запуска
```
{
    "scripts": {
        "test": "jest", // запускает тест на jest
        "test:watch": "jest --watchAll" // запускает jest со флагом watchAll - после прохода тестов программа не выходит из тестов и дает возможность выбора дальнейших тестов - после любого изменения тесты автоматически прогоняются.
    }
}
```
* создание папки для тестов: tests/unit
* создание файла для запуска тестов ```.test.js```
* запуск тестов ```npm run name_scripts```


**Для работы с выбранной функцией необходимо добавить в ее файл информацию о возможности ее экспорта.**

```
// в файле app.js
export.name_function = name_function;

```

**В файл с тестами необходимо добавить импорт функции из файла, где она расположена.**

```
const name = require("../../app") // внутри скобок указан путь к файлу

describe("Books name test suit", () => {
   it(".....", () => {
      expect(
        name.name_function([
            "...",
            "..."
        ])
      ).toEqual([
        "...",
        "..."
      ])
    })
});

// тест на отлавливание исключений, если не введены входные данные

describe ("Books name test suit", () => {
   it("Without pararms throws exception", () => {
      expect(() => name.name_function()).toThrow(TypeError);
   });
});

```
**Настройки jest.config.js**

```
// jest.config.js
module.exports = {
  verbose: true,                  // Показывать подробности прохождения тестов
  clearMocks: true,               // Автоматическая очистка mock-данных между тестами
  collectCoverage: true,          // Сбор данных о покрытии тестов
  coverageDirectory: 'coverage',  // Каталог для сохранения отчётов о покрытии
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!jest.config.js',
  ],
};
```

[Matchers в Jest:](https://jestjs.io/docs/using-matchers)
```
.toBe            // Проверяет точное равенство значений.
.toEqual         // Проверяет глубокое равенство объектов или массивов.
.toBeNull        // Проверяет, что значение равно null.
.toBeUndefined   // Проверяет, что значение равно undefined.
.toBeDefined     // Проверяет, что значение определено (не равно undefined).
.toBeTruthy      // Проверяет, что значение является "истинным" в логическом контексте.
.toBeFalsy       // Проверяет, что значение является "ложным" в логическом контексте.
.toBeGreaterThan // Проверяет, что значение больше заданного.
.toBeLessThan    // Проверяет, что значение меньше заданного.
.toContain       // Проверяет, что массив или строка содержит заданное значение.
.toMatch         // Проверяет, что строка соответствует заданному регулярному выражению 
   expect('hello').toMatch(/h.*o/);
.toThrow         // Проверяет, что функция выбрасывает исключение.
   expect(() => { throw new Error('error'); }).toThrow();
.toHaveLength    // Проверяет длину массива или строки.
.toHaveProperty  // Проверяет наличие свойства у объекта.
   expect({ a: 1, b: 2 }).toHaveProperty('a');
.toBeInstanceOf  // Проверяет, что объект является экземпляром заданного класса.
   class MyClass {}
   expect(new MyClass()).toBeInstanceOf(MyClass);
```

### Playwright

Playwright - Node-библиотека, предоставляющая API для управления браузерами: Chromium, Firefox and WebKit

Основные функциональности:
* установка одной командой
* надёжная работа с ожиданиями
* возможность работы с моками
* возможность запускать тесты на нескольких страницах браузера независимо

Playwright используется для написания API тестов и GUI(End-to-End) тестов.

End-to-End тесты - это тесты, которые проверяет весь путь действия пользователя(к примеру от регистрации и до покупки в интернет магазине).

```
// инициализация проекта
npm init playwright

```

промис - объект, который обещает выдать результат работы в будущем.

async await - технология, которая помогает организовать работу с асинхронным кодом в синхронном режиме.

Заготовка  скрипта:

```
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 5000,
    devtools: true
  });
  const page = await browser.newPage();
  await page.goto("https://netology.ru");
  await page.click("text=Каталог курсов");
  await page.pause();

  //assertion
  await browser.close();
})();
```

 npx - упрощенна команда, которая помогает запускать флеймворки, функциональности без их установки 
 npm - позволяет устанавливать необходимые библиотеки

настройки headless режима добавляются в конфиг файле в параметре use 
```
 use: {
    launchOptions: {
      headless: false,
      slowMo: 1000,
      devtools: true
  },
```

```
  npx playwright test                    // Runs the end-to-end tests.
  npx playwright test --ui               // Starts the interactive UI mode.
  npx playwright test --project=chromium // Runs the tests only on Desktop Chrome.
  npx playwright test example            // Runs the tests in a specific file.
  npx playwright test --debug            // Runs the tests in debug mode.
  npx playwright codegen url                // Auto generate tests with Codegen.

We suggest that you begin by typing:

    npx playwright test

```

Основные matchers в Playwright:
```
.toBe            // Проверяет точное равенство значений.
.toEqual         // Проверяет глубокое равенство объектов или массивов.
       expect({ a: 1, b: 2 }).toEqual({ a: 1, b: 2 });
       
.toBeNull        // Проверяет, что значение равно null.
       expect(null).toBeNull();
       
.toBeUndefined   // Проверяет, что значение равно undefined.
       expect(undefined).toBeUndefined();
       
.toBeDefined     // Проверяет, что значение определено (не равно undefined).
       expect(1).toBeDefined();
       
.toBeTruthy      // Проверяет, что значение является "истинным" в логическом контексте.
       expect(1).toBeTruthy();
       
.toBeFalsy       // Проверяет, что значение является "ложным" в логическом контексте.
       expect(0).toBeFalsy();
       
.toBeGreaterThan // Проверяет, что значение больше заданного.
       expect(5).toBeGreaterThan(3);
       
.toBeLessThan    // Проверяет, что значение меньше заданного.
       expect(3).toBeLessThan(5);
       
.toContain      // Проверяет, что массив или строка содержит заданное значение.
       expect([1, 2, 3]).toContain(2);
       
.toMatch        // Проверяет, что строка соответствует заданному регулярному выражению.
       expect('hello').toMatch(/h.*o/);

.toThrow        // Проверяет, что функция выбрасывает исключение.
       expect(() => { throw new Error('error'); }).toThrow();

.toHaveLength   // Проверяет длину массива или строки.
       expect([1, 2, 3]).toHaveLength(3);

.toHaveText     // Проверяет, что элемент содержит заданный текст.
       await expect(page.locator('h1')).toHaveText('Welcome');

.toBeVisible    // Проверяет, что элемент виден.
       await expect(page.locator('button')).toBeVisible();

.toBeHidden     // Проверяет, что элемент скрыт.
       await expect(page.locator('button')).toBeHidden();

.toHaveURL      // Проверяет, что URL страницы соответствует заданному.
       await expect(page).toHaveURL('https://example.com');

```