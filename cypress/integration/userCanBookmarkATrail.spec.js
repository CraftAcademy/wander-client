describe('User can bookmark a trail', () => {
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
    cy.get('#bookmark').click()
    cy.get('#navbar')
      .within(() => {
        cy.get('#nav-profile').click()
      })
    cy.get('#bookmark-list')
      .within(() => {
        cy.get('#trail_1')
          .within(() => {
            cy.get('#title_1').should('exist')
          })
      })
  })
})
