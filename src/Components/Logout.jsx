import React, { Component } from 'react'
import { signOutUser } from '../state/actions/reduxTokenAuthConfig'
import { connect } from 'react-redux'
import { Menu, Message } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

class Logout extends Component {
  state = {
    errorMessage: null
  }

  signOut = e => {
    e.preventDefault()
    const { signOutUser } = this.props

  signOutUser()
    .then(
      () => {if (!this.props.currentUser.isSignedIn) {
        this.props.history.push('/')
      }}
    )
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    let logoutButton, errorMessage
    const { signOut } = this

    if (this.props.currentUser.isSignedIn) {
      logoutButton = (
        <Menu.Item
          id='nav-logout'
          as={NavLink}
          exact to='/'
          onClick={signOut}
          name='logout'
        />
      )
    }

    if (this.state.errorMessage) {
      errorMessage = <Message negative compact='true' id="error-message">{this.state.errorMessage}</Message>
    }

    return (
      <>
        {logoutButton}
        {errorMessage}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    state: state,
    currentUser: state.reduxTokenAuth.currentUser
  }
}

const mapDispatchToProps = {
  signOutUser
}

export default connect(
  mapStateToProps,  
  mapDispatchToProps
)(Logout)