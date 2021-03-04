//IMPORTED LIBRARIES
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import config from './config';
import NavBar from './components/NavBar';
import Home from './components/Home.js';
import AboutUs from './components/AboutUs'
import Restaurant from './components/Restaurants'

//IMPRTED COMPONENTS
// import NavBar from './components/NavBar';

//RUNNING UP
class App extends Component {
  state = {
    restaurants: [],
    loggedInUser: null,
  };

  componentDidMount() {
         axios
           .get(`http://localhost:5005/api/restaurants`)
           .then((response) => {
             console.log("restaurants fetched");
             this.setState({
               restaurants: response.data,
             });
           })
           .catch(() => {
             console.log("error");
           });
    if (!this.state.loggedInUser) {
      axios
        .get(`${config.API_URL}/api/user`, { withCredentials: true })
        .then(response => {
          this.setState({
            loggedInUser: response.data,
          });
        })
        .catch(() => {
          console.log('Error grabing data from user session');
        });
    }
  }

  render() {
    //variable declaration
    const { loggedInUser,restaurants } = this.state;

    //running
    return (
      <React.Fragment>
        {/* <NavBar user={loggedInUser}/> */}
        <Switch>
          <Route exact path="/" render={()=>{
            return <Home user={loggedInUser} restaurants={restaurants}/>;
          }}/>

          <Route patch="/restaurant" />
          <Route patch="/profile" user={loggedInUser} />
        </Switch>
      </React.Fragment>
    );
  }
}
export default App
