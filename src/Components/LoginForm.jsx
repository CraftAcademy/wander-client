import React from 'react'
import { Container, Input, Button } from 'semantic-ui-react'

const LoginForm = (props) => {
  return (
    <>
      <Container id='login-form'>
        <div>
          <Input id='email' name='email' placeholder='Email' onChange={props.inputChangeHandler} />
        </div>
        <div>
          <Input id='user-name' name='username' placeholder='Username' onChange={props.inputChangeHandler} />
        </div>
        <div>
          <Input id='password' name='password' placeholder='Password' onChange={props.inputChangeHandler} />
        </div>
        <div>
          <Button id="submit-login-form" onClick={}>Submit</Button>
        </div>
      </Container>
    </>
  )
}

export default LoginForm