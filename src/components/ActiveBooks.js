import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';

export default class ActiveBooks extends Component {
  state = {
    bookings: [],
    fetching: true,
  };

  componentDidMount() {
    //grabbing bookings info of each user
    axios
      .get(`${config.API_URL}/api/bookings`, { withCredentials: true })
      .then(bookings => {
        this.setState({
          bookings: bookings.data,
          fetching: false,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  changeDate = e => {
    return e.replace('T', ' ').slice(0, 16);
  };

  render() {
    const { bookings } = this.state;
    if (fetching) {
      return (
        <div className="spinner-grow text-info" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );
    }
    return (
      <React.Fragment>
        {bookings.map((e, i) => {
          return (
            <div key={i}>
              <h4>Restaurant:{e.restaurant.name}</h4>
              <h4>Date:{this.changeDate(e.dateTime)}</h4>
              <h4>People:{e.pax}</h4>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}
