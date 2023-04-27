/// <reference types="Cypress" />

describe('Signal Testing', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('url'));
    })
    it('Check Name', () => {
        cy.get('[data-testid=display-name]').contains('Your Name')

        cy.get('[data-testid=input-name]').clear();
        cy.get('[data-testid=input-name]').type('Sarfraz Alam')

        cy.get('[data-testid=display-name]').contains('Sarfraz Alam');
    })

    it('Button Testing', () => {
        cy.get('[data-testid=button-counter]').contains('0');
        cy.get('[data-testid=button-counter]').click();
        cy.get('[data-testid=button-counter]').contains('1');
    });
})