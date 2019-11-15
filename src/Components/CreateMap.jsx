import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

class CreateMap extends Component {
  state = {
    trails: [],
    errorMessage: ''
  }

  mapClicked = (mapProps, map, clickEvent) => {
    debugger
    const lat = clickEvent.latLng.lat()
    const lng = clickEvent.latLng.lng()
    const trailsCopy = [...this.state.trails]
    trailsCopy.push({title: '', latitude: lat, longitude: lng})
    this.setState({trails: trailsCopy})
  }

  render() {
    let trailsData = this.state.trails

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
        >
          {trailsData.map(trail => {
          return(
            <Marker 
              id={`trail_${trail.id}`}
              key={trail.id}
              title={trail.title}
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