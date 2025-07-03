### Puppeteer, ч.1

Что такое Puppeteer - это библиотека, которая была разработана командой Google Chrome Team, и позволяет управлять браузером через JavaScript

Основные возможности Puppeteer:

* Управление браузером: Puppeteer позволяет запускать браузер, открывать страницы и управлять ими через JavaScript. Работа может вестись в нескольких вкладках, при этом каждая вкладка будет работать изолированно друг от друга.
* Автоматизация задач: Вы можете автоматизировать различные задачи, такие как заполнение форм, нажатие на кнопки, загрузка файлов и т.д.
* Тестирование: Puppeteer часто используется для тестирования веб-приложений. Вы можете писать тесты, которые проверяют, что ваш сайт работает корректно.
* Скриншоты и PDF: Puppeteer позволяет делать скриншоты страниц и сохранять их в формате PDF.
* Работа с headless режимом: Puppeteer может работать в headless режиме, что означает, что браузер не отображается на экране, что ускоряет выполнение задач.

Скрипт: 
```
const url = "......";

(async () => {
  // запуск браузера
  const browser = await puppeteer.launch({ headless:false });
  // создание новой страницы
  const page = await browser.newPage();
  // переход по адресу
  await page.goto(url);
  
  // эмуляция размера страницы 
  await page.emulate(puppeteer.KnownDevices["iPhone 13"])
  
  // клик по кнопке
  await page.click("selector");
  
  // пример получения титула страницы
  const title = await page.title();
  console.log(title);
  
  //получение текста из элемента ($ - указывается при выборе элемента, к примеру для клика, а $eval  для получения информации из элемента
  const firstLink = await page.$eval("selector", link => link.textContent);
  console.log(firstLink);
  
  // закрытие страницы и браузера
  await page.close();
  await browser.close();
})();

```
```
1. Методы для навигации 
page.goto(url, options): Переходит на указанную страницу.
page.reload(options): Перезагружает текущую страницу.
page.waitForNavigation(options): Ожидает, пока не будет выполнено событие навигации.

2. Методы для взаимодействия с элементами
page.click(selector): Нажимает на элемент, соответствующий селектору.
page.fill(selector, text): Заполняет текстовое поле.
page.type(selector, text): Вводит текст в поле, симулируя нажатия клавиш.
page.check(selector): Устанавливает флажок.
page.uncheck(selector): Снимает флажок.
page.selectOption(selector, value): Выбирает опцию в выпадающем списке.

3. Методы для ожидания
page.waitForSelector(selector): Ожидает появления элемента на странице.
page.waitForTimeout(ms): Приостанавливает выполнение теста на указанное количество миллисекунд.
page.waitForLoadState(state): Ожидает загрузки страницы до указанного состояния (например, networkidle).

4. Методы для получения данных
page.textContent(selector): Возвращает текст элемента.
page.innerText(selector): Возвращает видимый текст элемента.
page.getAttribute(selector, attribute): Возвращает значение атрибута элемента: const href = await page.getAttribute('a', 'href');

5. Методы для работы с окнами и вкладками
page.waitForPopup(): Ожидает появления нового окна или вкладки.
page.close(): Закрывает текущую страницу.

6. Методы для работы с файлами
page.setInputFiles(selector, filePath): Загружает файл в поле ввода.

7. Методы для работы с событиями
page.on(event, handler): Подписывается на событие:  page.on('console', message => console.log(message.text()));
page.waitForEvent(event): Ожидает наступления события.

8. Методы для работы с локаторами
page.getByRole(role, options): Находит элемент по его роли (например, button, textbox).
page.getByText(text): Находит элемент по его текстовому содержимому:  await page.getByText('Submit').click();
page.getByLabel(text): Находит элемент по его метке:  await page.getByLabel('Email').fill('user@example.com');

9. Методы для работы с ожиданиями
expect(locator).toBeVisible(): Проверяет, что элемент виден: await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
expect(locator).toBeHidden(): Проверяет, что элемент скрыт: await expect(page.getByRole('alert')).toBeHidden();
---
element.offsetParent - возвращает ближайший родительский элемент, который имеет CSS-свойство position, 
отличное от static, или null, если такого элемента нет. Это свойство используется для определения, является ли элемент видимым на странице.

const isVisible = await page.$eval(btnSelector, (element) => element.offsetParent !== null);
expect(isVisible).toBe(true);
---
10. Методы для работы с API
page.route(url, handler): Перехватывает запросы и отвечает на них: 

await page.route('**/api/data', route => {
route.fulfill({ json: { message: 'Hello, World!' } });
});

page.waitForResponse(urlOrPredicate): Ожидает ответа на запрос. 
const response = await page.waitForResponse('**/api/data');
```