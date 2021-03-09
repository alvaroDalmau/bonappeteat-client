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

  handleEditEmail = (event) => {
    let text = event.target.value;

    let clonedUser = JSON.parse(JSON.stringify(this.state.userInfo));
    clonedUser.email = text;

    this.setState({
      userInfo: clonedUser,
    });
  };

  handleEditPassword = (event) => {
    let text = event.target.value;

    let clonedUser = JSON.parse(JSON.stringify(this.state.userInfo));
    clonedUser.password = text;

    this.setState({
      userInfo: clonedUser,
    });
  };  
  
  handleEditForm = (event) => {
    let uploadForm = new FormData();
    uploadForm.append("imageUrl", image);
    
    axios.post(`${config.API_URL}/api/upload`, uploadForm)
      .then((response)=>{
        axios
          .patch(`${config.API_URL}/api/user/${this.state.userInfo._id}`, {
            // email: this.state.userInfo.email,
            // password: this.state.userInfo.password,
            // image: response.data.image,
            email: event.target.value.email,
            password: event.target.value.password,
            image: response.data.image,
          })

          .then((response) => {
            // let newUser = {
            //   email: ,
            //   password: ,
            //   image: ,
            // };

            this.setState(
              {
                userInfo: [response.data, ...this.state.userInfo],
              },
              () => {
                this.props.history.push(`/profile/${this.state.userInfo._id}`);
              }
            );
          })
          .catch(() => {
            console.log("error editing profile info");
          });
  })
  }

  render() {
    const { user } = this.props;
    const { showForm, userInfo } = this.state;
    return (
      <React.Fragment>
        {/* <InfoUser user={user} /> */}

        {showForm ? (
          <FormEditUser
            onEditEmail={this.handleEditEmail}
            onEditPassword={this.handleEditPassword}
            onEdit={this.handleEditForm}
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
              <br />
              <button>Delete Account</button>
            </form>
          </div>
        )}
        <ActiveBooks user={userInfo}/>
      </React.Fragment>
    );
  }
}
