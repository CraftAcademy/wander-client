import React, { Component } from 'react'

class Login extends Component {
  state = {
    email: '',
    password: ''
  }
  
  render() {
    return (
      <>
        <LoginForm />
      </>
    )
  }
}

export default Login