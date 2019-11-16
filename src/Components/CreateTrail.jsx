import React, { Component } from 'react'
import CreateTrailForm from './CreateTrailForm'
import { submitTrail } from '../Modules/trailsData'

class CreateTrail extends Component {
  state = {
    title: '',
    description: '',
    extra: '',
    location: '',
    continent: '',
    duration: '',
    intensity: 1,
    image: '',
    responseMessage: '',
    errorMessage: ''
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

  submitTrailHandler = async () => {
    const { title, description, extra, location, continent, duration, intensity, image } = this.state
    let response = await submitTrail(title, description, extra, location, continent, duration, intensity, image)

    if (response.error_message) {
      this.setState({
        errorMessage: response.error_message
      })
    } else {
      this.setState({
        responseMessage: response
      })
    }
  }

  render() {
    let trailForm
    let responseMessage
    let errorMessage

    if (this.state.responseMessage) {
      responseMessage = <p id='response-message'>{this.state.responseMessage}</p>
    } 
    
    if (this.state.errorMessage) {
      errorMessage = <p id='error-message'>{this.state.errorMessage}</p>
    }

    trailForm = (
      <CreateTrailForm 
        intensity={this.state.intensity}
        inputHandler={this.inputHandler}
        submitTrailHandler={this.submitTrailHandler}
        onAvatarDropHandler={this.onAvatarDropHandler}
      />
    )

    return (
      <>
        {trailForm} 
        {responseMessage}
        {errorMessage}
      </>
    )
  }
}

export default CreateTrail