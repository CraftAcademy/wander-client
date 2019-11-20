import React, { useState, useEffect } from "react"
import { Card, Image, Header } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const SearchResults = props => {

  const [results, setResults] = useState([])

  useEffect(() => {
    setResults(props.location.state.searchResults)
  }, [])
  
  let trailsList

  if (results.length !== 0) {
    trailsList = (
      <>
        {results.map(trail => {
          return  <NavLink id={`trail_${trail.id}`} key={trail.id} to={`/trails/${trail.id}`}>
                    <Card id={`card_${trail.id}`}>
                      <Image
                        id={`image_${trail.id}`}
                        src={trail.image}
                      />
                      <Card.Header id={`title_${trail.id}`}>{trail.title}</Card.Header>
                      <Card.Description id={`description_${trail.id}`}>Description: {trail.description}</Card.Description>
                      <Card.Description id={`extra_${trail.id}`}>Good to know: {trail.extra}</Card.Description>
                      <Card.Meta id={`city_${trail.id}`}>City: {trail.city}</Card.Meta>
                      <Card.Meta id={`country_${trail.id}`}>Country: {trail.country}</Card.Meta>
                      <Card.Meta id={`continent_${trail.id}`}>Continent: {trail.continent}</Card.Meta>
                      <Card.Meta id={`duration_${trail.id}`}>Duration: {trail.duration}</Card.Meta>
                      <Card.Meta id={`intensity_${trail.id}`}>Intensity: {trail.intensity}</Card.Meta>
                    </Card>
                  </NavLink>
        })}
      </>
    )
  }
  return (
    <div id='search-results'>
      <Header as='h2' textAlign='center'>Found adventures</Header>      
    <div id='trail-list'>
        {trailsList}
      </div>
    </div>
  )
}

export default SearchResults
