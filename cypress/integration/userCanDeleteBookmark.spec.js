describe('User can delete bookmark on profile page', () => {
  it('succesfully', () => {
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/v1/trails/1',
      response: 'fixture:user_can_view_specific_trail.json',
      status: 200
    })
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/auth/sign_in',
      response: 'fixture:successful_user_login.json',
      status: 200
    })
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/v1/bookmarks',
      response: 'fixture:bookmark.json',
      status: 200
    })
    cy.route({
      method: 'DELETE',
      url: 'http://localhost:3000/v1/bookmarks/1',
      response: 'fixture:removed_bookmark.json',
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
    cy.get('#welcome-message').should('contain', 'Hello wanderer name')

    cy.get('#navbar').click()
      .within(() => {
        cy.get('#nav-profile').click()
      })

    cy.get('#bookmark-list')
      .within(() => {
        cy.get('#card_1')
          .within(() => {
            cy.get('#delete-button').click()
        })
      });

    cy.get('#response-message').should('contain', 'Removed bookmark!')
    
  })
})
