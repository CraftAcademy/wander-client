import React, { Component } from 'react'
import AsiaJungle from '../Images/asia-jungle.jpg'
import YellowStone from '../Images/yellowstone.jpg'
import BasteiBridge from '../Images/bastei-bridge.jpg'
import { searchTrail } from '../Modules/trailsData'
import { Container } from 'semantic-ui-react'

class ContinentContent extends Component {
  state={
    query: '',
    searchResults: [],
    errorMessage: null
  }

  getContinentResults = async continent => {  
    let response = await searchTrail(continent)
    if (response.error_message) {
      this.props.history.push("/continent", { errorMessage: response.error_message })
    } else {
      this.props.history.push("/continent", { searchResults: response })
    }
  }
  render() {
    let asiaJungle = <img src={AsiaJungle} id='image' alt='Asia Jungle' width='1800' height='750'/>
    let yellowstone = <img src={YellowStone} id='image' alt='Yellowstone' width='1950' height='800'/>
    let basteiBridge = <img src={BasteiBridge} id='image' alt='Bastei Bridge' width='1950' height='800' />
    let errorMessage = <div compact id='error-message'>{this.state.errorMessage}</div>
    return (
      <>
      {errorMessage}
      <div className='asia-page'>
        <div className='asia-image'>
          {asiaJungle}
            <div className='asia-image-content'>
              <div className='asia-content-name'>
                <p>Asian Jungle</p>
              </div>
              <div className='asia-content-button'>
                <button id='asian-button' onClick={() => this.getContinentResults('Asia')}>
                  <div className='asian-button-text'>
                    Explore Asia
                  </div>
                </button>
              </div>
            </div>
        </div>
      </div>

      <Container>
        <div id='content-blurb'>
          <label id='content-label'>Explore Jeff</label>
          <br />
          <br />
          <p>Hello My Name Jeff I like Hello My Name Jeff I like 
          Hello My Name Jeff I like 
          Hello My Name Jeff I like 
          Hello My Name Jeff I like 
          Hello My Name Jeff I like 
          Hello My Name Jeff I like 
          Hello My Name Jeff I like 
          Hello My Name Jeff I like 
          Hello My Name Jeff I like 
          Hello My Name Jeff I like 
          Hello My Name Jeff I like 
          Hello My Name Jeff I like 
          Hello My Name Jeff I like 
          Hello My Name Jeff I like 
          Hello My Name Jeff I like 
          Hello My Name Jeff I like 
          Hello My Name Jeff I like 
          </p>
        </div>
      </Container>

      <div className='na-page'>
        <div className='na-image'>
          {yellowstone}
            <div className='na-image-content'>
              <div className='na-content-name'>
                <p>Yellowstone National Park, U.S.A</p>
              </div>
              <div className='na-content-button'>
                <button id='na-button' onClick={() => this.getContinentResults('North America')}>
                  <div className='na-button-text'>
                    Explore North America
                  </div>
                </button>
              </div>
            </div>
        </div>
      </div>

      <Container>
        <div id='content-blurb'>
          <label id='content-label'>Explore Jeff</label>
          <br />
          <br />
          <p>Hello My Name Jeff I like </p>
        </div>
      </Container>

      <div className='eu-page'>
        <div className='eu-image'>
          {basteiBridge}
            <div className='eu-image-content'>
              <div className='eu-content-name'>
                <p>Bastei Bridge, Switzerland / Germany</p>
              </div>
              <div className='eu-content-button'>
                <button id='eu-button' onClick={() => this.getContinentResults('Europe')}>
                  <div className='eu-button-text'>
                    Explore Europe
                  </div>
                </button>
              </div>
            </div>
        </div>
      </div>

      <Container>
        <div id='content-blurb'>
          <label id='content-label'>Explore Jeff</label>
          <br />
          <br />
          <p>Hello My Name Jeff I like </p>
        </div>
      </Container>
      </>
    )
  }
}

export default ContinentContent