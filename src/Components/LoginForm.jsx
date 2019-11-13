import React from 'react'
import { Container, Input, Button } from 'semantic-ui-react'

const LoginForm = (props) => {
  return (
    <>
      <Container id='login-form'>
        <div>
          <Input id='email-input' name='email' placeholder='Email' onChange={props.inputChangeHandler} />
        </div>
        <div>
          <Input id='password-input' name='password' placeholder='Password' onChange={props.inputChangeHandler} />
        </div>
        <div>
          <Button id="submit-login-form" onClick={props.handleLogin}>Submit</Button>
        </div>
      </Container>
    </>
  )
}

export default LoginForm