import React from 'react'
import { Container, Input, Button } from 'semantic-ui-react'

const SignUpForm = (props) => {
  return (
    <>
      <Container id='signup-form'>
        <div>
          <Input id='email-input' name='email' placeholder='Email' onChange={props.inputChangeHandler} />
        </div>
        <div>
          <Input id='name-input' name='name' placeholder='Username' onChange={props.inputChangeHandler} />
        </div>
        <div>
          <Input id='password-input' name='password' placeholder='Password' onChange={props.inputChangeHandler} />
        </div>
        <div>
          <Input id='password-confirmation-input' name='password_confirmation' placeholder='Password Confirmation' onChange={props.inputChangeHandler} />
        </div>
        <div>
          <Button id="submit-signup-form" onClick={props.handleSignup}>Submit</Button>
        </div>
      </Container>
    </>
  )
}

export default SignUpForm