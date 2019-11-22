import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Container, Divider, Card, Image, Grid, Table, Button, Header, Icon } from 'semantic-ui-react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import Avatar from '../Images/greenavatar.png'

const ProfilePage = ({ currentUser }) => {
  const [bookmarks, setBookmarks] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [responseMessage, setResponseMessage] = useState(null)

  useEffect(() => {
    getBookmarks()
  }, [])

  const getBookmarks = async () => {
    try {
      let response = await axios.get('https://c-wander-api.herokuapp.com/v1/bookmarks')
      setBookmarks(response.data.data)
    } catch(error) {
      setErrorMessage(error.response.data.error_message)
    }
  }
  
  const deleteBookmark = async id => {
    try{
      const response = await axios.delete(`https://c-wander-api.herokuapp.com/v1/bookmarks/${id}`)
      setBookmarks(response.data.data)
      setResponseMessage(response.data.message)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <br/>
      <Container textAlign='center'>
        <Header as='h1' dividing>Profile</Header>
        <center>
        <Table basic='very' collapsing >
          <Table.Body>
              <Table.Cell>   
                <Image src={Avatar} size='small' circular />
              </Table.Cell>
              <Table.Cell>
                <Header as='h2' id='user-name'> {currentUser.attributes.name}</Header>
                <Header as='h3' id='user-email'>E-mail: {currentUser.attributes.uid}</Header>
              </Table.Cell>
            </Table.Body>
          </Table>
          </center>
      <Divider/>
      <center><h2>Your Bookmarked Adventures</h2></center>
      <br/>
      {errorMessage && <center><h3>{errorMessage}</h3></center>}
      {responseMessage && <center><h3 id='response-message'>{responseMessage}</h3></center>}
      <Grid centered container columns={3} id='bookmark-list'>
        <Grid.Row>
          {bookmarks && 
            bookmarks.map(bookmark => {
              let trim_ingress = bookmark.description.substr(0, 71)
              let ingress = trim_ingress.substr(0, Math.min(trim_ingress.length, trim_ingress.lastIndexOf(" "))) + ' ...'
              return  <Card className='bookmark-card' color='olive' id={`card_${bookmark.id}`}>
                        <Button id='delete-button' name='hello' onClick={() => deleteBookmark(bookmark.id)}>Remove Bookmark</Button>
                        <Image
                          className='bookmark-image'
                          id={`image_${bookmark.id}`}
                          src={bookmark.image}
                          key={bookmark.id} as={NavLink} to={`/trails/${bookmark.id}`}
                        />
                        <Card.Content>
                          <Card.Header as='h3' id={`title_${bookmark.id}`}>{bookmark.title}</Card.Header>
                          <Card.Description id={`description_${bookmark.id}`}>{ingress}</Card.Description>
                          <Card.Meta id={`city_${bookmark.id}`}>City: {bookmark.city}</Card.Meta>
                          <Card.Meta id={`country_${bookmark.id}`}>Country: {bookmark.country}</Card.Meta>
                          <Card.Meta id={`continent_${bookmark.id}`}>Continent: {bookmark.continent}</Card.Meta>
                          <div id='like-container'>
                            <Icon name='heart' color='red'/>
                            {bookmark.likes}
                          </div>
                        </Card.Content>
                        <Card.Content extra>
                          <Card.Meta id={`intensity_${bookmark.id}`}>Intensity Level: {bookmark.intensity}</Card.Meta>
                        </Card.Content>
                      </Card>
          })}
        </Grid.Row>
      </Grid>
    </Container>
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
)(ProfilePage)