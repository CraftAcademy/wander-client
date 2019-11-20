describe('User can view a specific trail', () => {
  it('successfully', () => {
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/v1/trails/1',
      response: 'fixture:user_can_view_specific_trail.json',
      status: 200
    })
    
    cy.get('#trail-list')
      .within(() => {
        cy.get('#card_1').click()
      })
    cy.get('#specific-trail')
      .within(() => {
        cy.get('#title_1').should('contain', 'Åland lazy trail')
        cy.get('#description_1').should('contain', 'A slow trail for fat people')
        cy.get('#extra_1').should('contain', 'You seem prepared for the chill trail')
        cy.get('#city_1').should('contain', 'Bollmora')
        cy.get('#country_1').should('contain', 'Åland')
        cy.get('#continent_1').should('contain', 'Europe')
        cy.get('#duration_1').should('contain', '5')
        cy.get('#intensity_1').should('contain', '1')
      })
  })

  it('unsuccessfully', () => {
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/v1/trails/1',
      response: 'fixture:user_can_view_specific_trail_unsuccessfully.json',
      status: 400
    })
    cy.get('#trail-list')
      .within(() => {
        cy.get('#card_1').click()
      })
    cy.get('#error-message').should('contain', 'There is no trail here go back.')
  })
})
