describe('User can interact with marker on map', () => {
  beforeEach(() => {
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/v1/trails',
      response: 'fixture:gm_map_markers.json',
      status: 200
    })
    cy.get('#navbar')
      .within(() => {
        cy.get('#nav-map').click()
      })
    for(let n = 0; n < 11; n++){
      cy.get('.gm-style > .gmnoprint > .gmnoprint > div > .gm-control-active:nth-child(3)').click()
    }
  })

  it('and see title', () => {
      cy.get('[title="orgrimmar"]').should('exist')
      cy.get('[title="stormwind"]').should('exist')
      cy.get('[title="lordaeron"]').should('exist')
  })
})
