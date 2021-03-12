import React, { Component } from 'react';
import LogForm from './LogForm';
import AboutUsCSS from './AboutUs.css'

export default class AboutUs extends Component {
  render() {
    const { onSign } = this.props;
    return (
      <React.Fragment>
        <h1>Enjoy your meal!</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod
          tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex
          ea commodi consequat. Quis aute iure reprehenderit in voluptate velit
          esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat
          cupiditat non proident, sunt in culpa qui officia deserunt mollit anim
          id est laborum.
        </p>
        <LogForm onSign={onSign} />
      </React.Fragment>
    );
  }
}
