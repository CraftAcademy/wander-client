import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import React, { Component } from 'react'
import { Header, Card, Image, Icon, Message } from 'semantic-ui-react'
import { getTrails } from '../Modules/trailsData'
import InfoWindowEx from './InfoWindowEx'

class MapContainer extends Component {
  state = {
    trails: [],
    errorMessage: null,
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
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

  onMapClicked = (props) => {
    if(this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  onMarkerClick = (props, marker, e) => {
    debugger
    this.setState({
      selectedPlace: props,
      showingInfoWindow: true,
      activeMarker: marker
    })
  }

  render() {
    let trailsData = this.state.trails
    let errorMessage
    const style = {
      width: '80%',
      height: '80%',
      left: '10%',
      borderRadius: '8px',
      position: 'relative'
    }

    if (this.state.errorMessage) {
      errorMessage = <Message negative compact='true' id="error-message">{this.state.errorMessage}</Message>
    }

    return (
      <>
      <center>
        <Header id='map-header'>
          Trails Around the World
        </Header>
        {errorMessage}
      </center>
      <br />
        <Map 
          google={this.props.google} 
          zoom={3}
          style={style}
          initialCenter={{
            lat: 30.0131,
            lng: 10.0686
          }}
          onClick={this.onMapClicked}
        >
        {trailsData.map(trail => {
          return(
            <Marker 
              id={`trail_${trail.id}`}
              key={trail.id}
              name={trail.title}
              image={trail.image}
              city={trail.city}
              likes={trail.likes}
              intensity={trail.intensity}
              position={{
                lat: trail.coordinates[0].latitude, 
                lng: trail.coordinates[0].longitude
              }}
              onClick={this.onMarkerClick}
            /> 
          )
        })}
          <InfoWindowEx
            options={{maxWidth: 300, maxHeight: 300}}
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div style={{height: '300px', width: '250px'}}>
              <Card fluid className='infoCard'>
              <Image onClick={() => {this.props.history.push(`/trails/${this.state.selectedPlace.id.split('_')[1]}`)}} 
                className='info-window-image'
                src={this.state.selectedPlace.image} 
                object-fit='cover'
                height='170px'
              />
              <Card.Content className='infoCardContent'>
              <Card.Header as='h3'>{this.state.selectedPlace.name}</Card.Header>
              <Card.Description>City: {this.state.selectedPlace.city}</Card.Description>
              <Card.Description>Intensity Level: {this.state.selectedPlace.intensity}</Card.Description>
              </Card.Content>
              <Card.Content>
              <div id='like-container'>
                <Icon name='heart' color='red'/>
                {this.state.selectedPlace.likes}
              </div>
              </Card.Content>
              </Card>
            </div>
          </InfoWindowEx>
        </Map>
      </>
    )
  }
}

export default GoogleApiWrapper({
  apiKey:(process.env.REACT_APP_API_KEY)
})(MapContainer)