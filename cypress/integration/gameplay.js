/// <reference types="Cypress" />

import chaiColors from 'chai-colors'
chai.use(chaiColors)

describe('Gameplay', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('has 42 cells in 7 columns', () => {
    cy.get('[data-column]').should('have.length', 7)
    cy.get('[data-cell]').should('have.length', 42)
  })

  it('puts a red piece in the first column I click', () => {
    cy.get('[data-cell="2-5"]')
      .should('have.css', 'background-color')
      .and('be.colored', '#ffffff')

    cy.get('[data-column="2"]').click()

    cy.get('[data-cell="2-5"]')
      .should('have.css', 'background-color')
      .and('be.colored', 'red')
    cy.get('[data-cell="1-5"]')
      .should('have.css', 'background-color')
      .and('be.colored', '#ffffff')
    cy.get('[data-cell="1-4"]')
      .should('have.css', 'background-color')
      .and('be.colored', '#ffffff')
  })

  it('places alternating red and yellow pieces if I keep clicking on a column', () => {
    cy.get('[data-column="1"]').click()
    cy.get('[data-column="1"]').click()
    cy.get('[data-column="1"]').click()
    cy.get('[data-column="1"]').click()
    cy.get('[data-column="1"]').click()
    cy.get('[data-column="1"]').click()

    cy.get('[data-cell="1-5"]')
      .should('have.css', 'background-color')
      .and('be.colored', 'red')
    cy.get('[data-cell="1-4"]')
      .should('have.css', 'background-color')
      .and('be.colored', 'yellow')
    cy.get('[data-cell="1-3"]')
      .should('have.css', 'background-color')
      .and('be.colored', 'red')
    cy.get('[data-cell="1-2"]')
      .should('have.css', 'background-color')
      .and('be.colored', 'yellow')
    cy.get('[data-cell="1-1"]')
      .should('have.css', 'background-color')
      .and('be.colored', 'red')
    cy.get('[data-cell="1-0"]')
      .should('have.css', 'background-color')
      .and('be.colored', 'yellow')
  })
})
