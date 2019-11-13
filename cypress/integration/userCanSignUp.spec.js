describe('User can sign up to application', () => {
  it('successfully', () => {
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/auth/sign_up',
      response: 'fixture:successful_user_signup.json',
      status: 200
    })
    cy.get('#navbar')
      .within(() => {
        cy.get('#nav-login').click()
      })
    cy.get('#register').click()
    
    cy.get('#signup-form')
      .within(() => {
        cy.get('#email-input').type('newuser@mail.com')
        cy.get('#name-input').type('new name')
        cy.get('#password-input').type('password')
        cy.get('#password-confirmation-input').type('password')
      })
    cy.get('#submit-signup-form').click()
    cy.get('#welcome-message').should('contain', 'Hello wanderer new name')
  })
})

describe('User can not sign up to application', () => {
  it('with invalid password credentials', () => {
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/auth/sign_up',
      response: 'fixture:unsuccessful_user_signup.json',
      status: 401
    })
    cy.get('#navbar')
      .within(() => {
        cy.get('#nav-login').click()
        })
    cy.get('#register').click()

    cy.get('#signup-form')
      .within(() => {
        cy.get('#email-input').type('newuser@mail.com')
        cy.get('#name-input').type('new name')
        cy.get('#password-input').type('wrongpassword')
        cy.get('#password-confirmation-input').type('password')
    })
    cy.get('#submit-signup-form').click()
    cy.get('#error-message').should('contain', "Password confirmation doesn't match Password")
  })
})