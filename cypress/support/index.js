import './commands'
beforeEach(() => {
  cy.server()
  cy.route({
    method: 'GET',
    url: 'https://c-wander-api.herokuapp.com/v1/trails',
    response: 'fixture:user_can_view_list_of_trails.json'
  })
  cy.visit('http://localhost:3001')
}) 