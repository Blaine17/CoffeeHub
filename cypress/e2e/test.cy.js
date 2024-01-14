import {ACCESSTIME} from '../../backend/utils/config'
import {REFRESTIME} from '../../backend/utils/config'

const config = require('../../backend/utils/config')


describe('My First Test', () => {

  const username = 'test@test.com'
  const password = 'ThisIsASecurePassword1$'
  const time = config
  
  it('Visits the app root url', () => {
    cy.log(time)
    cy.visit('/')
    cy.get('#tab-button-account').click()
    cy.get('input[name="email"]').type(username)
    cy.get('input[name="password"]').type(password)
    cy.intercept('POST', 'http://localhost:3000/api/login').as('loginRequest');
    cy.get('#login').click()
    cy.wait('@loginRequest').then((x) => {
      // Expect a successful status code
      const cartButton = cy.get('#tab-button-cart')
      cy.wait(6000)
      cartButton.click()
      
    });
    // const cartButton = cy.get('#tab-button-cart')
    // cartButton.click()
    
  })
})