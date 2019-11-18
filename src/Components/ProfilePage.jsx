import React from 'react'
import { connect } from 'react-redux'
import { Container, Divider, Grid, Header, Image } from 'semantic-ui-react'

function ProfilePage({ currentUser }) {
  return (
    <>
      <Container>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column width={5}>
              <Image id='user-image' src={currentUser.attributes.image} size='small' circular />
            </Grid.Column>
            <Grid.Column>
              <Header as='h2' id='user-name'>{currentUser.attributes.name}</Header>
              <Divider />
              <br></br>
              <div>
                <h2>Email:</h2>
                <h3 id='user-email'>{currentUser.attributes.uid}</h3>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </>
  )
}



const mapStateToProps = state => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  }
}

export default connect(
  mapStateToProps
)(ProfilePage)