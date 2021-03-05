import React, { Component } from "react";

class Search extends Component {
  render() {
    return (
      <div>
        <input
          onChange={this.props.change}
          type="text"
          placeholder="Enter the name"
        ></input>
      </div>
    );
  }
}

export default Search;
