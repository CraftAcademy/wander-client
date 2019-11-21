import React, { Component } from 'react'
import { getSpecificTrail } from '../Modules/trailsData'
import { Map, GoogleApiWrapper, Marker, Polyline } from 'google-maps-react'
import { Container, Grid, Header, Divider, Image, Icon, Message } from 'semantic-ui-react'
import axios from 'axios'
import { connect } from 'react-redux'

class SpecificTrail extends Component {
  state = {
    trail: null,
    errorMessage: null,
    responseMessage: null,
    userBookmarks: []
  }

  async componentDidMount() {
    let response = await getSpecificTrail(this.props.match.params.id)
    if (response.error_message) {
      this.setState({
        errorMessage: response.error_message
      })
    } else {
      this.setState({
        trail: response
      })
    }
    const bookmarks = await axios.get('http://localhost:3000/v1/bookmarks')
    const mappedBookmarks = bookmarks.data.data.map(bookmark => bookmark.id)
    this.setState({ userBookmarks: mappedBookmarks })
  }

  goBack = () => {
    this.props.history.goBack()
  }

  bookMark = async () => {
    try {
     let response = await axios.post('http://localhost:3000/v1/bookmarks', {
        id: this.state.trail.id
      })
      this.setState({
        responseMessage: response.data.message 
      })
    } catch (error) {
      this.setState({
        errorMessage: error.response.data.errors[0]
      })
    }
  }

  render() {
    let singleTrail, backButton, responseMessage, trailMap, errorMessage
    const trail = this.state.trail
    const style = {
      width: '80%',
      height: '50%',
      left: '10%',
      borderRadius: '8px'    
    }

    if (trail) {
      const trailCoords = this.state.trail.coordinates.map(trail => ({lat: trail.latitude, lng: trail.longitude}))  
      trailMap = (
        <>
          <Map 
            google={this.props.google} 
            zoom={8}
            style={style}
            initialCenter={{
              lat: trail.coordinates[0].latitude,
              lng: trail.coordinates[0].longitude
            }}
          > 
              {trailCoords.map((trail, index) => {
                if (index === 0 || index === trailCoords.length-1) {
                  return(
                    <Marker 
                      id={`trail_${trail.lat}`}
                      key={trail.lat}
                      position={{
                        lat: trail.lat, 
                        lng: trail.lng
                      }}
                    /> 
                  )
                }
                })}
            <Polyline
              path={trailCoords}
              strokeColor='#45512b'
              strokeOpacity={0.8}
              strokeWeight={6} 
            />
          </Map>
        </>
      )
    }

    if (this.state.responseMessage) {
      responseMessage = <Message positive compact id='response-message'>{this.state.responseMessage}</Message>
    } 

    if (this.state.errorMessage) {
      errorMessage = <Message warning compact id='warning-message'>{this.state.errorMessage}</Message>
    }

    if (trail) {
      singleTrail = (
        <>
          {this.state.userBookmarks.includes(trail.id) || <Icon id='bookmark' size='large' name='bookmark' onClick={this.bookMark}/>}
          <center>
            {responseMessage}
          </center>
          <Container textAlign='justified' id='specific-trail'>
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column width={5}>
                  <Image
                    id={`image_${trail.id}`}
                    src={trail.image}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Header as='h2' id={`title_${trail.id}`}>{trail.title}</Header>
                  <Divider />
                  <p className='single-description' id={`description_${trail.id}`}>{trail.description}</p>
                  <div className='single-trail'>
                    <h3>Good to know:</h3>
                    <p className='single-content' id={`extra_${trail.id}`}>{trail.extra}</p>
                  </div>
                  <div className='single-trail'>
                    <h3>City:</h3>
                    <p className='single-content' id={`city_${trail.id}`}>{trail.city}</p>
                  </div>
                  <div className='single-trail'>
                    <h3>Country:</h3>
                    <p className='single-content' id={`country_${trail.id}`}>{trail.country}</p>
                  </div>
                  <div className='single-trail'>
                    <h3>Continent:</h3>
                    <p className='single-content' id={`continent_${trail.id}`}>{trail.continent}</p>
                  </div> 
                  <div className='single-trail'>
                    <h3>Duration:</h3>
                    <p className='single-content' id={`duration_${trail.id}`}>{trail.duration} min</p>
                  </div>
                  <div className='single-trail'>
                    <h3>Intensity Level:</h3>
                    <p className='single-content' id={`intensity_${trail.id}`}>{trail.intensity}</p>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </>
      )
    } else {
      singleTrail = (
        <Message negative compact id="error-message">{this.state.errorMessage}</Message>
      )
    }

    backButton = (
      <a id='back-button' onClick={this.goBack} href='#'>Go Back</a>
    )

    return (
      <>
        {errorMessage}
        {singleTrail}
        {backButton}
        {trailMap}
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
)(GoogleApiWrapper({
  apiKey:(process.env.REACT_APP_API_KEY)
})(SpecificTrail))
