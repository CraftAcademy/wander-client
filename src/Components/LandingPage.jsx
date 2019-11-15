import React, { Component } from 'react'
import { getTrails } from '../Modules/trailsData'
import { Card, Container, Image, Message } from 'semantic-ui-react'
import Sarek from '../Images/sarek.jpg'
import AsiaJungle from '../Images/asia-jungle.jpg'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

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
    let trailsList, welcomeMessage
    let sarek = <img src={Sarek} id='image' alt='Sarek national park' width='1800' height='800'/>
    let asiaJungle = <img src={AsiaJungle} id='image-jungle' alt='Asia Jungle' width='1800' height='700'/>
    let errorMessage = <div compact id='error-message'>{this.state.errorMessage}</div>

    if (this.props.currentUser.isSignedIn) {
      welcomeMessage = <div id="welcome-message">Hello wanderer {this.props.currentUser.attributes.name}</div>
    }

    if (trailsData.length !== 0) {
      trailsList = (
        <>
          {trailsData.map(trail => {
            return  <NavLink id={`trail_${trail.id}`} key={trail.id} to={`/trails/${trail.id}`}>
                      <Card id={`card_${trail.id}`}>
                        <Image
                          id={`image_${trail.id}`}
                          src={trail.image}
                        />
                        <Card.Header id={`title_${trail.id}`}>{trail.title}</Card.Header>
                        <Card.Description id={`description_${trail.id}`}>{trail.description}</Card.Description>
                        <Card.Description id={`extra_${trail.id}`}>{trail.extra}</Card.Description>
                        <Card.Meta id={`location_${trail.id}`}>{trail.location}</Card.Meta>
                        <Card.Meta id={`duration_${trail.id}`}>{trail.duration}</Card.Meta>
                        <Card.Meta id={`intensity_${trail.id}`}>{trail.intensity}</Card.Meta>
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
          {trailsList}
          {errorMessage}
        </Container>
        <div>
          {asiaJungle}
          <div className='pic-text'>
            <p>Asian Jungle</p>
          </div>
        </div>
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