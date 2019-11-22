describe('User can', () => {
  beforeEach(() => {
    cy.route({
      method: 'POST',
      url: 'https://c-wander-api.herokuapp.com/auth/sign_in',
      response: 'fixture:successful_user_login.json',
      status: 200
    })
    cy.get('#navbar').within(() => {
      cy.get('#nav-login').click()
    })
    cy.get('#login-form').within(() => {
      cy.get('#email-input').type('user@mail.com')
      cy.get('#password-input').type('password')
    })
    cy.get('#submit-login-form').click()
    cy.get('#welcome-message').should('contain', 'Hello wanderer name')

    cy.route({
      method: 'GET',
      url: 'https://c-wander-api.herokuapp.com/v1/trails/1',
      response: 'fixture:user_can_view_specific_trail.json',
      status: 200
    })
    cy.route({
      method: 'GET',
      url: 'https://c-wander-api.herokuapp.com/v1/bookmarks',
      response: 'fixture:bookmark.json',
      status: 200
    })
  })

  it('like a trail', () => {
    cy.route({
      method: 'POST',
      url: 'https://c-wander-api.herokuapp.com/v1/likes',
      response: 'fixture:create_like.json',
      status: 200
    })

    cy.get('#trail-list').within(() => {
      cy.get('#card_1').click()
    })

    cy.get('#specific-trail').within(() => {
      cy.get('#like-button').click()
      cy.get('#like-counter').should('contain', 1)
    })
  })

  it('unlike a trail', () => {
    cy.route({
      method: 'POST',
      url: 'https://c-wander-api.herokuapp.com/v1/likes',
      response: 'fixture:create_like.json',
      status: 200
    })
    cy.route({
      method: 'DELETE',
      url: 'https://c-wander-api.herokuapp.com/v1/likes/1',
      response: 'fixture:destroy_like.json',
      status: 200
    })

    cy.get('#trail-list').within(() => {
      cy.get('#card_1').click()
    })

    cy.get('#specific-trail').within(() => {
      cy.get('#like-button').click()
      cy.get('#like-counter').should('contain', 1)
      cy.get('#like-button').click()
      cy.get('#like-counter').should('contain', 0)
     
    })
  })
})
