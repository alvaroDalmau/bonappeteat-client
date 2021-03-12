import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';
import ActiveBooksCss from './ActiveBooks.css';

export default class ActiveBooks extends Component {
  state = {
    bookings: [],
    fetching: true,
    displayBook: true,
    iconBook: '-',
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

  handleDisplayBook = () => {
    !this.state.displayBook
      ? this.setState({ displayBook: true, iconBook: '-' })
      : this.setState({ displayBook: false, iconBook: '+' });
  };

  render() {
    const { bookings, fetchig, displayBook, iconBook } = this.state;
    if (fetchig) {
      return (
        <div className="spinner-grow text-info" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );
    }
    return (
      <React.Fragment>
        <a onClick={this.handleDisplayBook} className="account-btn">
          {iconBook} Your bookings
        </a>
        {displayBook ? (
          <div>
            {bookings.map((e, i) => {
              {
                /* <div key={i}>
                  <h4>Restaurant:{e.restaurant.name}</h4>
                  <h4>Date:{e.date.slice(0, 10)}</h4>
                  <h4>Time:{e.time}</h4>
                  <h4>People:{e.pax}</h4>
                </div> */
              }
              return (
                <div key={i} className="card" style={{ width: '18rem' }}>
                  <div className="card-body">
                    <h4 className="card-title">{e.restaurant.name}</h4>
                    <p className="card-subtitle mb-2 text-muted">
                      {e.date.slice(0, 10)}
                    </p>
                    <p className="card-subtitle mb-2 text-muted">{e.time}</p>
                    <p className="card-text info-pax">{e.pax} People</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div></div>
        )}
      </React.Fragment>
    );
  }
}
