import React, { Component } from 'react'

class SpecificTrail extends Component {
  state = {
    trail: null,
    errorMessage: null
  }

  async componentDidMount() {
    let response = await getSpecificTrail()
    if (response.error_message) {
      this.setState({
        errorMessage: response.error_message
      })
    } else {
      this.setState({
        trail: response
      })
    }
  }

  render() {
    return (
      <>
        
      </>
    )
  }
}

export default SpecificTrail