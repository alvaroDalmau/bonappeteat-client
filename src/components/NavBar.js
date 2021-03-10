import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../logo-bonAppeteat.png";

export default class NavBar extends Component {
  render() {
    const { loggedInUser, onLogOut } = this.props;
    return (
      <React.Fragment>
        {/* Logo and name */}
        <a href="/">
          <img alt="logo bonappeteat" src={logo} />
          <p>BonAppeteat</p>
        </a>

        {/* nav --- depends if user is logged or not */}
        {!loggedInUser ? (
          <nav>
            <a href="#form">Account</a>
          </nav>
        ) : (
          <nav>
            <Link to="/profile">Profile</Link>{" "}
            <Link to="/" onClick={onLogOut}>
              Log OUT
            </Link>
          </nav>
        )}
      </React.Fragment>
    );
  }
}
