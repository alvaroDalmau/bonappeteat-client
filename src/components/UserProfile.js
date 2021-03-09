import React, { Component } from 'react';
import InfoUser from './InfoUser';
import ActiveBooks from './ActiveBooks';

export default class UserProfile extends Component {
  render() {
    const { loggedInUser, changeUser, deleteUser, changeImg } = this.props;
    return (
      <React.Fragment>
        <InfoUser
          changeImg={changeImg}
          loggedInUser={loggedInUser}
          changeUser={changeUser}
          deleteUser={deleteUser}
          {...this.props}
        />
        <ActiveBooks />
      </React.Fragment>
    );
  }
}
