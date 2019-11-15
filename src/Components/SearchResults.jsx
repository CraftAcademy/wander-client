import React, { useState, useEffect } from "react";

const SearchResults = props => {

  const [results, setResults] = useState([]);

  useEffect(() => {
    setResults(props.location.state.searchResults)
  }, []);
  
  return (
    <div>
      {results.map(result => (
        <h1>{result.title}</h1>
      ))}
    </div>
  );
};

export default SearchResults;
