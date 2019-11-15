import React, { Component } from 'react'
import { getTrails } from '../Modules/trailsData'
import { Card, Container, Image, Message } from 'semantic-ui-react'
import Sarek from '../Images/sarek.jpg'
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
    let errorMessage = <Message compact id='error-message'>{this.state.errorMessage}</Message>

    if (this.props.currentUser.isSignedIn) {
      welcomeMessage = <Message id="welcome-message">Hello wanderer {this.props.currentUser.attributes.name}</Message>
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
        {welcomeMessage}
        <div className='page'>
          <div className='image-page'>
            {sarek}
            <div className='content-image'>
              <div className='content'>
                <h1>Welcome...</h1>
              </div>
              <div className='content2'>
                <p>Sarek National Park, Sweden</p>
                <p>Taken by Arto Marttinen</p>
              </div>
            </div>
          </div>
        </div>
        <Container id='trail-list'>
          {trailsList}
          {errorMessage}
        </Container>
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