import React, { Component } from 'react';
import LogForm from './LogForm';
import AboutUsCSS from './AboutUs.css';

export default class AboutUs extends Component {
  render() {
    const { onSign } = this.props;
    return (
      <React.Fragment>
        <h1>Enjoy your meal!</h1>
        <p>
          Bon Appeteat is an app for restaurants searching and booking. Here you
          can find any restaurant you want and make your booking in the easiest
          and fastest way. To become a Bon Appeteater and enjoy all the
          advantages that this app gives you, you just have to make an account
          below.
        </p>
        <br />
        <p>Have fun!</p>
        <LogForm onSign={onSign} />
      </React.Fragment>
    );
  }
}
