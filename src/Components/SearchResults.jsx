import React, { useState, useEffect } from "react"
import { Card, Image, Header } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const SearchResults = props => {

  const [results, setResults] = useState([]);

  useEffect(() => {
    setResults(props.location.state.searchResults)
  }, []);
  
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
                      <Card.Description id={`description_${trail.id}`}>{trail.description}</Card.Description>
                      <Card.Description id={`extra_${trail.id}`}>{trail.extra}</Card.Description>
                      <Card.Meta id={`location_${trail.id}`}>{trail.location}</Card.Meta>
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
      <Header as='h2' textAlign='center'>Found adventures</Header>      
    <div id='trail-list'>
        {trailsList}
      </div>
    </div>
  );
};

export default SearchResults;
