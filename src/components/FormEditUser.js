import React, { Component } from "react";
import FormPhotoUser from './FormPhotoUser'


export default class FormEditUser extends Component {
  render() {
    const { user, userInfo } = this.props;
    return (
      <React.Fragment>
        <h1>Edit your profile details</h1>
        {/* CLOUDINARY */}
        <FormPhotoUser />
        <form>
          <label>Email:</label>
          <input
            type="email"
            placeholder="email"
            value={userInfo.email}
          ></input>
          <label>Password:</label>
          <input
            type="password"
            placeholder="****"
            value={userInfo.password}
          ></input>
          <br />
          <button
          // onClick={() => {
          //   onEdit(userInfo);
          // }}
          >
            Apply changes
          </button>
        </form>
      </React.Fragment>
    );
  }
}
