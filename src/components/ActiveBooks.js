import React, { Component } from 'react';
import axios from "axios";
import config from "../config.js";

export default class ActiveBooks extends Component {
  state={
    bookings: []
  }
  // componentDidMount() {
  //   let userId = this.props.match.params.userId;
  //   axios
  //     .get(`${config.API_URL}/api/bookings`)
  //     .then((response) => {
  //       console.log("bookings fetched");
  //       this.setState({
  //         bookings: response.data,
  //       });
  //     })
  //     .catch(() => {
  //       console.log("Error grabing bookings");
  //     });
  // }

  render() {
    return (
    <React.Fragment>
      <h4>My Bookings</h4>
      {/* {bookings.map((todo) => {
        return (
          <Link key={todo._id} to={`/todos/${todo._id}`}>
            <div>{todo.name}</div>
          </Link>
        );
      })} */}
    </React.Fragment>
    )
  }
}
