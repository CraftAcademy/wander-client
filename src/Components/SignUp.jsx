import React, { Component } from 'react'
import { registerUser } from '../state/actions/reduxTokenAuthConfig'
import { connect } from 'react-redux'
import SignUpForm from './SignUpForm'

class SignUp extends Component {
  state = {
    email: '',
    name: '',
    password: '',
    password_confirmation: '',
    errorMessage: ''
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSignup = () => {
    const { registerUser } = this.props;
    const { email, name, password, password_confirmation } = this.state;
    registerUser({ email, name, password, password_confirmation })
      .then(
        console.log('register user works')
      )
      .catch(error => {
        debugger
        this.setState({errorMessage: error.response.data.errors})
      })
  }

  render() {
    let errorMessage = <p id="error-message">{this.state.errorMessage}</p>

    return(
      <>
        <SignUpForm 
          handleSignup={this.handleSignup}
          inputChangeHandler={this.inputChangeHandler}
        />
        {errorMessage}
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
  registerUser
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(SignUp)