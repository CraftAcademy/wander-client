import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react'
import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'
import { getTrails } from '../Modules/trailsData'

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

  outMaker = (props) => {
    debugger
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
    const style = {
      width: '80%',
      height: '80%',
      left: '10%',
      borderRadius: '8px',
      position: 'relative'
    }

    return (
      <>
      <center>
        <Header id='map-header'>
          Trails Around the World
        </Header>
      </center>
      <br />
        <Map 
          google={this.props.google} 
          zoom={3}
          style={style}
          center={{
            lat: 30.0131,
            lng: 10.0686
          }}
        >
        {trailsData.map(trail => {
          return(
            <Marker 
              id={`trail_${trail.id}`}
              key={trail.id}
              name={trail.title}
              image={trail.image}
              position={{
                lat: trail.coordinates[0].latitude, 
                lng: trail.coordinates[0].longitude
              }}
              onClick={this.onMarkerClick}
            /> 
          )
        })}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.outMaker}
          >
            <div onClick={() => this.props.history.push(`/trails/${this.state.selectedPlace.id}`)}>
              <img src={this.state.selectedPlace.image} />
              <p>{this.state.selectedPlace.name}</p>
            </div>
          </InfoWindow>
        </Map>
      </>
    )
  }
}

export default GoogleApiWrapper({
  apiKey:(process.env.REACT_APP_API_KEY)
})(MapContainer)