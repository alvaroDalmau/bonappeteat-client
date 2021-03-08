import React, { Component } from 'react';
import ActiveBooks from './ActiveBooks';
import FormEditUser from "./FormEditUser";
import axios from "axios";
import config from "../config.js";

export default class UserProfile extends Component {
  state = {
    showForm: false,
    userInfo: [],
  };

  componentDidMount() {
    let userId = this.props.match.params.userId;
    axios
      .get(`${config.API_URL}/api/user/${userId}`)
      .then((response) => {
        console.log("data fetched");
        this.setState({
          userInfo: response.data,
        });
      })
      .catch(() => {
        console.log("error getting user info");
      });
  }

  handleShowForm = () => {
    this.setState({ showForm: true });
  };

  handleEditForm=()=>{

  }
  
  render() {
    const { user } = this.props;
    const { showForm, userInfo } = this.state;
    return (
      <React.Fragment>
        {/* <InfoUser user={user} /> */}

        {showForm ? (
          <FormEditUser
            onEdit={this.handleEditChange}
            userInfo={userInfo}
          />
        ) : (
          <div>
            <h1>Your Profile</h1>
            <form>
              <img
                src={userInfo.image}
                alt="profilePic"
                width="110"
                height="110"
              ></img>
              <br />
              <div>Email: {userInfo.email}</div>
              <div>Password: ****</div>
              <br />
              <button onClick={this.handleShowForm}>
                Edit your profile info
              </button>
              <button >Delete Account</button>
            </form>
          </div>
        )}
        <ActiveBooks />
      </React.Fragment>
    );
  }
}
