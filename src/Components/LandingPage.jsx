import React, { Component } from 'react'
import { getTrails } from '../Modules/trailsData'
import { Card, Container, Image, Grid, Message } from 'semantic-ui-react'
import Sarek from '../Images/sarek.jpg'
import AsiaJungle from '../Images/asia-jungle.jpg'
import YellowStone from '../Images/yellowstone.jpg'
import BasteiBridge from '../Images/bastei-bridge.jpg'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import Footer from './Footer'

class LandingPage extends Component {
  state = {
    trails: [],
    errorMessage: null
  }

  async componentDidMount() {
    let response = await getTrails()
    if (response.error_message) {
      this.setState({
        errorMessage: response.error_message
      })
    } else {
      this.setState({
        trails: response
      })
    }
  }

  render() {
    let trailsData = this.state.trails
    let trailsList, welcomeMessage, errorMessage
    let sarek = <img src={Sarek} id='image' alt='Sarek national park' width='1800' height='800'/>
    let asiaJungle = <img src={AsiaJungle} id='image' alt='Asia Jungle' width='1800' height='750'/>
    let yellowstone = <img src={YellowStone} id='image' alt='Yellowstone' width='1950' height='800'/>
    let basteiBridge = <img src={BasteiBridge} id='image' alt='Bastei Bridge' width='1950' height='800' />

    if (this.props.currentUser.isSignedIn) {
      welcomeMessage = 
      <div id="welcome-message">Hello wanderer {this.props.currentUser.attributes.name}</div>
    }

    if (this.state.errorMessage) {
      errorMessage = <Message negative compact id="error-message">{this.state.errorMessage}</Message>
    }

    if (trailsData.length !== 0) {
      trailsList = (
        <>
          {trailsData.map(trail => {
            let trim_ingress = trail.description.substr(0, 75)
            let ingress = trim_ingress.substr(0, Math.min(trim_ingress.length, trim_ingress.lastIndexOf(" "))) + ' ...'            
            return  <NavLink id={`trail_${trail.id}`} key={trail.id} to={`/trails/${trail.id}`}>
                      <Card id={`card_${trail.id}`}>
                        <Image
                          id={`image_${trail.id}`}
                          src={trail.image}
                        />
                        <Card.Header id={`title_${trail.id}`}>{trail.title}</Card.Header>
                        <Card.Description id={`description_${trail.id}`}>Description:  {ingress}</Card.Description>
                        <Card.Description id={`extra_${trail.id}`}>Good to Know:  {trail.extra}</Card.Description>
                        <Card.Meta id={`location_${trail.id}`}>Location:  {trail.location}</Card.Meta>
                        <Card.Meta id={`continent_${trail.id}`}>Continent:  {trail.continent}</Card.Meta>
                        <Card.Meta id={`duration_${trail.id}`}>Duration:  {trail.duration} min</Card.Meta>
                        <Card.Meta id={`intensity_${trail.id}`}>Intensity Level:  {trail.intensity}</Card.Meta>
                      </Card>
                    </NavLink>
          })}
        </>
      )
    }

    return (
      <>
        <div className='page'>
          <div className='image-page'>
            {sarek}
            <div className='content-image'>
              <div className='content'>
                <h1>{welcomeMessage}</h1>
              </div>
              <div className='content2'>
                <p>Sarek National Park, Sweden</p>
              </div>
            </div>
          </div>
        </div>
        <Container id='trail-list'>
          <Grid centered container columns={3}>
            <Grid.Row>
              {trailsList}
              {errorMessage}
            </Grid.Row>
          </Grid>
          
        </Container>
      <div className='asia-page'>
        <div className='asia-image'>
          {asiaJungle}
            <div className='asia-image-content'>
              <div className='asia-content-name'>
                <p>Asian Jungle</p>
              </div>
              <div className='asia-content-button'>
                <button id='asian-button'>
                  <div className='asian-button-text'>
                    Explore Asia
                  </div>
            </button>
              </div>
            </div>
        </div>
      </div>

      <Container>
        <div id='content-blurb'>
          <label id='content-label'>Explore Jeff</label>
          <br />
          <br />
          <p>Hello My Name Jeff I like Hello My Name Jeff I like 
          Hello My Name Jeff I like 
          Hello My Name Jeff I like 
          Hello My Name Jeff I like 
          Hello My Name Jeff I like 
          Hello My Name Jeff I like 
          Hello My Name Jeff I like 
          Hello My Name Jeff I like 
          Hello My Name Jeff I like 
          Hello My Name Jeff I like 
          Hello My Name Jeff I like 
          Hello My Name Jeff I like 
          Hello My Name Jeff I like 
          Hello My Name Jeff I like 
          Hello My Name Jeff I like 
          Hello My Name Jeff I like 
          Hello My Name Jeff I like 
          </p>
        </div>
      </Container>

      <div className='na-page'>
        <div className='na-image'>
          {yellowstone}
            <div className='na-image-content'>
              <div className='na-content-name'>
                <p>Yellowstone National Park, U.S.A</p>
              </div>
              <div className='na-content-button'>
                <button id='na-button'>
                  <div className='na-button-text'>
                    Explore North America
                  </div>
                </button>
              </div>
            </div>
        </div>
      </div>

      <Container>
        <div id='content-blurb'>
          <label id='content-label'>Explore Jeff</label>
          <br />
          <br />
          <p>Hello My Name Jeff I like </p>
        </div>
      </Container>

      <div className='eu-page'>
        <div className='eu-image'>
          {basteiBridge}
            <div className='eu-image-content'>
              <div className='eu-content-name'>
                <p>Bastei Bridge, Switzerland / Germany</p>
              </div>
              <div className='eu-content-button'>
                <button id='eu-button'>
                  <div className='eu-button-text'>
                    Explore Europe
                  </div>
                </button>
              </div>
            </div>
        </div>
      </div>

      <Container>
        <div id='content-blurb'>
          <label id='content-label'>Explore Jeff</label>
          <br />
          <br />
          <p>Hello My Name Jeff I like </p>
        </div>
      </Container>
        <Footer />
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  }
}

export default connect(
  mapStateToProps
)(LandingPage)