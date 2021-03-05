import React, { Component } from 'react'

export default class LogForm extends Component {
    render() {
        return (
          <div>
          {/* DEPENDE */}
            <form onSubmit={this.props.onSignIn}>
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
        );
    }
}
