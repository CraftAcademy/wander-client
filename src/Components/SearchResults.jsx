import React, { useState, useEffect } from "react"
import { Grid, Card, Image, Header, Label, Message } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const SearchResults = props => {
  
  const [results, setResults] = useState([])

  useEffect(() => {
    setResults(props.location.state.searchResults)
  }, [])
  
  let trailsList, goBack

  goBack = () => {
    props.history.goBack()
  }

  if (results.length !== 0) {
    trailsList = (
      <>
        {results.map(trail => {
          let trim_ingress = trail.description.substr(0, 71)
          let ingress = trim_ingress.substr(0, Math.min(trim_ingress.length, trim_ingress.lastIndexOf(" "))) + ' ...'            
          return  <NavLink id={`trail_${trail.id}`} key={trail.id} to={`/trails/${trail.id}`}>
                    <Card color='olive' id={`card_${trail.id}`}>
                      <Image
                        id={`image_${trail.id}`}
                        src={trail.image}
                        object-fit='cover'
                        height='200px'
                      />
                      <Card.Content>
                        <Card.Header as='h3' id={`title_${trail.id}`}>{trail.title}</Card.Header>
                        <Card.Description id={`description_${trail.id}`}>{ingress}</Card.Description>
                        <Card.Meta id={`city_${trail.id}`}>City: {trail.city}</Card.Meta>
                        <Card.Meta id={`country_${trail.id}`}>Country: {trail.country}</Card.Meta>
                        <Card.Meta id={`continent_${trail.id}`}>Continent: {trail.continent}</Card.Meta>
                      </Card.Content>
                      <Card.Content extra id={`intensity_${trail.id}`}>Intensity Level: {trail.intensity}</Card.Content>
                    </Card>
                  </NavLink>
        })}
      </>
    )
  } else {
    trailsList = (
      <center><Message negative compact='true'>Sorry, there are no trails that match your search.</Message></center>
    ) 
  }
  return (
    <div id='search-results'>
      <Header as='h2' textAlign='center'>Found adventures</Header>  
      <Label as='a' color='olive' id='back-button' onClick={goBack} href='#'>Go Back</Label>    
      <Grid centered container columns={4} id='trail-list'>
        {trailsList}
      </Grid>
    </div>
  )
}

export default SearchResults
