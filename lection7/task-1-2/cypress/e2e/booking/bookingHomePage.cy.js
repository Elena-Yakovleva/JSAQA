const home = require("../../selectors/booking/bookingHome.json")

describe("Successful page loading", () => {
    
  it("Successful home page loading", () => {
    cy
      .visit("client/index.php");
    cy
      .title()
      .should("eq", "ИдёмВКино");
    cy
      .contains("Идём")
      .should("be.visible");
    cy
      .get(home.pageNav)
      .should("be.visible");
    cy
      .get(home.movie)
      .should("be.visible");
  });
});
