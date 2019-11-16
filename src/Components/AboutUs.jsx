import React from 'react'
import { Container, Divider } from 'semantic-ui-react'

const AboutUs = () => {
  return (
    <>
      <Container textAlign='center' >
        <h1>Wander</h1>
        <Divider/>
        <p>Wander was developed as a final project hoping to inspire people to get out and explore nature around the world! </p>
        <h3>Who are we?</h3>
        <p>
          We are an elite alien space force tasked to bring you the best trailfinding app currently available on earth.
          We love you!
        </p>
        <div>
          <h1>Team Wander</h1>
          <h3>Luca Lobacher</h3>
          <h3>Alex Saxena</h3>
          <h3>Jonas Masharqa</h3>
          <h3>Pia von Wachenfelt</h3>
          <h3>David Izosimov</h3>
        </div>
      </Container>
    </>
  )
}

export default AboutUs