import React, { Component } from 'react';
import AboutUs from './AboutUs.js';
import Restaurants from './Restaurants';

class Home extends Component {
  render() {
    const { user } = this.props;
    return (
      <React.Fragment>{!user ? <AboutUs /> : <Restaurants />}</React.Fragment>
    );
  }
}
export default Home;
