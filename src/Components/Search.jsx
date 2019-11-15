import React, { Component } from "react";
import { Menu, Input, Icon } from "semantic-ui-react";
import { NavLink, withRouter } from "react-router-dom";
import { searchTrail } from "../Modules/trailsData";

class Search extends Component {
  state = {
    query: "",
    errorMessage: "",
    searchResults: []
  };

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  getSearchResults = async () => {
    const { query } = this.state;
    let response = await searchTrail(query);
    if (response.error_message) {
      this.setState({
        errorMessage: response.error_message
      });
    } else {
      this.props.history.push("/search", { searchResults: response });
    }
  };

  render() {
    let search;

    search = (
      <Menu.Item id="nav-search">
        <Input
          id="search-input"
          placeholder="Search..."
          name="query"
          onChange={this.inputChangeHandler}
        />
        <Icon
          id="search-submit"
          name="search"
          onClick={this.getSearchResults}
        />
      </Menu.Item>
    );

    return <>{search}</>;
  }
}

export default withRouter(Search);
