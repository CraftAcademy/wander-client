import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Container, Divider, Card, Image, Grid, Button } from 'semantic-ui-react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const ProfilePage = ({ currentUser }) => {
  const [bookmarks, setBookmarks] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  const getBookmarks = async () => {
    try {
      let response = await axios.get('http://localhost:3000/v1/bookmarks')
      setBookmarks(response.data.data)
    } catch(error) {
      debugger
      setErrorMessage(error.response.data.error_message)
    }
  }

  useEffect(() => {
    getBookmarks()
  }, [])
  
  const deleteBookmark = async id => {
    try{
      const response = await axios.delete(`http://localhost:3000/v1/bookmarks/${id}`)
      setBookmarks(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <Container>
      <h1 id='user-name'>{currentUser.attributes.name}</h1>
      <Divider />
      <br></br>
      <div>
        <h2>Email:</h2>
        <h3 id='user-email'>{currentUser.attributes.uid}</h3>
      </div>
    </Container>
    <Container>

    </Container>
    <Container>
      <h2>Your Bookmarked Adventures</h2>
      {errorMessage && <center><h3>{errorMessage}</h3></center>}
      <Grid centered container columns={3} id='bookmark-list'>
        <Grid.Row>
          {bookmarks.length > 0 && 
            bookmarks.map(bookmark => {
              let trim_ingress = bookmark.description.substr(0, 75)
              let ingress = trim_ingress.substr(0, Math.min(trim_ingress.length, trim_ingress.lastIndexOf(" "))) + ' ...'
              return    <Card id={`card_${bookmark.id}`}>
                          <Button id='delete-button' name='hello' onClick={() => deleteBookmark(bookmark.id)}>Remove Bookmark</Button>
                          <Image
                            id={`image_${bookmark.id}`}
                            src={bookmark.image}
                            key={bookmark.id} as={NavLink} to={`/trails/${bookmark.id}`}
                          />
                          <Card.Header id={`title_${bookmark.id}`}>{bookmark.title}</Card.Header>
                          <Card.Description id={`description_${bookmark.id}`}>Description:  {ingress}</Card.Description>
                          <Card.Description id={`extra_${bookmark.id}`}>Good to Know:  {bookmark.extra}</Card.Description>
                          <Card.Meta id={`location_${bookmark.id}`}>Location:  {bookmark.location}</Card.Meta>
                          <Card.Meta id={`continent_${bookmark.id}`}>Continent:  {bookmark.continent}</Card.Meta>
                          <Card.Meta id={`duration_${bookmark.id}`}>Duration:  {bookmark.duration} min</Card.Meta>
                          <Card.Meta id={`intensity_${bookmark.id}`}>Intensity Level:  {bookmark.intensity}</Card.Meta>
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