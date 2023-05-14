/// <reference types="Cypress" />

describe('Signal Testing', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('url'));
    })
    it('Check If', () => {
        cy.get('[data-testid=button-counter]').should('exist');

        cy.get('[data-testid=if_case_counter_1_true]').should('exist');
        cy.get('[data-testid=button-counter]').as('btn').click();
        cy.get('body').click();
        cy.get('[data-testid=button-counter]').as('btn').click();
        cy.get('[data-testid=if_case_counter_1_true]').should('not.exist');
        cy.get('[data-testid=if_case_counter_1_false]').should('exist');

        cy.get('[data-testid=button-counter]').as('btn').click();
        cy.get('[data-testid=if_case_counter_2]').should('exist');
    })

})