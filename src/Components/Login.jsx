import React, { Component } from 'react'
import { signInUser } from '../state/actions/reduxTokenAuthConfig'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'

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

  handleLogin = () => {
    const { signInUser } = this.props;
    const { email, password } = this.state;
      signInUser({ email, password })
        .then(
          console.log('Wander on..')
        )
        .catch(error => {
          this.setState({errorMessage: error.response.data.errors})
        })
  }
  
  render() {
    let renderLogin, errorMessage

    if (this.state.errorMessage) {
      errorMessage = <p id="error-message">{this.state.errorMessage}</p>
    }

    if (!this.props.currentUser.isSignedIn) {
      renderLogin = (
        <>
          <LoginForm 
            inputChangeHandler={this.inputChangeHandler}
            handleLogin={this.handleLogin}
          />
        </>
      )
    }

    return (
      <>
        {renderLogin}
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
  signInUser
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(Login)