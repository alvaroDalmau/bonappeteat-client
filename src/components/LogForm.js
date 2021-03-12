import React, { Component } from 'react';
import LogFormCss from './LogForm.css';

export default class LogForm extends Component {
  render() {
    const { onSign } = this.props;
    return (
      <React.Fragment>
        {/* <form id="form" onSubmit={onSign}>
          <label>Email address</label>
          <input type="email" name="email" />

          <label>Password</label>
          <input name="password" type="password" />

          <button type="submit">Submit</button>
        </form> */}

        <form className="logForm" onSubmit={onSign}>
          <p id="emailHelp" className="form-text text-muted">
            If you have no account this will create you one. In case you've
            already got one, this will sign you in
          </p>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}
