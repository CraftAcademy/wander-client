import React from 'react'
import { Container, Input, Button, Header } from 'semantic-ui-react'

const SignUpForm = (props) => {
  return (
    <>
      <Header as='h2' textAlign='center'>Sign up to share & save your favorite adventures</Header>

      <Container id='signup-form'>
        <div>
          <Input id='email-input' className='input' name='email' placeholder='Email' onChange={props.inputChangeHandler} />
        </div>
        <div>
          <Input id='name-input' className='input' name='name' placeholder='Username' onChange={props.inputChangeHandler} />
        </div>
        <div>
          <Input id='password-input' className='input' name='password' placeholder='Password' onChange={props.inputChangeHandler} />
        </div>
        <div>
          <Input id='password-confirmation-input' className='input' name='password_confirmation' placeholder='Password Confirmation' onChange={props.inputChangeHandler} />
        </div>
        <div>
          <Button id="submit-signup-form" onClick={props.handleSignup}>Submit</Button>
        </div>
      </Container>
    </>
  )
}

export default SignUpForm