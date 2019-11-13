describe('User can create a trail', () => {
  beforeEach(() => {
    cy.server()
    cy.visit('http://localhost:3001/create')
  })

  it('successully creates a trail', () => {
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/v1/trails',
      response: 'fixture:successfully_created_trail.json',
      status: 200
    })

    cy.get('#navbar')
    .within(() => {
      cy.get('#nav-create').click()
    })
    cy.get('#trail-form')
      .within(() => {
        cy.get('#title-input').type('Höga Kusten trail')
        cy.get('#description-input').type('Sweden’s only long-distance coastal trail passes through a land that is still rising.')
        cy.get('#extra-input').type('Located close to the E4 highway, it’s also easy to access by car.')
        cy.get('#location-input').type('Hornöberget')
        cy.get('#duration-input').type('600')
        cy.get('input[type=range]').invoke('val', 4).trigger('input')
        cy.get('#rating').should('contain', 'Rating: 4')
        cy.get('.file-input')
          .within(() => {
            const fileName = 'love.jpg'
            cy.fixture(fileName).then(fileContent => {
              cy.get('input[type="file"]').upload({ fileContent, fileName, mimeType: 'application/jpg' })
            })
          })
        cy.get('#submit-trail').click()
      }
    )
    cy.get('#response-message').should('contain', 'Trail was successfully created')
  })

  it('unsuccessfully creates a trail', () => {
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/v1/trails',
      response: 'fixture:cannot_create_trail.json',
      status: 400
    })

    cy.get('#navbar')
    .within(() => {
      cy.get('#nav-create').click()
    })
    cy.get('#trail-form')
      .within(() => {
        cy.get('#title-input').type('Höga Kusten trail')
        cy.get('#description-input').type('Sweden')
        cy.get('#extra-input').type('Located close to the E4 highway, it’s also easy to access by car.')
        cy.get('#location-input').type('Hornöberget')
        cy.get('#duration-input').type('600')
        cy.get('input[type=range]').invoke('val', 4).trigger('input')
        cy.get('#rating').should('contain', 'Rating: 4')
        cy.get('.file-input')
          .within(() => {
            const fileName = 'love.jpg'
            cy.fixture(fileName).then(fileContent => {
              cy.get('input[type="file"]').upload({ fileContent, fileName, mimeType: 'application/jpg' })
            })
          })
        cy.get('#submit-trail').click()
      }
    )
    cy.get('#error-message').should('contain', 'Please add more content')
  })
})