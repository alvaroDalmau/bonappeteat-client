import React, { Component } from 'react';

export default class InfoUser extends Component {
  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        <button>Edit your profile details</button>
        <form>
          <input type="text" placeholder="aqui va cloudinary"></input>
          <label>Email:</label>
          <input type="email" placeholder="email"></input>
          <label>Password:</label>
          <input type="password" placeholder="****"></input>
          <button>Apply changes</button>
        </form>
        <button>Delete Account</button>
      </React.Fragment>
    );
  }
}
