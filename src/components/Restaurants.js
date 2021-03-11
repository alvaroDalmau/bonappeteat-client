import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../config.js';

import Maps from './Maps';

class Restaurant extends Component {
  state = {
    restaurants: [],
    filterRestaurant: [],
    searchRestaurant: [],
    showResult: [],
    fetching: true,
  };

  componentDidMount() {
    axios
      .get(`${config.API_URL}/api/restaurants`)
      .then(response => {
        this.setState({
          restaurants: response.data,
          searchRestaurant: response.data,
          filterRestaurant: response.data,
          showResult: response.data,
          fetching: false,
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
    this.setState(
      {
        searchRestaurant: filteredArray,
      },
      this.handleShowFilter
    );
  };

  handleFilter = event => {
    let filterKey = event.target.value;
    if (filterKey == 'all') {
      this.setState(
        {
          filterRestaurant: this.state.restaurants,
        },
        this.handleShowFilter
      );
    } else {
      let filteredArray = this.state.restaurants.filter(singleRestaurant => {
        return singleRestaurant.category.includes(filterKey);
      });
      this.setState(
        {
          filterRestaurant: filteredArray,
        },
        this.handleShowFilter
      );
    }
  };

  handleShowFilter = () => {
    let filteredArr = [];
    this.state.searchRestaurant.forEach(el => {
      this.state.filterRestaurant.forEach(e => {
        if (el.name == e.name) filteredArr.push(e);
      });
    });
    this.setState({
      showResult: filteredArr,
    });
  };

  render() {
    const { restaurants, showResult, fetching } = this.state;
    return (
      <React.Fragment>
        <h1>All the restaurants</h1>
        {/* FILTER BAR */}
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
        <input
          onChange={this.handleSearch}
          type="text"
          placeholder="Enter the name"
        ></input>
        {fetching ? (
          <div className="spinner-grow text-info" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <React.Fragment>
            <Maps restaurants={showResult} />
            {showResult.map((restaurant, index) => {
              return (
                <div key={index}>
                  <div> {restaurant.category}</div>
                  <img src={restaurant.images[0]}></img>
                  <Link to={`/restaurant/${restaurant._id}`}>
                    {restaurant.name}
                  </Link>
                  <div> {restaurant.location}</div>
                </div>
              );
            })}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
export default Restaurant;
