const user = require("../../fixtures/adminConfig.json");
const wrongLogin = require("../../fixtures/wrong_login.json");
const wrongPass = require("../../fixtures/wrong_pass.json");
const authSelectors = require("../../selectors/admin/authForm.json");

describe("Authorization", () => {
    beforeEach(() => {
      cy
        .visit("/admin");
      cy
        .title().should("eq", "ИдёмВКино");

    })
    it("Successful auth", () => {
      cy
        .get(authSelectors.email)
        .type(user.email);
      cy
        .get(authSelectors.pass)
        .type(user.password);
      cy
        .get(authSelectors.button)
        .click();
      cy
        .visit("admin/index.php"); 
    });

    it("Denial  auth with  incorrect username", () => {
      cy
        .get(authSelectors.email)
        .type(wrongLogin.email);
      cy
        .get(authSelectors.pass)
        .type(wrongLogin.password);
      cy
        .get(authSelectors.button)
        .click();
      cy
        .url()
        .should(
        "eq",
        "http://qamid.tmweb.ru/admin/scripts/authorization.php"
      );
      cy
        .contains("Ошибка авторизации!")
        .should("be.visible");
    });

    it("Denial  auth with  incorrect user password", () => {
      cy
        .get(authSelectors.email)
        .type(wrongPass.email);
      cy
        .get(authSelectors.pass)
        .type(wrongPass.password);
      cy
        .get(authSelectors.button)
        .click();
      cy
        .url()
        .should(
        "eq",
        "http://qamid.tmweb.ru/admin/scripts/authorization.php"
      );
      cy
        .contains("Ошибка авторизации!")
        .should("be.visible");
    });

    it("Refusal  submit empty form", () => {
      cy
        .get(authSelectors.button)
        .click();
      cy
        .url()
        .should("eq", "http://qamid.tmweb.ru/admin/");
      //cy.contains("Заполните это поле.").should("be.visible");
    });

   

});