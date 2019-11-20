import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker, Polyline } from 'google-maps-react'

class CreateMap extends Component {
  render() {
    let trailsData = this.props.coordinates
    const triangleCoords = trailsData.map(trail => ({lat: trail.latitude, lng: trail.longitude}))

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
          initialCenter={{
            lat: 30.0131,
            lng: 10.0686
          }}
          onClick={this.props.mapClicked}
        >
        <Polyline
          path={triangleCoords}
          strokeColor='#45512b'
          strokeOpacity={0.8}
          strokeWeight={2} />  
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