import React, { Component } from 'react';
import InfoUser from './InfoUser';
import ActiveBooks from './ActiveBooks';
import { Redirect } from 'react-router-dom';

export default class UserProfile extends Component {
  render() {
    const {
      loggedInUser,
      bookings,
      changeUser,
      deleteUser,
      changeImg,
    } = this.props;
    if (!loggedInUser) {
      return <Redirect to={'/'} />;
    }
    return (
      <React.Fragment>
        <InfoUser
          changeImg={changeImg}
          loggedInUser={loggedInUser}
          changeUser={changeUser}
          deleteUser={deleteUser}
          {...this.props}
        />
        <ActiveBooks bookings={bookings} />
      </React.Fragment>
    );
  }
}
