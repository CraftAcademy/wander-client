import React, { Component } from 'react'
import CreateTrailForm from './CreateTrailForm'
import { submitTrail } from '../Modules/trailsData'

class CreateTrail extends Component {
  state = {
    title: '',
    description: '',
    extra: '',
    location: '',
    duration: '',
    intensity: 1,
    responseMessage: '',
    errorMessage: ''
  }

  inputHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitTrailHandler = async () => {
    const { title, description, extra, location, duration, intensity } = this.state
    let response = await submitTrail(title, description, extra, location, duration, intensity)

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