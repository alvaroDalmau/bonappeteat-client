import axios from 'axios';
import config from '../config';
import React, { Component } from 'react';

export default class InfoUser extends Component {
  state = {
    loggedInUser: this.props.loggedInUser,
    password: '',
  };

  handlePasswordChange = event => {
    event.preventDefault();
    let password = event.target.value;
    this.setState({
      password,
    });
  };

  handleImageChange = event => {
    event.preventDefault();
    let image = event.target.image.files[0];
    console.log(image);
    const formData = new FormData();
    formData.append('image', image);
    console.log(formData);
    axios
      .post(`${config.API_URL}/api/uploadprofile`, formData, {
        withCredentials: true,
      })
      .then(response => {
        this.setState({ loggedInUser: response.data }, () => {
          this.props.changeImg(response.data);
        });
      })
      .catch(err => {
        console.log('Failing uploading img profile');
      });
  };

  render() {
    const { changeUser, deleteUser } = this.props;
    const { loggedInUser } = this.state;
    return (
      <React.Fragment>
        <img src={loggedInUser.image} />
        <button>Edit your profile details</button>

        <form onSubmit={this.handleImageChange} encType="multipart/form-data">
          <input type="file" name="image" accept="image/png, image/jpg" />
          <button>Submit</button>
        </form>

        <form onSubmit={changeUser}>
          <label>Email:</label>
          <input
            name="email"
            type="email"
            defaultValue={loggedInUser.email}
          ></input>
          <label>Password:</label>
          <input
            onChange={this.handlePasswordChange}
            name="password"
            type="password"
            placeholder="****"
            value={this.state.password}
          ></input>
          <button type="submit">Apply changes</button>
        </form>
        <button>Your bookings</button>
        <button onClick={deleteUser}>Delete Account</button>
      </React.Fragment>
    );
  }
}
