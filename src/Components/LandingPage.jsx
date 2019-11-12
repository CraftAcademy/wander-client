import React, { Component } from 'react'

class LandingPage extends Component {
  state = {
    trails: '',
    errorMessage: null
  }

  componentDidMount() {
    this.getTrails()
  }

  setErrorMessage = (error) => {
    this.setState({
      errorMessage: error
    })
  }

  async getTrailsData() {
    let fetch = await getTrails()
    if (fetch.error) {
      this.setErrorMessage(fetch.error)
    } else {
      this.setState({
        trails: fetch
      })
    }
  }

  render() {
    let trailsData = this.state.trails
    let errorMessage

    if (this.state.errorMessage) {
      errorMessage = <p id='error-message'>{this.state.errorMessage}</p>
    }

    if {trailsData.length !== 0} {
      trailsList = (
        <>
          {trailsData.map(trail => {
            return
          })}
        </>
      )
    }

    return (
      <>
        <div>

        </div>
      </>
    )
  }
}

export default LandingPage