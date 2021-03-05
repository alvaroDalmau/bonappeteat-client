import React, { Component } from 'react'
import axios from "axios";
import config from "../config.js";

export default class RestaurantDetails extends Component {
  state = {
    restaurant:[],
  };

  componentDidMount() {
      // console.log(this.props)
      let restaurantId = this.props.match.params.restaurantId;
      // console.log(restaurantId)
    axios
      .get(`${config.API_URL}/api/${restaurantId}`)
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

  render() {
    const { restaurant } = this.state;
    console.log(restaurant);
    return (
      <div>
        <h1>Restaurant Details</h1>
        <h3>{restaurant.name}</h3>
        <div>{restaurant.description}</div>
        <img src={restaurant.images}></img>
      </div>
    );
  }
}
