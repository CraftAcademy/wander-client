import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import { getTrails } from '../Modules/trailsData'

class MapContainer extends Component {
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
    return (
      <Container>
      <Map 
        google={this.props.google} 
        zoom={14}
      >
      {trailsData.map(trail => {
        return(
          <Marker 
            id={`trail_${trail.id}`}
            title={trail.title}
            position={{lat: trail.latitude, lng: trail.longitude}}
          />
        )
      })}
      </Map>
      </Container>
    )
  }
}

export default GoogleApiWrapper({
  apiKey:(process.env.REACT_APP_API_KEY)
})(MapContainer)