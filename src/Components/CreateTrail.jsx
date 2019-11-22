import React, { Component } from 'react'
import CreateTrailForm from './CreateTrailForm'
import { submitTrail } from '../Modules/trailsData'
import { Message } from 'semantic-ui-react'

class CreateTrail extends Component {
  state = {
    title: '',
    description: '',
    extra: '',
    city: '',
    country: '',
    continent: 'Asia',
    duration: '',
    intensity: 1,
    image: '',
    responseMessage: '',
    errorMessage: '',
    coordinates: []
  }

  inputHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onAvatarDropHandler = (pictureFiles, pictureDataURLs) => {
    this.setState({
      image: pictureDataURLs
    })
  }

  mapClicked = (mapProps, map, clickEvent) => {
    const lat = clickEvent.latLng.lat()
    const lng = clickEvent.latLng.lng()
    const trailsCopy = [...this.state.coordinates]
    trailsCopy.push({latitude: lat, longitude: lng})
    this.setState({coordinates: trailsCopy})
  }

  submitTrailHandler = async () => {
    const { title, description, extra, city, country, continent, duration, intensity, image, coordinates } = this.state
    const formData = { title, description, extra, city, country, continent, duration, intensity, image, coordinates }
    if (Object.values(formData).filter(el => el === "").length > 0 ){
      return this.setState({
        errorMessage: 'All fields are mandatory!'
      })
    }

    let response = await submitTrail(title, description, extra, city, country, continent, duration, intensity, image, coordinates)
    if (response.error_message) {
      this.setState({
        errorMessage: response.error_message
      })
    } else {
      const id = response.data.id
      this.props.history.push(`/trails/${id}`)
    }
  }

  render() {
    let trailForm, responseMessage, errorMessage

    if (this.state.responseMessage) {
      responseMessage = <p id='response-message'>{this.state.responseMessage}</p>
    } 
    
    if (this.state.errorMessage) {
      errorMessage = <Message negative compact='true' id="error-message">{this.state.errorMessage}</Message>
    }

    trailForm = (
      <CreateTrailForm 
        intensity={this.state.intensity}
        inputHandler={this.inputHandler}
        submitTrailHandler={this.submitTrailHandler}
        onAvatarDropHandler={this.onAvatarDropHandler}
        mapClicked={this.mapClicked}
        coordinates={this.state.coordinates}
      />
    )

    return (
      <>
      <center>
        {errorMessage}
      </center>
        {trailForm} 
        {responseMessage}
      </>
    )
  }
}

export default CreateTrail