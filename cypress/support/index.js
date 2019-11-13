import './commands'
beforeEach(() => {
  cy.server()
  cy.route({
    method: 'GET',
    url: 'http://localhost:3000/v1/trails',
    response: 'fixture:user_can_view_list_of_trails.json'
  })
  cy.visit('http://localhost:3001')
}) 