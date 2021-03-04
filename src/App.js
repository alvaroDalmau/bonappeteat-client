import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import AboutUs from './components/AboutUs'

 class App extends Component {
  render() {
    return <React.Fragment>
      <NavBar />
      <Switch>
        <Route exact patch='/' render={(routerProps)=>{
          return(
            <NavBar {...routerProps}/>,
            <Home {...routerProps}/>,
            <AboutUs {...routerProps}/>
          )
        }}/>
        <Route patch='/restaurant'/>
        <Route patch='/profile'/>
      </Switch>
    </React.Fragment>;
  }
}
export default App