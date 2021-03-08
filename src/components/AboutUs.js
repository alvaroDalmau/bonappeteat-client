import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import LogForm from './LogForm';
import axios from 'axios';
import config from '../config';

class AboutUs extends Component {
  state = {
    loggedInUser: null,
  };

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
            
            this.props.history.push(`/profile/${this.state.loggedInUser._id}`);
          }
        );
      })
      .catch(err => {
        console.log('Error signing');
      });
  };

  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        <h1>Bon Appeteat</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod
          tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex
          ea commodi consequat. Quis aute iure reprehenderit in voluptate velit
          esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat
          cupiditat non proident, sunt in culpa qui officia deserunt mollit anim
          id est laborum.
        </p>
        <LogForm onSign={this.handleSign} />
      </React.Fragment>
    );
  }
}
export default withRouter(AboutUs);
