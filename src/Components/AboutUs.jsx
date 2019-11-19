import React from 'react'
import { Container, Divider, Grid, Image, Header, Icon, Table, List } from 'semantic-ui-react'
import TeamPic from '../Images/teampic1.png'

const AboutUs = () => {
  const teamPic = <img src={TeamPic} alt='Wander team pic'/>
  return (
    <>
      <Container textAlign='center' >
        <br/>
        <Header size='huge' content='Team Wander'/>
        <Divider/>
        <p>Wander let's you share your favorite trails with others but also let's you discover new ones!</p>
          <p>By becoming a part of the wander family and creating your own trail, adding photos or commenting on trails you help show the world what wonders exist on our planet. Please feel free to share your own journey!</p>
       <br/>
        <p>Developed in November 2019, Wander is a platform built for nature and hiking lovers across the globe that share
          a passion for adventure.</p> We hope our platform can help to inspire others to go out and explore their surroundings. 
<Container>
        <Header size='medium'>Who are we?</Header> 
        <Container>We are an elite alien space force tasked to bring you the best trailfinding app currently available on earth.
            We love you!</Container>
  
        <Grid>    
          <Grid.Column columns='3' width='6'>
            <Image rounded size='large' > {teamPic}</Image>
          </Grid.Column>         
          
          <Grid.Column verticalAlign='middle' width='4'>
            <h2>The Team</h2>
            <Divider/>
            <h3>Jonas Masharqa</h3> 
            <h3>David Izosimov</h3>
            <h3>Luca Lobacher</h3>
            <h3>Alex Saxena</h3>
            <h3>Pia von Wachenfelt</h3>
          </Grid.Column>
          <Grid.Column verticalAlign='middle' width='4'> 
            <Table collapsing>
              <Table.Header> 
                <Table.HeaderCell><Icon size='large' name='github square'/>GitHub Repositories</Table.HeaderCell>
              </Table.Header>
              <Table.Body>
                <Table.Row><Table.Cell><h4><a href='https://github.com/jonas-masharqa' ><Icon name='github'/>Jonas</a></h4></Table.Cell></Table.Row>
                <Table.Row> <Table.Cell><h4><a href='https://github.com/DavveDavve' ><Icon name='github'/>David</a></h4></Table.Cell></Table.Row>
                <Table.Row><Table.Cell><h4><a href='https://github.com/lucamarial' ><Icon name='github'/>Luca</a></h4></Table.Cell></Table.Row>
                <Table.Row><Table.Cell><h4><a href='https://github.com/AlexSaxena' ><Icon name='github'/>Alex</a></h4></Table.Cell></Table.Row>
                <Table.Row><Table.Cell><h4><a href='https://github.com/piavW' ><Icon name='github'/>Pia</a></h4></Table.Cell></Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid>
        </Container>
      </Container>
    </>
  )
}

export default AboutUs