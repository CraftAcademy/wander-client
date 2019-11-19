import React, { Component } from 'react'
import { getSpecificTrail } from '../Modules/trailsData'
import { Container, Grid, Header, Divider, Image, Message } from 'semantic-ui-react'

class SpecificTrail extends Component {
  state = {
    trail: null,
    errorMessage: null
  }

  async componentDidMount() {
    let response = await getSpecificTrail(this.props.match.params.id)
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

  goBack = () => {
    this.props.history.goBack()
  }

  render() {
    let singleTrail, backButton
    let errorMessage = <Message negative compact><div compact id='error-message'>{this.state.errorMessage}</div></Message>
    const trail = this.state.trail

    if (trail) {
      singleTrail = (
        <>
        <center>
         {errorMessage}
        </center>
          <Container textAlign='justified' id='specific-trail'>
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column width={5}>
                <Image
                  id={`image_${trail.id}`}
                  src={trail.image}
                />
                </Grid.Column>
              <Grid.Column>
                <Header as='h2' id={`title_${trail.id}`}>{trail.title}</Header>
                <Divider />
                  <p className='single-description' id={`description_${trail.id}`}>{trail.description}</p>
                  <div className='single-trail'>
                    <h3>Good to know:</h3>
                    <p className='single-content' id={`extra_${trail.id}`}>{trail.extra}</p>
                  </div>
                  <div className='single-trail'>
                    <h3>Location:</h3>
                    <p className='single-content' id={`location_${trail.id}`}>{trail.location}</p>
                  </div>
                  <div className='single-trail'>
                    <h3>Continent:</h3>
                    <p className='single-content' id={`continent_${trail.id}`}>{trail.continent}</p>
                  </div> 
                  <div className='single-trail'>
                    <h3>Duration:</h3>
                    <p className='single-content' id={`duration_${trail.id}`}>{trail.duration} min</p>
                  </div>
                  <div className='single-trail'>
                    <h3>Intensity Level:</h3>
                    <p className='single-content' id={`intensity_${trail.id}`}>{trail.intensity}</p>
                  </div>
              </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </>
      )
    } else {
      singleTrail = (
        <h3 id='error-message'>{this.state.errorMessage}</h3>
      )
    }

    backButton = (
      <a id='back-button' onClick={this.goBack} href='#'>Go Back</a>
    )

    return (
      <>
        {singleTrail}
        {backButton}
      </>
    )
  }
}

export default SpecificTrail