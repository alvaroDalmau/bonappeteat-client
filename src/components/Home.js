import React, { Component } from 'react';
import AboutUs from './AboutUs.js';
import Restaurants from './Restaurants';

export default class Home extends Component {
  render() {
    const { user, onSign } = this.props;
    return (
      <React.Fragment>
        {!user ? <AboutUs onSign={onSign} /> : <Restaurants />}
      </React.Fragment>
    );
  }
}
