import React, { useState, useEffect } from 'react'
import { Card, Image, Header } from 'semantic-ui-react'
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
  
  let trailsList, errorStatement

  if (errorMessage) {
    errorStatement = (
      <p id='error-message'>{errorMessage}</p>
    )
  }

  if (results) {
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
                      <Card.Description id={`description_${trail.id}`}>{trail.description}</Card.Description>
                      <Card.Description id={`extra_${trail.id}`}>{trail.extra}</Card.Description>
                      <Card.Meta id={`location_${trail.id}`}>{trail.location}</Card.Meta>
                      <Card.Meta id={`continent_${trail.id}`}>{trail.continent}</Card.Meta>
                      <Card.Meta id={`duration_${trail.id}`}>{trail.duration}</Card.Meta>
                      <Card.Meta id={`intensity_${trail.id}`}>{trail.intensity}</Card.Meta>
                    </Card>
                  </NavLink>
        })}
      </>
    )
  }

  return (
    <div id='search-results'>
      <Header as='h2' textAlign='center'>Adventures</Header>      
      <div id='trail-list'>
        {trailsList}
      </div>
      {errorStatement}
    </div>
  )
}

export default ContinentResults