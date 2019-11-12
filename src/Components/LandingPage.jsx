import React, { Component } from 'react'
import { getTrails } from '../Modules/TrailsData'
import { Card, Container } from 'semantic-ui-react'

class LandingPage extends Component {
  state = {
    trails: [],
    errorMessage: null
  }

  componentDidMount() {
    this.getTrailsData()
  }

  setErrorMessage = (error) => {
    this.setState({
      errorMessage: error
    })
  }

  async getTrailsData() {
    let fetch = await getTrails()
    if (fetch.error) {
      this.setErrorMessage(fetch.error)
    } else {
      this.setState({
        trails: fetch
      })
    }
  }

  render() {
    let trailsData = this.state.trails
    let errorMessage, trailsList

    if (this.state.errorMessage) {
      errorMessage = <p id='error-message'>{this.state.errorMessage}</p>
    }

    if (trailsData.length !== 0) {
      debugger
      trailsList = (
        <>
          {trailsData.map(trail => {
            debugger
            return  <Card id={`trail_${trail.id}`}>
                      <Card.Header id={`title_${trail.id}`}>{trail.title}</Card.Header>
                      <Card.Description id={`description_${trail.id}`}>{trail.description}</Card.Description>
                      <Card.Description id={`extra_${trail.id}`}>{trail.extra}</Card.Description>
                      <Card.Meta id={`location_${trail.id}`}>{trail.location}</Card.Meta>
                      <Card.Meta id={`duration_${trail.id}`}>{trail.duration}</Card.Meta>
                      <Card.Meta id={`intensity_${trail.id}`}>{trail.intensity}</Card.Meta>
                    </Card>
          })}
        </>
      )
    }

    return (
      <>
        <Container id='trail-list'>
          {trailsList}
          {errorMessage}
        </Container>
      </>
    )
  }
}

export default LandingPage