//IMPORTED LIBRARIES
import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import config from './config';

//IMPRTED COMPONENTS
import NavBar from './components/NavBar';
import Home from './components/Home.js';
import RestaurantDetails from './components/RestaurantDetails';
import UserProfile from './components/UserProfile';
import FormBooking from './components/FormBooking';

//RUNNING UP
class App extends Component {
  state = {
    loggedInUser: null,
    fetching: true,
  };

  //set state depends of session
  componentDidMount() {
    if (!this.state.loggedInUser) {
      axios
        .get(`${config.API_URL}/api/user`, { withCredentials: true })
        .then(response => {
          this.setState({
            loggedInUser: response.data,
            fetching: false,
          });
        })
        .catch(() => {
          console.log('Error grabing data from user session');
          this.setState({
            fetching: false,
          });
        });
    }
  }

  //create user
  handleSign = event => {
    event.preventDefault();
    let user = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    axios
      .post(`${config.API_URL}/api/user/log`, user, { withCredentials: true })
      .then(response => {
        this.setState(
          {
            loggedInUser: response.data,
          },
          () => {
            this.props.history.push('/');
          }
        );
      })
      .catch(err => {
        console.log('Error signing');
      });
  };

  //logOUT and delete session
  handleLogOut = () => {
    axios
      .post(`${config.API_URL}/api/logout`, {}, { withCredentials: true })
      .then(response => {
        this.setState({
          loggedInUser: null,
        });
      })
      .catch(err => {
        console.log('Failing loging out');
      });
  };

  //change user details
  handleChange = event => {
    event.preventDefault();
    let user = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    console.log(user);
    axios
      .patch(`${config.API_URL}/api/user`, user, { withCredentials: true })
      .then(response => {
        this.setState(
          {
            loggedInUser: response.data,
          },
          () => {
            this.props.history.push('/profile');
          }
        );
      })
      .catch(err => {
        console.log('Error changing profile details');
      });
  };

  //change img user
  handleImgProfile = updatedUser => {
    this.setState({
      loggedInUser: updatedUser,
    });
  };

  // Delete User
  handleDelete = () => {
    axios
      .delete(`${config.API_URL}/api/user`, { withCredentials: true })
      .then(() => {
        this.setState({ loggedInUser: null }, () => {
          this.props.history.push('/');
        });
      })
      .catch(() => {
        console.log('Failed deleting user profile');
      });
  };

  render() {
    //variable declaration
    const { loggedInUser, fetching } = this.state;
    if (fetching) {
      return <p>Loading</p>;
    }
    //running
    return (
      <React.Fragment>
        <NavBar loggedInUser={loggedInUser} onLogOut={this.handleLogOut} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return <Home onSign={this.handleSign} user={loggedInUser} />;
            }}
          />
          <Route
            path="/restaurant/:restaurantId"
            render={routeProps => {
              <RestaurantDetails {...routeProps} />;
            }}
          />
          <Route
            path="/profile"
            render={routeProps => {
              return (
                <UserProfile
                  changeImg={this.handleImgProfile}
                  loggedInUser={loggedInUser}
                  changeUser={this.handleChange}
                  deleteUser={this.handleDelete}
                  {...routeProps}
                />
              );
            }}
          />
          <Route
            path="/:restauranId/create"
            user={loggedInUser}
            component={FormBooking}
          />
        </Switch>
      </React.Fragment>
    );
  }
}
export default withRouter(App);
