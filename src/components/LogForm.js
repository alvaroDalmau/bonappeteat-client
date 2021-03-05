import React, { Component } from 'react';

export default class LogForm extends Component {
  render() {
    const { onSign } = this.props;
    return (
      <div>
        <form onSubmit={onSign}>
          <div>
          {/* DEPENDE */}
            <form onSubmit={this.props.onSign}>
              <div>
                <label htmlFor="InputEmail">Email address</label>
                <input type="email" name="email" />
              </div>
              <div>
                <label htmlFor="InputPassword">Password</label>
                <input name="password" type="password" />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
          <div>
            <label htmlFor="InputPassword">Password</label>
            <input name="password" type="password" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
