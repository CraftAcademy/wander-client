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
    return (
      <>
        <div>

        </div>
      </>
    )
  }
}

export default LandingPage