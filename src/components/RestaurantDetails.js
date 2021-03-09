import React, { Component } from 'react';
import axios from 'axios';
import config from '../config.js';
import { Link, withRouter} from "react-router-dom";

 class RestaurantDetails extends Component {
  state = {
    restaurant: {},
    bookings:[],
  };

  componentDidMount() {
    let restaurantId = this.props.match.params.restaurantId;
    axios
      .get(`${config.API_URL}/api/restaurant/${restaurantId}`)
      .then((response) => {
        console.log("data fetched");
        this.setState({
          restaurant: response.data,
        });
      })
      .catch(() => {
        console.log("error getting restaurant details");
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let restaurantId = this.props.match.params.restaurantId;
    axios
      .post(`${config.API_URL}/api/${restaurantId}/create`, {
        // user: this.props.user,
        // restaurant: restaurantId,
        dateTime: event.target.dateTime.value,
        pax: event.target.pax.value,
      })

      .then((response) => {
        console.log(response)
        this.setState(
          {
            bookings: [response.data],
          },
          () => {
            this.props.history.push("/");
          }
        );
      })
      .catch((err) => {
        console.log("Bookings creation failed", err);
      });
  };

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
        <Link key={restaurant._id} to={`/${restaurant._id}/create`} onSubmit={this.handleSubmit}>
          <button>Make your Booking</button>
        </Link>
      </React.Fragment>
    );
  }
}
export default withRouter(RestaurantDetails);