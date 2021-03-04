import React, { Component } from 'react';
import logo from '../logo-bonAppeteat.png';

export default class NavBar extends Component {
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
            <a href="/user">Profile</a> <a href="/">Log OUT</a>
          </nav>
        )}
      </React.Fragment>
    );
  }
}
