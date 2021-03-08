import React, { Component } from 'react';
import logo from '../logo-bonAppeteat.png';
import { withRouter } from "react-router-dom";
import axios from "axios";
import config from "../config.js";

class NavBar extends Component {
  state = {
    loggedInUser: null,
  };
  
  handleLogout = (event) => {
    axios
      .post(`${config.API_URL}/api/logout`, {}, { withCredentials: true })
      .then((response) => {
        this.setState(
          {
            loggedInUser: null,
          },
          () => {
            this.props.history.push("/");
          }
        );
      })
      .catch(() => {
        console.log("error");
      });
  };

  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        {/* Logo and name */}
        <a href="/">
          <img alt="logo bonappeteat" src={logo} />
          <p>BonAppeteat</p>
        </a>

        {/* nav --- depends if user is logged or not */}
        {!user ? (
          <nav>
            <a href="#form">Account</a>
          </nav>
        ) : (
          <nav>
            <a href={`/profile/${user._id}`}>Profile</a>
            <button onClick={this.handleLogout}>Log OUT</button>
          </nav>
        )}
      </React.Fragment>
    );
  }
}
export default withRouter(NavBar)