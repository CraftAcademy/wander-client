import React, { Component } from 'react'
import { signInUser } from '../state/actions/reduxTokenAuthConfig'
import { connect } from 'react-redux'

class Login extends Component {
  state = {
    email: '',
    username: '',
    password: '',
    errorMessage: ''
  }

  inputChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  render() {
    return (
      <>
        <LoginForm 
          inputChangeHandler={this.inputChangeHandler}
        />
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  }
}

const mapDispatchToProps = {
  signInUser
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(Login)