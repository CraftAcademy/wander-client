describe('User can bookmark a trail', () => {
  it('successfully', () => {
    cy.route({
      method: 'GET',
      url: 'https://c-wander-api.herokuapp.com/v1/trails/1',
      response: 'fixture:user_can_view_specific_trail.json',
      status: 200
    })
    cy.route({
      method: 'POST',
      url: 'https://c-wander-api.herokuapp.com/auth/sign_in',
      response: 'fixture:successful_user_login.json',
      status: 200
    })
    
    cy.route({
      method: 'POST',
      url: 'https://c-wander-api.herokuapp.com/v1/bookmarks',
      response: 'fixture:saved_trail_to_your_bookmarks.json',
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
    
    cy.get('.trail-list')
      .within(() => {
        cy.get('#card_1').click()
      })

    cy.get('#bookmark').click()

    cy.get('#response-message').should('contain', 'Saved trail to your bookmarks!' )

    cy.route({
      method: 'GET',
      url: 'https://c-wander-api.herokuapp.com/v1/bookmarks',
      response: 'fixture:bookmark.json',
      status: 200
    })

    cy.get('#navbar')
      .within(() => {
        cy.get('#nav-profile').click()
      })
    
    cy.get('#bookmark-list')
      .within(() => {
        cy.get('#card_1')
          .within(() => {
            cy.get('#title_1').should('exist')
          })
      })
  })
})
