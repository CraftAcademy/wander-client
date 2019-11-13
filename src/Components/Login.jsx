import React, { Component } from 'react'

class Login extends Component {
  state = {
    email: '',
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

export default Login