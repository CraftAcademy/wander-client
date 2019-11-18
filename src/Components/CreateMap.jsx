import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

class CreateMap extends Component {
  render() {
    let trailsData = this.props.coordinates

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
          onClick={this.props.mapClicked}
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