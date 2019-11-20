import React from 'react'
import { Container, Divider, Header, Icon } from 'semantic-ui-react'
import TeamPic from '../Images/teampic1.png'
import logo from '../Images/logo.svg'

const AboutUs = () => {
  const teamPic = <img src={TeamPic} alt='Wander team pic'/>
  return (
    <>
      <Container textAlign='center' >
        <br/>
        <Header size='huge'> <Icon name='tree'/> About Wander </Header>
        <Divider/>
        <Container text>
        <p>Developed in November 2019, Wander is a platform built for nature and hiking lovers across the globe that share
          a passion for adventure.</p> We hope our platform can help to inspire others to go out and explore their surroundings. 
          <p>Wander let's you share your favorite trails with others but also let's you discover new ones!</p>
          <p>By becoming a part of the wander family and creating your own trail, adding photos or commenting on trails you help show the world what wonders exist on our planet. </p><p>Please feel free to share your own journey!</p>
        </Container>
        <Divider/>
       
      </Container>
    </>
  )
}

export default AboutUs