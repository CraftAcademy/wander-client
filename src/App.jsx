import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import LandingPage from './Components/LandingPage'
import SpecificTrail from './Components/SpecificTrail'
import CreateTrail from './Components/CreateTrail'
import Navbar from './Components/Navbar'
import Login from './Components/Login'

const App = ({ currentUser }) => {
  return (
    <>
      <Navbar />
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/trails/:id' component={SpecificTrail} />
      <Route exact path='/create' component={CreateTrail} />
      <Route exact path='/login' component={Login}>
        {currentUser.isSignedIn ? <Redirect to='/' /> : <Login />}
      </Route>
    </>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  }
}

export default connect(
  mapStateToProps
)(App)