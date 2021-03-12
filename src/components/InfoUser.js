import axios from 'axios';
import config from '../config';
import React, { Component } from 'react';
import InfoUserCss from './InfoUser.css';

export default class InfoUser extends Component {
  state = {
    loggedInUser: this.props.loggedInUser,
    password: '',
    displayEdit: false,
    iconEdit: '+',
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

  handleDisplayEdit = () => {
    !this.state.displayEdit
      ? this.setState({ displayEdit: true, iconEdit: '-' })
      : this.setState({ displayEdit: false, iconEdit: '+' });
  };

  render() {
    const { changeUser, deleteUser } = this.props;
    const { loggedInUser, displayEdit, iconEdit } = this.state;
    return (
      <React.Fragment>
        <img className="img-profile" src={loggedInUser.image} />
        <a
          onClick={this.handleDisplayEdit}
          className="account-btn transparency"
        >
          {iconEdit} Edit your profile details
        </a>
        {displayEdit ? (
          <div>
            <p>Profile photo:</p>
            <form
              className="form-photo"
              onSubmit={this.handleImageChange}
              encType="multipart/form-data"
            >
              <input type="file" name="image" accept="image/png, image/jpg" />
              <button className="btn btn-primary">Upload</button>
            </form>

            {/* <form onSubmit={changeUser}>
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
        </form> */}

            <form className="logForm" onSubmit={changeUser}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  defaultValue={loggedInUser.email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  onChange={this.handlePasswordChange}
                  type="password"
                  name="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={this.state.password}
                  placeholder="******"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Apply changes
              </button>
            </form>

            <button
              onClick={deleteUser}
              type="button"
              className="btn btn-outline-danger btn-delete"
            >
              Delete Account
            </button>
            <p className="form-text text-muted" style={{ marginTop: '0' }}>
              FYI, That's not cool buddy
            </p>
          </div>
        ) : (
          <div></div>
        )}
      </React.Fragment>
    );
  }
}
