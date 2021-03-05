import React, { Component } from 'react';
import InfoUser from './InfoUser';
import ActiveBooks from './ActiveBooks';

export default class UserProfile extends Component {
  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        <InfoUser user={user} />
        <ActiveBooks />
      </React.Fragment>
    );
  }
}
