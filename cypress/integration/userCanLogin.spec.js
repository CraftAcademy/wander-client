describe('User can log in to application', () => {
  it('successfully', () => {
    cy.server()
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/auth/sign_in',
      response: 'fixture:successful_user_login.json',
      status: 200
    })
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/v1/trails',
      response: 'fixture:user_can_view_list_of_trails.json'
    })

    cy.visit('http://localhost:3001')
    cy.get('#navbar')
      .within(() => {
        cy.get('#nav-login').click()
      })
    cy.get('#login-form').within(() => {
      cy.get('#email-input').type('user@mail.com')
      cy.get('#password-input').type('password')
    })
    cy.get('#submit-login-form').click()
    cy.get('#welcome-message').should('contain', 'Hello user@mail.com')
  })
})