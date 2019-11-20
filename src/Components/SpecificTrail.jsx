import React, { Component } from 'react'
import { getSpecificTrail } from '../Modules/trailsData'
import { Container, Grid, Header, Divider, Image, Icon, Message } from 'semantic-ui-react'
import axios from 'axios'
import { connect } from 'react-redux'

class SpecificTrail extends Component {
  state = {
    trail: null,
    errorMessage: null,
    responseMessage: null,
    userBookmarks: []
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
    const bookmarks = await axios.get('http://localhost:3000/v1/bookmarks')
    const mappedBookmarks = bookmarks.data.data.map(bookmark => bookmark.id)
    this.setState({ userBookmarks: mappedBookmarks })
  }

  goBack = () => {
    this.props.history.goBack()
  }

  bookMark = async () => {
    try {
     let response = await axios.post('http://localhost:3000/v1/bookmarks', {
        id: this.state.trail.id
      })
      this.setState({
        responseMessage: response.data.message 
      })
    } catch (error) {
      return error.response.data.error_message
    }
  }

  render() {
    let singleTrail, backButton, responseMessage
    const trail = this.state.trail

    if (this.state.responseMessage) {
      responseMessage = <Message positive compact id='response-message'>{this.state.responseMessage}</Message>
    } 

    if (trail) {
      singleTrail = (
        <>
          {this.state.userBookmarks.includes(trail.id) || <Icon size='large' name='bookmark' onClick={this.bookMark}/>}
          <center>
            {responseMessage}
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

const mapStateToProps = state => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  }
}

export default connect(
  mapStateToProps
)(SpecificTrail)