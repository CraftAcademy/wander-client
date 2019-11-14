import React from 'react'
import { NavLink } from 'react-router-dom'
import { Container, Input, Button, Message, Icon } from 'semantic-ui-react'

const LoginForm = (props) => {
  return (
    <>
      <Container id='login-form' textAlign='center'>
        <div>
          <Input id='email-input' className='input' name='email' placeholder='Email' onChange={props.inputChangeHandler} />
        </div>
        <div>
          <Input id='password-input' className='input' name='password' placeholder='Password' onChange={props.inputChangeHandler} />
        </div>
        <div>
          <Button id="submit-login-form" className='submit' onClick={props.handleLogin}>Submit</Button>
        </div>
        <div>
          <Message compact attached='bottom' positive className='signup-message'>
            <Icon name='help' />
            Not a member? Register <NavLink id='register' to='/signup'><a href='#'>here</a></NavLink>
          </Message>
        </div>
      </Container>
    </>
  )
}

export default LoginForm