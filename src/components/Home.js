import React, { Component } from 'react';
import AboutUs from './AboutUs.js';
import Restaurants from './Restaurants';

export default class Home extends Component {
  render() {
    const { loggedInUser, onSign } = this.props;
    console.log(this.props.location);
    return (
      <React.Fragment>
        {!loggedInUser ? <AboutUs onSign={onSign} /> : <Restaurants />}
      </React.Fragment>
    );
  }
}
