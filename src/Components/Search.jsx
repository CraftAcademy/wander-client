import React, { Component } from "react"
import { Menu, Input, Icon, Message, Label } from "semantic-ui-react"
import { withRouter } from "react-router-dom"
import { searchTrail } from "../Modules/trailsData"

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
    if (query.length < 3) {
      this.setState({
        errorMessage: true
      })
    } else {
      let response = await searchTrail(query)
      if (response.error_message) {
        this.setState({
          errorMessage: response.error_message
        })
      } else {
        this.props.history.push("/search", { searchResults: response })
      }
    }
  }

  render() {
    let search, errorMessage

    if (this.state.errorMessage) {
      errorMessage = <p id="search-error-message">{this.state.errorMessage}</p>
    }

    search = (
      <Menu.Item id="nav-search">
        <Input
          id="search-input"
          placeholder="Search..."
          name="query"
          onChange={this.inputChangeHandler}
          error={this.state.errorMessage}
        />
        <Icon
          id="search-submit"
          name="search"
          onClick={this.getSearchResults}
        />
        {this.state.errorMessage && (
          <Label id='search-error' pointing='left'>Please input more than 2 characters.</Label>
        )}
      </Menu.Item>
    )

    return (
      <>
        {search}
        {errorMessage}
      </>
    )
  }
}

export default withRouter(Search)
