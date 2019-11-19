describe('User can create a trail', () => {
  beforeEach(() => {
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/auth/sign_in',
      response: 'fixture:successful_user_login.json',
      status: 200
    })
    cy.get('#navbar')
      .within(() => {
        cy.get('#nav-login').click()
      })
    cy.get('#login-form')
      .within(() => {
        cy.get('#email-input').type('user@mail.com')
        cy.get('#password-input').type('password')
      })
    cy.get('#submit-login-form').click()
    cy.get('#welcome-message').should('contain', 'Hello wanderer name')

    cy.get('#navbar')
    .within(() => {
      cy.get('#nav-create').click()
    })
  });
  
  it('successully creates a trail', () => {
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/v1/trails',
      response: 'fixture:successfully_created_trail.json',
      status: 200
    })
    
    cy.get('#trail-form')
      .within(() => {
        cy.get('#title-input').type('Höga Kusten trail')
        cy.get('#description-input').type('Sweden’s only long-distance coastal trail passes through a land that is still rising.')
        cy.get('#extra-input').type('Located close to the E4 highway, it’s also easy to access by car.')
        cy.get('#city-input').type('Hornöberget')
        cy.get('#country-input').type('Sweden')
        cy.get('#continent-input').select('Europe')
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
        cy.get('.gm-style').click(800, 600)
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

    cy.get('#trail-form')
      .within(() => {
        cy.get('#title-input').type('Höga Kusten trail')
        cy.get('#description-input').type('Sweden')
        cy.get('#extra-input').type('Located close to the E4 highway, it’s also easy to access by car.')
        cy.get('#city-input').type('Hornöberget')
        cy.get('#country-input').type('Sweden')
        cy.get('#continent-input').select('Europe')
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
        cy.get('.gm-style').click(800, 600)
        cy.get('#submit-trail').click()
      }
    )
    cy.get('#error-message').should('contain', 'Please add more content')
  })
})