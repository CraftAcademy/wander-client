describe('User can create a trail', () => {
  beforeEach(() => {
    cy.route({
      method: 'POST',
      url: 'https://c-wander-api.herokuapp.com/auth/sign_in',
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
      url: 'https://c-wander-api.herokuapp.com/v1/trails',
      response: 'fixture:successfully_created_trail.json',
      status: 200
    })
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/v1/trails/1',
      response: 'fixture:successfully_view_created_trail.json',
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
        cy.get('#rating').should('contain', 'Intensity: 4')
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
    cy.get('#specific-trail')
      .within(() => {
        cy.get('#title_1').should('contain', 'Höga Kusten trail')
        cy.get('#description_1').should('contain', 'Sweden’s only long-distance coastal trail passes through a land that is still rising.')
        cy.get('#extra_1').should('contain', 'Located close to the E4 highway, it’s also easy to access by car.')
        cy.get('#city_1').should('contain', 'Hornöberget')
        cy.get('#country_1').should('contain', 'Sweden')
        cy.get('#continent_1').should('contain', 'Europe')
        cy.get('#duration_1').should('contain', '600')
        cy.get('#intensity_1').should('contain', '4')
      })
  })

  it('unsuccessfully creates a trail', () => {
    cy.route({
      method: 'POST',
      url: 'https://c-wander-api.herokuapp.com/v1/trails',
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
        cy.get('#rating').should('contain', 'Intensity: 4')
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