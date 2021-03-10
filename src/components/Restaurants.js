import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../config.js';
import Search from './Search.js';
import Maps from "./Maps";

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
          {filterRestaurant.map((restaurants) => (
            <option key={restaurants._id} value={restaurants.category}>
              {restaurants.category}
            </option>
          ))}
        </select>

        {/* SEARCH BAR */}
        <Search change={this.handleSearch} />
        <Maps restaurants={filterRestaurant}/>
        {filterRestaurant.map((restaurants, index) => {
          return (
            <div>
              <div> </div>
              <img src={restaurants.images[0]}></img>
               {/* <div>{restaurants.category}</div> */}
              <Link key={restaurants._id} restaurants={restaurants} to={`/restaurant/${restaurants._id}`}>
                <h3>{restaurants.name}</h3>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}
export default Restaurant;
