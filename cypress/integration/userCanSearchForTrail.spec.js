describe('User can search for trail', () => {
  it('successfully', () => {
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/v1//search/?search=Bollmora',
      response: 'fixture:successful_search.json',
      status: 200
    })
    cy.get('#navbar')
    .within(() => {
      cy.get('#nav-search')
        .within(() => {
          cy.get('#search-input').type('Bollmora')
          cy.get('#search-submit').click()
        })
    })
    cy.get('#search-results').should('contain', 'Found adventures')
    cy.get('#trail-list')
    cy.get('#trail-list')
    .within(() => {
      cy.get('#trail_1')
        .within(() => {
          cy.get('#title_1').should('contain', 'Bollmora speed trail')
          cy.get('#description_1').should('contain', 'A fast trail for fast people')
          cy.get('#extra_1').should('contain', 'You are not prepared for the speed')
          cy.get('#location_1').should('contain', 'Bollmora')
          cy.get('#duration_1').should('contain', '10 minutes')
          cy.get('#intensity_1').should('contain', '5')
        })
    })
  })
})