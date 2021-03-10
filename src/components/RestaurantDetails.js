import React, { Component } from 'react';
import axios from 'axios';
import config from '../config.js';
import { withRouter } from 'react-router-dom';

class RestaurantDetails extends Component {
  state = {
    restaurant: {},
    bookings: [],
  };

  componentDidMount() {
    let restaurantId = this.props.match.params.restaurantId;
    axios
      .get(`${config.API_URL}/api/restaurant/${restaurantId}`)
      .then(response => {
        this.setState({
          restaurant: response.data,
        });
      })
      .catch(() => {
        console.log('error getting restaurant details');
      });
  }

  handleCreateBooking = event => {
    event.preventDefault();
    let restaurantId = this.props.match.params.restaurantId;
    axios
      .post(
        `${config.API_URL}/api/${restaurantId}/create`,
        {
          dateTime: event.target.dateTime.value,
          pax: event.target.pax.value,
        },
        { withCredentials: true }
      )
      .then(response => {
        this.setState(
          {
            bookings: [response.data],
          },
          () => {
            this.props.history.push('/');
          }
        );
      })
      .catch(err => {
        console.log('Bookings creation failed', err);
      });
  };

  render() {
    const { restaurant } = this.state;
    return (
      <React.Fragment>
        <h1>{restaurant.name}</h1>
        <div>{restaurant.description}</div>
        {restaurant.images ? (
          restaurant.images.map((e, i) => {
            return <img key={i} src={e} alt="restaurant image" />;
          })
        ) : (
          <div></div>
        )}
        <form onSubmit={this.handleCreateBooking}>
          <label>Choose the day and time:</label>
          <input name="dateTime" type="datetime-local" step="1800"></input>
          <br />
          <label>Pax:</label>
          <input
            name="pax"
            type="number"
            placeholder="pax"
            min="0"
            max="10"
          ></input>
          <br />
          <button type="submit">Create booking</button>
        </form>
      </React.Fragment>
    );
  }
}
export default withRouter(RestaurantDetails);
