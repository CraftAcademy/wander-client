import React, { Component } from 'react'
import { Menu, Input } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { searchTrail } from '../Modules/trailsData'

export default class Search extends Component {
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
    let response = await searchTrail(query)

    if (response.error_message) {
      this.setState({
        errorMessage: response.error_message
      })
    } else {
      this.setState({
        searchResults: response
      })
    }
  }

  render() {
    let search

    search = (
      <Menu.Item id='nav-search' to='/search' as={NavLink}>
        <Input className='icon' icon='search' placeholder='Search...' name='query' onChange={this.inputChangeHandler} />
      </Menu.Item>
    )

    return (
      <>
       {search} 
      </>
    )
  }
}

