// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

import { expect } from "chai";

// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => { 
    cy.contains("Log in").click();
    cy.get("#mail").type(email);
    cy.get("#pass").type(password);
    cy.contains("Submit").click();
})
Cypress.Commands.add("createBook", (title, authors) => {
  cy.contains("Add new").should("be.visible").click();
  cy.contains("Book description").should("be.visible");
  cy.get("#title").type(title);
  cy.get("#authors").type(authors);
  cy.contains("Submit").should("be.visible").should("not.be.disabled").click();
});

Cypress.Commands.add("createBookToFavorite", (title, authors) => {
  cy.contains("Add new").should("be.visible").click();
  cy.contains("Book description").should("be.visible");
  cy.get("#title").type(title);
  cy.get("#authors").type(authors);
  cy.get("#favorite").click();
  cy.contains("Submit").should("be.visible").should("not.be.disabled").click();
});

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })