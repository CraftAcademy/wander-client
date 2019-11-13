import React from 'react'
import { Route } from 'react-router-dom'
import LandingPage from './Components/LandingPage'
import SpecificTrail from './Components/SpecificTrail'
import CreateTrail from './Components/CreateTrail'
import Navbar from './Components/Navbar'

const App = () => {
  return (
    <>
      <Navbar />
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/trails/:id' component={SpecificTrail} />
      <Route exact path='/create' component={CreateTrail} />
    </>
  )
}

export default App
