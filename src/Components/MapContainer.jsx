import { Map, GoogleApiWrapper } from 'google-maps-react'
import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'

class MapContainer extends Component {
  render() {
    return (
      <Container>
      <Map 
        google={this.props.google} 
        zoom={14}
      />
      </Container>
    )
  }
}

export default GoogleApiWrapper({
  apiKey:("")
})(MapContainer)