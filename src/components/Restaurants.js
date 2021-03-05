import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../config.js';
import Search from './Search.js';

class Restaurant extends Component {
  state = {
    restaurants: [],
    searchRestaurant: [],
    filterRestaurant: [],
  };

  componentDidMount() {
    axios
      .get(`${config.API_URL}/api/restaurants`)
      .then(response => {
        console.log('data fetched');
        this.setState({
          restaurants: response.data,
          searchRestaurant: response.data,
          filterRestaurant: response.data,
        });
      })
      .catch(() => {
        console.log('Error grabing restaurants');
      });
  }

  handleSearch = event => {
    let searchText = event.target.value.toLowerCase();

    let filteredArray = this.state.restaurants.filter(singleRestaurant => {
      return singleRestaurant.name.toLowerCase().includes(searchText);
    });

    this.setState({
      searchRestaurant: filteredArray,
    });
  };

  handleFilter = event => {
    let filterKey = event.target.value;

    let filteredArray = this.state.restaurants.filter(singleRestaurant => {
      return singleRestaurant.category.includes(filterKey);
    });

    this.setState({
      filterRestaurant: filteredArray,
    });
  };

  render() {
    const { restaurants, searchRestaurant, filterRestaurant } = this.state;

    return (
      <div>
        <h1>All the restaurants</h1>
        {/* FILTER FORM */}
        <form onChange={this.handleFilter}>
          <select>
            {filterRestaurant.map(restaurants => (
              <option key={restaurants._id} value={restaurants.category}>
                {restaurants.category}{' '}
              </option>
            ))}
          </select>
          <button type="submit">Filter</button>
        </form>
        <Search change={this.handleSearch} />

        {/* SEARCH BAR */}
        {searchRestaurant.map((restaurant, index) => {
          return (
            <div>
              <div> {restaurant.category}</div>
              <img src={restaurant.images[0]}></img>
              <Link key={index} to={`/restaurant/${restaurant._id}`}>
                {restaurant.name}
              </Link>
              <div> {restaurant.location}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
export default Restaurant;
