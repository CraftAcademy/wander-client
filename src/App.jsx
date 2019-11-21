import React, { useEffect } from 'react'
import { Route, Router, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { connect } from 'react-redux'
// import { generateRequireSignInWrapper } from 'redux-token-auth'
import LandingPage from './Components/LandingPage'
import SpecificTrail from './Components/SpecificTrail'
import CreateTrail from './Components/CreateTrail'
import Navbar from './Components/Navbar'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import MapContainer from './Components/MapContainer'
import SearchResults from './Components/SearchResults'
import ProfilePage from './Components/ProfilePage'
import AboutUs from './Components/AboutUs'
import axios from 'axios'
import getCurrentCredentials from './Modules/credentials'
import ContinentResults from './Components/ContinentResults'

const history = createBrowserHistory({})

const App = ({ currentUser }) => {
  useEffect(() => {
    axios.defaults.headers = getCurrentCredentials()
  }, [currentUser])

  return (
    <Router history={history}>
      <>
        <Navbar />
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/trails/:id' component={SpecificTrail}/>
        {currentUser.isSignedIn ? <Route exact path='/create' component={CreateTrail}/> : <Redirect to='/'/>}
        <Route exact path='/search' component={SearchResults}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/signup' component={SignUp}/>
        <Route exact path='/map' component={MapContainer}/>
        {currentUser.isSignedIn ? <Route exact path='/user/:name' component={ProfilePage}/> : <Redirect to='/'/>}
        <Route exact path='/about' component={AboutUs}/>
        <Route exact path='/continent' component={ContinentResults}/>
      </>
    </Router>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  }
}

export default connect(mapStateToProps)(App)
