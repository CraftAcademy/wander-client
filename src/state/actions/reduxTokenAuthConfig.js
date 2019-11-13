import { generateAuthActions } from 'redux-token-auth'

const config = {
  authUrl: 'http://localhost:3000/auth',
  userAttributes: {
    uid: 'uid',
    email: 'email',
    name: 'name'
  }
}

const {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials
} = generateAuthActions(config)

export { registerUser, signInUser, signOutUser, verifyCredentials }