import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo-bonAppeteat.png';
import menu from '../hamburguer-icon.png';

export default class NavBar extends Component {
  state = {
    display: false,
  };

  handleDisplay = () => {
    !this.state.display
      ? this.setState({ display: true })
      : this.setState({ display: false });
  };

  render() {
    const { loggedInUser, onLogOut } = this.props;
    const { display } = this.state;
    return (
      <React.Fragment>
        <div className="logoNav">
          {/* Logo and name */}
          <a className="aNav" href="/">
            <img alt="logo bonappeteat" src={logo} />
            <p>BonAppeteat</p>
          </a>
          <img
            onClick={this.handleDisplay}
            className="hamburguer-icon"
            src={menu}
            atl="menu"
          />
        </div>
        {/* nav --- depends if user is logged or not */}
        {display ? (
          !loggedInUser ? (
            <a
              className="account-btn"
              href="#form"
              onClick={this.handleDisplay}
            >
              Account
            </a>
          ) : (
            <nav>
              <Link
                className="account-btn"
                to="/profile"
                onClick={this.handleDisplay}
              >
                Profile
              </Link>{' '}
              <Link
                className="account-btn transparency"
                to="/"
                onClick={onLogOut}
              >
                Log OUT
              </Link>
            </nav>
          )
        ) : (
          <div></div>
        )}
      </React.Fragment>
    );
  }
}
