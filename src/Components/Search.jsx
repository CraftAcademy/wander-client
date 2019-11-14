import React, { Component } from 'react'
import { Menu, Input } from 'semantic-ui-react'

export default class Search extends Component {
  state = {
    query: ''
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    let search

    search = (
      <Menu.Item id='nav-search' to='/search'>
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

