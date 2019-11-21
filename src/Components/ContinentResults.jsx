import React, { useState, useEffect } from 'react'
import { Card, Image, Header, Container, Grid, Label } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const ContinentResults = (props) => {
  const [results, setResults] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    setResults(props.location.state.searchResults)
  }, [])

  useEffect(() => {
    setErrorMessage(props.location.state.errorMessage)
  }, [])
  
  let trailsList, errorStatement, goBack

  goBack = () => {
    props.history.goBack()
  }

  if (errorMessage) {
    errorStatement = (
      <p id='error-message'>{errorMessage}</p>
    )
  }

  if (results) {
    trailsList = (
      <>
        {results.map(trail => {
          let trim_ingress = trail.description.substr(0, 75)
          let ingress = trim_ingress.substr(0, Math.min(trim_ingress.length, trim_ingress.lastIndexOf(" "))) + ' ...'            
          return  <NavLink id={`trail_${trail.id}`} key={trail.id} to={`/trails/${trail.id}`}>
                    <Card color='olive' id={`card_${trail.id}`}>
                      <Image
                        id={`image_${trail.id}`}
                        src={trail.image}
                      />
                        <Card.Header id={`title_${trail.id}`}>{trail.title}</Card.Header>
                        <Card.Description id={`description_${trail.id}`}>Description:  {ingress}</Card.Description>
                        <Card.Meta id={`city_${trail.id}`}>City:  {trail.city}</Card.Meta>
                        <Card.Meta id={`country_${trail.id}`}>Country:  {trail.country}</Card.Meta>
                        <Card.Meta id={`continent_${trail.id}`}>Continent:  {trail.continent}</Card.Meta>
                        <Card.Meta id={`intensity_${trail.id}`}>Intensity Level:  {trail.intensity}</Card.Meta>
                    </Card>
                  </NavLink>
        })}
      </>
    )
  }

  return (
    <div id='search-results'>
    <br/>
      <Label as='a' color='olive' id='back-button' onClick={goBack} href='#'>Go Back</Label>    
      <Header as='h2' textAlign='center'>Adventures in this part of the world</Header>      
      <Container id='trail-list'>
       <Grid centered container columns={4}>
          {trailsList}
        </Grid>
      </Container>
      {errorStatement}
    </div>
  )
}

export default ContinentResults