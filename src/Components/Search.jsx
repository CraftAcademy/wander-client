import React, { Component } from 'react'
import { Menu, Input, Icon } from 'semantic-ui-react'
import { NavLink, withRouter } from 'react-router-dom'
import { searchTrail } from '../Modules/trailsData'

class Search extends Component {
  state = {
    query: '',
    errorMessage: '',
    searchResults: []
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  getSearchResults = async () => {
    const { query } = this.state
    this.props.location.state.searchQuery = query
    this.props.history.push('/search')
    // let response = await searchTrail(query)

    // if (response.error_message) {
    //   this.setState({
    //     errorMessage: response.error_message
    //   })
    // } else {
    //   this.setState({
    //     searchResults: response
    //   })
    // }
  }

  render() {
    let search

    search = (
      <Menu.Item id='nav-search' >
        <Input placeholder='Search...' name='query' onChange={this.inputChangeHandler} />
        <NavLink to='/search'>
          <Icon name='search' onClick={this.getSearchResults} />
        </NavLink>
      </Menu.Item>
    )

    return (
      <>
       {search} 
      </>
    )
  }
}

export default withRouter(Search)