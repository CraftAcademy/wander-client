describe('User can logout', () => {
  it('successfully', () => {
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/auth/sign_in',
      response: 'fixture:successful_user_login.json',
      status: 200
    })
    cy.route({
      method: 'DELETE',
      url: 'http://localhost:3000/auth/sign_out',
      response: 'fixture:successful_user_logout.json',
      status: 200
    })
    cy.get('#navbar')
      .within(() => {
        cy.get('#nav-login').click()
      })
    cy.get('#login-form')
      .within(() => {
        cy.get('#email-input').type('user@mail.com')
        cy.get('#password-input').type('password')
      })
    cy.get('#submit-login-form').click()

    cy.get('#nav-logout').click()
    cy.get('#nav-logout').should('not.exist')
    cy.get('#nav-login').should('exist')
  })
})
