import React, { Component } from 'react'
import AsiaJungle from '../Images/asia-jungle.jpg'
import YellowStone from '../Images/yellowstone.jpg'
import BasteiBridge from '../Images/bastei-bridge.jpg'
import { searchContinent } from '../Modules/trailsData'
import { Container, Grid, Header, Image } from 'semantic-ui-react'
import Buddha from '../Images/buddha.jpg'

class ContinentContent extends Component {
  state={
    query: '',
    searchResults: [],
    errorMessage: null
  }

  getContinentResults = async continent => {  
    let response = await searchContinent(continent)
    if (response.error_message) {
      this.props.history.push("/continent", { errorMessage: response.error_message })
    } else {
      this.props.history.push("/continent", { searchResults: response })
    }
  }
  render() {
    let asiaJungle = <img src={AsiaJungle} id='image' alt='Asia Jungle' width='1800' height='600'/>
    let yellowstone = <img src={YellowStone} id='image' alt='Yellowstone' width='1950' height='600'/>
    let basteiBridge = <img src={BasteiBridge} id='image' alt='Bastei Bridge' width='1950' height='600'/>
    let buddha = <img src={Buddha} alt='Bastei Bridge' width='300' height='350'/>
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

      <Container className='continent-container' textAlign='justified'>
        <Grid centered container columns={2}>
          <Grid.Row>
            <Grid.Column width={4}>
              <Image>{buddha}</Image>
            </Grid.Column>
            <Grid.Column width={9}>
              <div id='content-blurb'>
                <Header as='h3'>Explore Trails in Asia</Header>
                <br />
                <p>Asia is the largest and most populous continent on our planet. It offers a mix of many different climates with diverse landscape and topography, from mountains and glaciers in the north to deserts in the south-west to djungles and volcanoes in the south-east. With over 60 % of the world's population living here, and it's history as the site of many of the first civilizations, there is always more to explore in Asia.</p>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
          <label id='content-label'>Explore Trails in North America</label>
          <br />
          <br />
          <p>North America is home to over 23 non-sovereign territories. It's the third largest continent on our planet Earth.</p>
          <p>Since the Carribean islands are a part of North America the possibilities for adventure are endless.</p>
          <p>There are great regions of mountain, flat plateaus, subtropical islands with temperate climates below the tropics, the Artic Archipelago and deserts.</p>
          <p> Would you dare to visit the tundra in Canada?</p>
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
          <label id='content-label'>Explore Trails in Europe</label>
          <br />
          <br />
          <p>Europe has fairly mild climate compare to other areas on Earth of the same latitude thanks to the Gulf Stream.</p>
          <p> Central Europe has vast plains, a great difference towards the mountainous fjord-cut spine of Norway or Icelands geysers.</p>
          <p> To the south there are mountainous regions alternating lowlands and mediterranean forests.</p>
        </div>
      </Container>
      </>
    )
  }
}

export default ContinentContent