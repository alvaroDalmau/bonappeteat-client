import React, { Component } from 'react';
import axios from 'axios';
import config from '../config.js';
import { Link } from "react-router-dom";

export default class RestaurantDetails extends Component {
  state = {
    restaurant: [],
  };

  componentDidMount() {
    let restaurantId = this.props.match.params.restaurantId;
    axios
      .get(`${config.API_URL}/api/restaurant/${restaurantId}`)
      .then(response => {
        console.log('data fetched');
        this.setState({
          restaurant: response.data,
        });
      })
      .catch(() => {
        console.log('error getting restaurant details');
      });
  }

  render() {
    const { restaurant } = this.state;
    return (
      <React.Fragment>
        <h1>{restaurant.name}</h1>
        <div>{restaurant.description}</div>
        {/* {restaurant.images.map((e) => {
          <img src={e} alt="restaurant image" />;
        })} */}
        <img src={restaurant.images} alt="restaurant image" />
        <Link key={restaurant._id} to={`/bookings`}><button>
         Make your Booking
        </button></Link>
      </React.Fragment>
    );
  }
}
