import React, { Component } from 'react'
import CreateTrailForm from './CreateTrailForm'

class CreateTrail extends Component {
  state = {
    title: '',
    description: '',
    extra: '',
    location: '',
    duration: '',
    intensity: 1,
  }
  render() {
    let trailForm

    trailForm = (
      <CreateTrailForm />
    )

    return (
      <>
       {trailForm} 
      </>
    )
  }
}

export default CreateTrail