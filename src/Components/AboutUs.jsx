import React from 'react'
import { Container, Divider } from 'semantic-ui-react'
import TeamPic from '../Images/teampic.jpg'

const AboutUs = () => {
  const teamPic = <img src={TeamPic} alt='Wander team pic'/>
  return (
    <>
      <Container textAlign='center' >
        <h1>Wander</h1>
        <Divider/>
        <p>Developed in November 2019, Wander is a platform built for nature and hiking lovers across the globe that share
          a passion for adventure.</p>
          <p>Wander let's you share your favorite trails with others but also let's you discover new ones!
          Bookmark your favorite trails, like the ones you enjoyed, and comment what you thought about that specific trail you so
          bravely conquered!
        </p>
        <h3>Who are we?</h3>
        <p>
          We are an elite alien space force tasked to bring you the best trailfinding app currently available on earth.
          We love you!
        </p>
        <div>
          <h1>Team Wander</h1>
          {teamPic}
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