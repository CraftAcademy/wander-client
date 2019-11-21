import React, { Component } from 'react'
import { getSpecificTrail } from '../Modules/trailsData'
import { Map, GoogleApiWrapper, Marker, Polyline } from 'google-maps-react'
import { Container, Grid, Header, Divider, Image, Table, Label, Message, Icon } from 'semantic-ui-react'
import axios from 'axios'
import { connect } from 'react-redux'

class SpecificTrail extends Component {
  state = {
    trail: null,
    errorMessage: null,
    responseMessage: null,
    userBookmarks: [],
    bookMarkErrorMessage: null
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
        bookMarkErrorMessage: error.response.data.errors[0]
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
              strokeColor='#0000ff'
              strokeOpacity={0.8}
              strokeWeight={6} 
            />
          </Map>
        </>
      )
    }

    if (this.state.responseMessage) {
      responseMessage = <Message positive compact='true' id='response-message'>{this.state.responseMessage}</Message>
    } 

    if (this.state.bookMarkErrorMessage) {
      errorMessage = <Message warning compact='true' id='warning-message'>{this.state.bookMarkErrorMessage}</Message>
    }

    if (trail) {
      singleTrail = (
        <>
          <center>
            {responseMessage}
            {errorMessage}
          </center>
          <Container textAlign='justified' id='specific-trail'>
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column width='8'>
                  <Image
                    id={`image_${trail.id}`}
                    src={trail.image}
                  />
                </Grid.Column>
                <Grid.Column width='6'>
                  <Header as='h2' id={`title_${trail.id}`}>
                    {trail.title} {this.state.userBookmarks.includes(trail.id) || <Icon id='bookmark' size='big' name='bookmark' onClick={this.bookMark}/>}
                  </Header>
                  <Divider />
                 <p className='single-content' id={`description_${trail.id}`}> {trail.description}</p>
                    <Header as='h3'>Good to know:</Header>
                    <p className='single-content' id={`extra_${trail.id}`}>{trail.extra}</p>
                  </Grid.Column>
                  <Grid.Column width='2'>
                    <Table color='olive' celled collapsing>
                      <Table.Header>
                          <Table.HeaderCell colSpan='3'><h3>Trail Facts</h3></Table.HeaderCell>
                      </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>
                          <Header as='h4'>City:</Header>
                        </Table.Cell>
                        <Table.Cell id={`city_${trail.id}`}content={trail.city}/>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          <Header as='h4'> Country:</Header> 
                        </Table.Cell>
                        <Table.Cell id={`country_${trail.id}`} content={trail.country}/>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          <Header as='h4'>Continent:</Header> 
                        </Table.Cell>
                        <Table.Cell id={`continent_${trail.id}`} content={trail.continent}/>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          <Header as='h4'>Duration:</Header>
                        </Table.Cell>
                        <Table.Cell id={`duration_${trail.id}`}>{trail.duration} minutes</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          <Header as='h4'>Intensity:</Header>
                        </Table.Cell>
                        <Table.Cell id={`intensity_${trail.id}`} content={trail.intensity}/>
                      </Table.Row>
                    </Table.Body>
                    </Table>
                  </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </>
      )
    } else {
      singleTrail = (
        <Message negative compact='true' id="error-message">{this.state.errorMessage}</Message>
      )
    }

    backButton = (
      <Label as='a' color='olive' id='back-button' onClick={this.goBack} href='#'>Go Back</Label>
    )

    return (
      <>
      <br/>
      {backButton}
        {singleTrail}
        <br/>
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
