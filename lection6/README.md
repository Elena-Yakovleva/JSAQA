### Cypress, ч.1

**Установка**

```
npm init
---
npm i cypress
или  
npm install cypress@9.4.1  //@ позволяет установить определенную версию пакета
```

**Первый запуск устанавливает конфигурационные файлы**

```
npx cypress open
```
**Методы**
```
//Переход на страницу 
cy.visit("...")

//Поиск по селектору
cy.get('.my-selector')
cy.get('#main-content')

//Поиск по тексту
cy.get('.main').contains('New Post')

//Тип
cy.type(text)
cy.type(text, options)
cy.get('input').type('Hello, World') 

//Установка таймаута
cy.get('.my-slow-selector', { timeout: 10000 })

//Утверждение
cy.get(':checkbox').should('be.disabled')
cy.get('form').should('have.class', 'form-horizontal')
cy.get('input').should('not.have.value', 'US')

//Другое 

.then() принимает в качетсве аргумента функцию обратного вызова

.click() - Кликнуть по выбранному эдементу
.blur()- Размыть сфокусированный элемент DOM.
.focus()- Сосредоточьтесь на элементе DOM.
.clear()- Очистить значение поля ввода или текстовой области.
.check()- Установите флажки или переключатели.
.uncheck()- Снимите флажки.
.select()- Выберите <option>в пределах <select>.
.dblclick()- Дважды щелкните элемент DOM.
.rightclick()- Щелкните правой кнопкой мыши элемент DOM.
```