describe('User can interact with map', () => {
  beforeEach(() => {
    cy.route({
      method: 'GET',
      url: 'https://c-wander-api.herokuapp.com/v1/trails',
      response: 'fixture:gm_map_markers.json',
      status: 200
    })
    cy.get('#navbar')
      .within(() => {
        cy.get('#nav-map').click()
      })
  })
  
  it('and see zoom-in and out buttons', () => {
    cy.get('[title="Zoom in"]').should('exist')
    cy.get('[title="Zoom out"]').should('exist')
  })

  it('by zooming-in and out', () => {
    cy.get('.gm-style > .gmnoprint > .gmnoprint:nth-child(1) > div > .gm-control-active:nth-child(1)').click()
    cy.get('.gm-style > .gmnoprint > .gmnoprint:nth-child(1) > div > .gm-control-active:nth-child(1)').click()
    cy.get('.gm-style > .gmnoprint > .gmnoprint > div > .gm-control-active:nth-child(3)').click()
    cy.get('.gm-style > .gmnoprint > .gmnoprint > div > .gm-control-active:nth-child(3)').click()
  })
})
