describe('User can create a trail', () => {
  beforeEach(() => {
    cy.server()
    cy.visit('http://localhost:3001')
  })

  it('successully creates a trail', () => {
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/v1/trails',
      response: 'fixture:successfully_created_trail.json',
      status: 200
    })

    cy.get('#trail-form').within(() => {
      cy.get('#title-input').type('Höga Kusten trail')
      cy.get('#description-input').type('Sweden’s only long-distance coastal trail passes through a land that is still rising: getting higher by nearly one centimetre per year – the land here has risen some 300 metres since the ice age.')
      cy.get('#extra-input').type('Located close to the E4 highway, it’s also easy to access by car.')
      cy.get('#location-input').type('Hornöberget')
      cy.get('#duration-input').type('600')
      cy.get('#intensity-rating').select('4')
      cy.get('#submit-trail').click()
    })
    cy.get('#response-message').should('contain', 'Trail was successfully created')
  })

  it('unsuccessfully creates a trail', () => {
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/v1/trails',
      response: 'fixture:cannot_create_trail.json',
      status: 400
    })

    cy.get('#trail-form').within(() => {
      cy.get('#title-input').type('Höga Kusten trail')
      cy.get('#description-input').type('Sweden')
      cy.get('#extra-input').type('Located close to the E4 highway, it’s also easy to access by car.')
      cy.get('#location-input').type('Hornöberget')
      cy.get('#duration-input').type('600')
      cy.get('#intensity-rating').type('4')
      cy.get('#submit-trail').click()
    })
    cy.get('#response-message').should('contain', 'Description is too short (minimum is 15 characters)')
  })
})