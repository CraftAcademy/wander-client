import React, { Component } from 'react'
import { getTrails } from '../Modules/trailsData'
import { Card, Container, Image } from 'semantic-ui-react'
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
    let sarek = <img src={Sarek} alt='Sarek national park' width='1920' height='1080'/>
    let errorMessage = <p id='error-message'>{this.state.errorMessage}</p>

    if (this.props.currentUser.isSignedIn) {
      welcomeMessage = <h3 id="welcome-message">Hello wanderer {this.props.currentUser.attributes.name}</h3>
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
        {sarek}
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