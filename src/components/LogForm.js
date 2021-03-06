import React, { Component } from 'react';

export default class LogForm extends Component {
  render() {
    const { onSign } = this.props;
    return (
      <React.Fragment>
        <form id="form" onSubmit={onSign}>
          <label>Email address</label>
          <input type="email" name="email" />

          <label>Password</label>
          <input name="password" type="password" />

          <button type="submit">Submit</button>
        </form>
      </React.Fragment>
    );
  }
}
