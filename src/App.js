import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';

export default class App extends Component {
  render() {
    return <React.Fragment>
      <NavBar />
      <Switch>
        <Route patch='/'/>
        <Route patch='/restaurant'/>
        <Route patch='/profile'/>
      </Switch>
    </React.Fragment>;
  }
}
