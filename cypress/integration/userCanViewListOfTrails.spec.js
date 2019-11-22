describe('User can view a list of trails', () => {
  it('successfully', () => {
    cy.get('#trail-list')
      .within(() => {
        cy.get('#trail_1')
          .within(() => {
            cy.get('#title_1').should('contain', 'Bollmora speed trail')
            cy.get('#description_1').should('contain', 'A fast trail for fast')
            cy.get('#city_1').should('contain', 'Bollmora')
            cy.get('#country_1').should('contain', 'Sweden')
            cy.get('#continent_1').should('contain', 'Asia')
            cy.get('#intensity_1').should('contain', '5')
          })
    })
  })

  it('unsuccessfully', () => {
    cy.route({
      method: 'GET',
      url: 'https://c-wander-api.herokuapp.com/v1/trails',
      response: 'fixture:user_can_view_list_of_trails_unsuccessfully.json',
      status: 400
    })
    cy.visit('http://localhost:3001')
    cy.get('#trail-list')
      .within(() => {
        cy.get('#trail_1').should('not.exist')
      })
    cy.get('#error-message').should('contain', 'No trails here, turn around.')
  })
})