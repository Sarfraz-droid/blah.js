/// <reference types="Cypress" />

describe('Open', () => {
  it('Initial', () => {
    cy.visit(Cypress.env("url"));
  })
})