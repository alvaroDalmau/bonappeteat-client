import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../config.js';
import Search from './Search.js';

class Restaurant extends Component {
  state = {
    restaurants: [],
    filterRestaurant: [],
  };

  componentDidMount() {
    axios
      .get(`${config.API_URL}/api/restaurants`)
      .then(response => {
        console.log('data fetched');
        this.setState({
          restaurants: response.data,
          filterRestaurant: response.data,
        });
      })
      .catch(() => {
        console.log('Error grabing restaurants');
      });
  }

  handleSearch = event => {
    let searchText = event.target.value.toLowerCase();
    console.log(this.state.filterRestaurant);
    let filteredArray = this.state.restaurants.filter(singleRestaurant => {
      return singleRestaurant.name.toLowerCase().includes(searchText);
    });

    let y = [];
    this.state.filterRestaurant.forEach(e => {
      filteredArray.forEach(j => {
        if (e.name == j.name) {
          y.push(j);
        }
      });
    });

    console.log(y);
    this.setState({
      filterRestaurant: filteredArray,
    });
  };

  handleFilter = event => {
    let filterKey = event.target.value;

    if (filterKey == 'all') {
      this.setState({
        filterRestaurant: this.state.restaurants,
      });
    } else {
      let filteredArray = this.state.restaurants.filter(singleRestaurant => {
        return singleRestaurant.category.includes(filterKey);
      });

      this.setState({
        filterRestaurant: filteredArray,
      });
    }
  };

  render() {
    const { restaurants, filterRestaurant } = this.state;
    return (
      <div>
        <h1>All the restaurants</h1>
        {/* FILTER FORM */}

        <select onChange={this.handleFilter}>
          <option key={restaurants._id} value="all">
            All
          </option>
          {restaurants.map((restaurants, index) => (
            <option key={index} value={restaurants.category}>
              {restaurants.category}
            </option>
          ))}
        </select>

        {/* SEARCH BAR */}
        <Search change={this.handleSearch} />
        {filterRestaurant.map((restaurant, index) => {
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
