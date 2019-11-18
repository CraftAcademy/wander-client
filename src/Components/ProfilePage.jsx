import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Container, Divider, Card, Image } from 'semantic-ui-react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const ProfilePage = ({ currentUser }) => {
  const [bookmarks, setBookmarks] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const getBookmarks = async () => {
      try {
        let response = await axios.get('http://localhost:3000/v1/bookmarks')
        setBookmarks(response.data)
      } catch(error) {
        console.log(error)
      }
    }
    getBookmarks()
  }, [])

  return (
    <Container>
      <h1 id='user-name'>{currentUser.attributes.name}</h1>
      <Divider />
      <br></br>
      <div>
        <h2>Email:</h2>
        <h3 id='user-email'>{currentUser.attributes.uid}</h3>
      </div>
      {bookmarks.length > 0 && 
        bookmarks.map(bookmark => {
          let trim_ingress = bookmark.description.substr(0, 75)
          let ingress = trim_ingress.substr(0, Math.min(trim_ingress.length, trim_ingress.lastIndexOf(" "))) + ' ...'            
          return  <NavLink id={`trail_${bookmark.id}`} key={bookmark.id} to={`/trails/${bookmark.id}`}>
                    <Card id={`card_${bookmark.id}`}>
                      <Image
                        id={`image_${bookmark.id}`}
                        src={bookmark.image}
                      />
                      <Card.Header id={`title_${bookmark.id}`}>{bookmark.title}</Card.Header>
                      <Card.Description id={`description_${bookmark.id}`}>Description:  {ingress}</Card.Description>
                      <Card.Description id={`extra_${bookmark.id}`}>Good to Know:  {bookmark.extra}</Card.Description>
                      <Card.Meta id={`location_${bookmark.id}`}>Location:  {bookmark.location}</Card.Meta>
                      <Card.Meta id={`continent_${bookmark.id}`}>Continent:  {bookmark.continent}</Card.Meta>
                      <Card.Meta id={`duration_${bookmark.id}`}>Duration:  {bookmark.duration} min</Card.Meta>
                      <Card.Meta id={`intensity_${bookmark.id}`}>Intensity Level:  {bookmark.intensity}</Card.Meta>
                    </Card>
                  </NavLink>
          
        })}
      {errorMessage}
    </Container>
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