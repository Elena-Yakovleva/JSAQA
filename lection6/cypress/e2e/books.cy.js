import { faker } from "@faker-js/faker";
import { expect } from "chai";

let book;

describe("Books app auth", () => {
  beforeEach("", () => {
    cy.visit("/");
  });

  it("Successful auth in books app", () => {
    cy.login("test@test.com", "test");
    cy.contains("Добро пожаловать test@test.com").should("be.visible");
    cy.contains("Log out").should("be.visible").should("not.be.disabled");
  });

  it("Denial  auth without email", () => {
    cy.login(" ", "test");
    cy.get("#mail")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });

  it("Denial auth without password", () => {
    cy.contains("Log in").click();
    cy.get("#mail").type("test@test.com");
    cy.contains("Submit").click();
    cy.get("#pass")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });

  it("Denial auth with erroneous email", () => {
    cy.visit("/");
    cy.login("tes@test.com", "1234");
    cy.contains("Неправильая почта или пароль").should("be.visible");
  });

  it("Denial auth with erroneous password", () => {
    cy.visit("/");
    cy.login("test@test.com", "1234");
    cy.contains("Неправильая почта или пароль").should("be.visible");
  });
});

describe("Books app", () => {
  beforeEach("", () => {
    cy.visit("/");
    cy.login("test@test.com", "test");

    book = {
      title: faker.lorem.words(3),
      author: faker.name.fullName(),
    };
  });

  it("Сreating book and adding to favorites", () => {
    cy.createBookToFavorite(book.title, book.author);
    cy.contains(book.title).should("be.visible");
    cy.visit("/favorites");
    cy.contains(book.title).should("be.visible");
  });

  it("Create book", () => {
    cy.createBook(book.title, book.author);
    cy.contains(book.title).should("be.visible");
  });

  it("Adding created book from list to favorites", () => {
    cy.createBook(book.title, book.author);
    cy.contains(book.title).should("be.visible");
    cy.get(".btn-success").last().click();
    cy.visit("/favorites");
    cy.contains(book.title).should("be.visible");
  });

  it("Deleting book from favorites", () => {
    let deleteBookTitle;
    cy.visit("/favorites");
    cy.get(".card-body > .card-title")
      .last()
      .invoke("text")
      .then((text) => {
        deleteBookTitle = text;
        cy.get(".card-body + .card-footer")
          .last()
          .click();
        cy.wait(500);
        cy.contains(deleteBookTitle).should("not.exist");
      });

  });


});
