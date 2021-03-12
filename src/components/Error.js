import React, { Component } from 'react';
import ErrorCss from './Error.css';
import errorIMG from '../error-img.png';

export default class Error extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>
          <b>404</b>
        </h1>
        <h2>Do you know what Pokemons and this page have in common?</h2>
        <h2>
          {' '}
          <b>They do not exist!</b>
        </h2>
        <img className="img-error" src={errorIMG} alt="pokemon error"></img>
      </React.Fragment>
    );
  }
}
