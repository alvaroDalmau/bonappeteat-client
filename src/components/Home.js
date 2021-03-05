import React, { Component } from 'react'
import AboutUs from './AboutUs.js'
import Restaurants from './Restaurants'

class Home extends Component {

  render() {
    const { user, restaurants } = this.props;
    return (
      <React.Fragment>
        {!user ? (<Restaurants />) : (
          <AboutUs  />
        )}
      </React.Fragment>
    );
  }
}
export default Home