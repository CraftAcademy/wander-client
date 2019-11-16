import React, { Component } from 'react'
import { getSpecificTrail } from '../Modules/trailsData'
import { Container, Grid, Header, Divider, Image, Button } from 'semantic-ui-react'

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
    const trail = this.state.trail

    if (trail) {
      singleTrail = (
        <>
          <Container id='single-trail'>
            <Grid centered columns={2}>
              <Grid.Column width={12}>
                <Header as='h2' id={`title_${trail.id}`}>{trail.title}</Header>
                <Image
                  id={`image_${trail.id}`}
                  src={trail.image}
                />
                <Divider />
                  <h4 id={`description_${trail.id}`}>{trail.description}</h4>
                  <h5 id={`extra_${trail.id}`}>{trail.extra}</h5>
                <Divider />
                  <h6 id={`location_${trail.id}`}>{trail.location}</h6>
                  <h6 id={`continent_${trail.id}`}>{trail.continent}</h6>
                  <h6 id={`duration_${trail.id}`}>{trail.duration}</h6>
                  <h6 id={`intensity_${trail.id}`}>{trail.intensity}</h6>
              </Grid.Column>
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