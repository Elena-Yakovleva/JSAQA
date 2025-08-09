const homepage = require("../../selectors/admin/adminAuthPage.json")

describe('Home page', () => {
  it("Successful page loading", () => {
    cy
      .visit("/admin");
    cy
      .title()
      .should("eq", "ИдёмВКино");
    cy
      .get(homepage.loginTitle)
      .should("be.visible")
      .should("have.text", "Авторизация");
    cy
      .get(homepage.loginWrapper)
      .should("be.visible");
    cy
      .get(homepage.loginButton)
      .should("be.visible");
  });
})