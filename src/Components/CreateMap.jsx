import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

class CreateMap extends Component {
  state = {
    coordinates: [],
    errorMessage: ''
  }

  mapClicked = (mapProps, map, clickEvent) => {
    debugger
    const lat = clickEvent.latLng.lat()
    const lng = clickEvent.latLng.lng()
    const trailsCopy = [...this.state.coordinates]
    trailsCopy.push({latitude: lat, longitude: lng})
    this.setState({coordinates: trailsCopy})
  }

  render() {
    let trailsData = this.state.coordinates

    const style = {
      width: '80%',
      height: '80%',
      left: '10%',
      borderRadius: '8px'
    }

    return (
      <>
        <Map 
          google={this.props.google} 
          zoom={3}
          style={style}
          center={{
            lat: 30.0131,
            lng: 10.0686
          }}
          onClick={this.mapClicked}
          onChange={this.props.dropMarkerHandler}
        >
          {trailsData.map(trail => {
          return(
            <Marker 
              id={`trail_${trail.id}`}
              key={trail.id}
              position={{
                lat: trail.latitude, 
                lng: trail.longitude
              }}
            /> 
          )
        })}
        </Map>
      </>
    )
  }
}

export default GoogleApiWrapper({
  apiKey:(process.env.REACT_APP_API_KEY)
})(CreateMap)