import React, { Component } from 'react'
import { signInUser } from '../state/actions/reduxTokenAuthConfig'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import { Container, Message } from 'semantic-ui-react'

class Login extends Component {
  state = {
    email: '',
    password: '',
    errorMessage: ''
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogin = () => {
    const { signInUser } = this.props;
    const { email, password } = this.state;
      signInUser({ email, password })
        .then(
         () => {if (this.props.currentUser.isSignedIn) {
            this.props.history.push('/')
          }}
        )
        .catch(error => {
          this.setState({errorMessage: error.response.data.errors})
        })
  }
  
  render() {
    let renderLogin, errorMessage 

    if (this.state.errorMessage) {
      errorMessage = <Message negative compact id="error-message">{this.state.errorMessage}</Message>
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
      <Container>
        <br/>
        {renderLogin}
        <center>
         {errorMessage}
        </center>
      </Container>
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