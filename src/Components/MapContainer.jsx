import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import React, { Component } from 'react'
import { Header, Message } from 'semantic-ui-react'
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
    let errorMessage = <Message negative compact id="error-message">{this.state.errorMessage}</Message>
    const style = {
      width: '80%',
      height: '80%',
      left: '10%',
      borderRadius: '8px'
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
              title={trail.title}
              position={{
                lat: trail.latitude, 
                lng: trail.longitude
              }}
              onClick={() => this.props.history.push(`/trails/${trail.id}`)}
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
})(MapContainer)