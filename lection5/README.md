#### Примеры использования:
Вот несколько примеров использования основных методов Puppeteer:

**Открытие страницы и сохранение скриншота**
```

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();

```

**Взаимодействие с формой**

```

await page.type('#username', 'testuser');
await page.click('.submit-button');
```


**Ожидание загрузки элементов**

```

await page.waitForSelector('.loading-indicator', { hidden: true });

```
#### Cucumber

**Cucumber** — это инструмент тестирования поведения программного обеспечения, основанный на подходе BDD (Behavior Driven Development). Cucumber позволяет писать тесты на понятном человеческом языке, используя специальные сценарии («features») и шаги («steps»).

Основные методы в Cucumber
Основные методы связаны с синтаксисом написания шагов сценария тестов:

**Given**
Используется для описания начального состояния системы перед выполнением теста. Например:

```
Given("Пользователь авторизован") do
  # Код для авторизации пользователя
end
```

**When**
Определяет конкретные действия, выполняемые системой. Например:

```
When("Пользователь вводит корректные данные") do
  # Код для ввода данных
end

```

**Then**
Проверяет ожидаемый результат действий. Используется для утверждения правильности результата. Например:

```
Then("Пользователь видит страницу профиля") do
  expect(page).to have_content('Профиль')
end
```

**And/But**
Позволяют добавлять дополнительные условия или действия в сценарий. Это удобно, когда нужно объединить несколько похожих шагов. Например:

``
And("У пользователя заполнены личные данные")
или
But("Заполнено не всё обязательное поле")
````

Эти ключевые слова помогают структурировать тестовые сценарии таким образом, чтобы их легко было читать и понимать людям вне разработки (например, менеджерам проектов, аналитикам).
