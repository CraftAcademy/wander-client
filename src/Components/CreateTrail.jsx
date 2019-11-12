import React, { Component } from 'react'
import CreateTrailForm from './CreateTrailForm'
import { submitTrail } from '../Modules/TrailsData'

class CreateTrail extends Component {
  state = {
    title: '',
    description: '',
    extra: '',
    location: '',
    duration: '',
    intensity: 1,
    responseMessage: ''
  }

  inputHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitTrailHandler = async () => {
    const { title, description, extra, location, duration, intensity } = this.state
    let response = await submitTrail(title, description, extra, location, duration, intensity)

    if (response.status === 200) {
      this.setState({
        responseMessage: response.data.message
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

    if (this.state.responseMessage) {
      responseMessage = <p id='response-message'>{this.state.responseMessage}</p>
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
      </>
    )
  }
}

export default CreateTrail