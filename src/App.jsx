import React from 'react'
import { Route } from 'react-router-dom'
import LandingPage from './Components/LandingPage'
import SpecificTrail from './Components/SpecificTrail'

const App = () => {
  return (
    <>
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/trails/:id' component={SpecificTrail} />
    </>
  )
}

export default App