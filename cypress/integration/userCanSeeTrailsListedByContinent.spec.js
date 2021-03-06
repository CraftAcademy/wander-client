describe('User can see trails listed by continent', () => {
  it('successfully', () => {
    cy.route({
      method: 'GET',
      url: 'https://c-wander-api.herokuapp.com/v1/trails?continent=Europe',
      response: 'fixture:user_can_see_trails_listed_by_continent.json',
      status: 200
    })
    cy.get('#eu-button').click()
    cy.get('#trail-list')
    .within(() => {
      cy.get('#trail_1')
        .within(() => {
          cy.get('#title_1').should('contain', 'Bollmora speed trail')
          cy.get('#description_1').should('contain', 'A fast trail')
          cy.get('#city_1').should('contain', 'Bollmora')
          cy.get('#country_1').should('contain', 'Sweden')
          cy.get('#continent_1').should('contain', 'Europe')
          cy.get('#intensity_1').should('contain', '5')
        })
        cy.get('#trail_5')
        .within(() => {
          cy.get('#title_5').should('contain', 'Tyresö Flaten to Gammelström')
          cy.get('#description_5').should('contain', 'A short trail')
          cy.get('#city_5').should('contain', 'Tyresö')
          cy.get('#country_5').should('contain', 'Sweden')
          cy.get('#continent_5').should('contain', 'Europe')
          cy.get('#intensity_5').should('contain', '2')
        })
    })
  })

  it('unsuccessfully', () => {
    cy.route({
      method: 'GET',
      url: 'https://c-wander-api.herokuapp.com/v1/trails?continent=Asia',
      response: 'fixture:user_can_view_list_of_trails_unsuccessfully.json',
      status: 400
    })
    cy.get('#asian-button').click()
    cy.get('#trail-list')
      .within(() => {
        cy.get('#trail_1').should('not.exist')
      })
    cy.get('#error-message').should('contain', 'No trails here, turn around.')
  })
})
