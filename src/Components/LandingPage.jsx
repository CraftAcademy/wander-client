import React, { Component } from 'react'
import { getTrails } from '../Modules/trailsData'
import { Card, Container, Image, Grid } from 'semantic-ui-react'
import Sarek from '../Images/sarek.jpg'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import ContinentContent from './ContinentContent'

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
    let sarek = <img src={Sarek} id='image' alt='Sarek national park' width='1800' height='650'/>
    let errorMessage = <div compact id='error-message'>{this.state.errorMessage}</div>

    if (this.props.currentUser.isSignedIn) {
      welcomeMessage = <div id="welcome-message">Hello wanderer {this.props.currentUser.attributes.name}</div>
    }

    if (trailsData.length !== 0) {
      trailsList = (
        <>
          {trailsData.map(trail => {
            let trim_ingress = trail.description.substr(0, 75)
            let ingress = trim_ingress.substr(0, Math.min(trim_ingress.length, trim_ingress.lastIndexOf(" "))) + ' ...'            
            return  <NavLink id={`trail_${trail.id}`} key={trail.id} to={`/trails/${trail.id}`}>
                      <Card color='olive' id={`card_${trail.id}`}>
                        <Image
                          id={`image_${trail.id}`}
                          src={trail.image}
                        />
                        <Card.Content>
                        <Card.Header as='h3' id={`title_${trail.id}`}>{trail.title}</Card.Header>
                        <Card.Description id={`description_${trail.id}`}>{ingress}</Card.Description>
                        <Card.Meta id={`city_${trail.id}`}>City: {trail.city}</Card.Meta>
                        <Card.Meta id={`country_${trail.id}`}>Country: {trail.country}</Card.Meta>
                        <Card.Meta id={`continent_${trail.id}`}>Continent: {trail.continent}</Card.Meta>
                        </Card.Content>
                        <Card.Content extra id={`intensity_${trail.id}`}>Intensity Level: {trail.intensity}</Card.Content>
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
              <div className='content1'>
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
        <ContinentContent history={this.props.history}/>
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