import React from 'react'
import { connect } from 'react-redux'
import { Container, Divider } from 'semantic-ui-react'

function ProfilePage({ currentUser }) {
  return (
    <>
      <Container>
        <h1 id='user-name'>{currentUser.attributes.name}</h1>
        <Divider />
        <br></br>
        <div>
          <h2>Email:</h2>
          <h3 id='user-email'>{currentUser.attributes.uid}</h3>
        </div>
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