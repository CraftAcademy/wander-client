describe('User can view a specific trail', () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/v1/trails',
      response: 'fixture:user_can_view_list_of_trails.json',
      status: 200
    })
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/v1/trails/1',
      response: 'fixture:user_can_view_specific_trail.json',
      status: 200
    })
    cy.visit('http://localhost:3001')
  })
  
  it('successfully', () => {
    cy.get('#trail-list')
      .within(() => {
        cy.get('#card_1').click()
      })
    cy.get('#single-trail')
      .within(() => {
        cy.get('#title_1').should('contain', 'Åland lazy trail')
        cy.get('#description_1').should('contain', 'A slow trail for fat people')
        cy.get('#extra_1').should('contain', 'You seem prepared for the chill trail')
        cy.get('#location_1').should('contain', 'Åland')
        cy.get('#duration_1').should('contain', '5')
        cy.get('#intensity_1').should('contain', '1')
      })
  })
})
