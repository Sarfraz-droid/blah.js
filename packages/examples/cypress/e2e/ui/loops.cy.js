/// <reference types="Cypress" />

describe('Signal Testing', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('url'));
    })
    it('Check Loop', () => {
        cy.get("[data-testid=loop-item]").should('have.length',1);
        cy.get("[data-testid=button-add]").as('btn').click();
        cy.get("[data-testid=loop-item]").should('have.length', 2);
        cy.get("[data-testid=button-add]").as('btn').click();
        cy.get("[data-testid=loop-item]").should('have.length', 3);
        cy.get("[data-testid=button-remove]").as('btn').click();
        cy.get("[data-testid=loop-item]").should('have.length', 2);
        cy.get("[data-testid=button-add]").as('btn').click();
        cy.get("[data-testid=loop-item]").should('have.length', 3);

    })

})