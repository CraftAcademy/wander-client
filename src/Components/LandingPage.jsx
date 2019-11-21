import React, { Component } from 'react'
import { getTrails } from '../Modules/trailsData'
import { Card, Container, Image, Grid, Icon, Message } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import ContinentContent from './ContinentContent'
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
    let trailsList, welcomeMessage
    let errorMessage = <div compact='true' id='error-message'>{this.state.errorMessage}</div>

    if (this.props.currentUser.isSignedIn) {
      welcomeMessage = 
      <div id="welcome-message">Hello wanderer {this.props.currentUser.attributes.name}</div>
    }

    if (this.state.errorMessage) {
      errorMessage = <Message negative compact='true' id="error-message">{this.state.errorMessage}</Message>
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
                        <Card.Header as='h3' id={`title_${trail.id}`}>{trail.title}</Card.Header>
                        <Card.Description id={`description_${trail.id}`}>Description: {ingress}</Card.Description>
                        <Card.Meta id={`city_${trail.id}`}>City: {trail.city}</Card.Meta>
                        <Card.Meta id={`country_${trail.id}`}>Country: {trail.country}</Card.Meta>
                        <Card.Meta id={`continent_${trail.id}`}>Continent: {trail.continent}</Card.Meta>
                        <Card.Content extra id={`intensity_${trail.id}`}>Intensity Level: {trail.intensity}</Card.Content>
                      </Card>
                    </NavLink>
          })}
        </>
      )
    }

    return (
      <>
        <div className='image-page'>
          <iframe 
            src="https://player.vimeo.com/video/54802209?autoplay=1&loop=1" 
            frameborder="0" 
            allow="autoplay; fullscreen" 
            allowfullscreen
            >
          </iframe>
        <script src="https://player.vimeo.com/api/player.js"></script>
          <div className='content-image'>
            <div className='content1'>
              <h1>{welcomeMessage}</h1>
            </div>
            <div className='content2'>
                <p>Find your next adventure</p>
            </div>
            <div className='content3'>
              <Icon name='arrow down' size='big'/>
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
        <Footer/>
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