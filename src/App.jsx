import React from 'react'
import { Route } from 'react-router-dom'
import LandingPage from './Components/LandingPage'
import CreateTrail from './Components/CreateTrail'

const App = () => {
  return (
    <>
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/create' component={CreateTrail} />
    </>
  )
}

export default App;
