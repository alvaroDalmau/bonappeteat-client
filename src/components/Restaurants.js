import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../config.js';
import RestaurantCss from './Restaurants.css';
import Maps from './Maps';

class Restaurant extends Component {
  state = {
    restaurants: [],
    filterRestaurant: [],
    searchRestaurant: [],
    showResult: [],
    fetching: true,
    msg: false,
    message: '',
  };

  componentDidMount() {
    axios
      .get(`${config.API_URL}/api/restaurants`)
      .then(response => {
        this.setState(
          {
            restaurants: response.data,
            searchRestaurant: response.data,
            filterRestaurant: response.data,
            showResult: response.data,
            fetching: false,
          },
          () => {
            if (this.props.msg) {
              this.setState(
                {
                  msg: true,
                  message: this.props.msg,
                },
                () => {
                  setTimeout(
                    () => this.setState({ msg: false, message: '' }),
                    3000
                  );
                }
              );
            }
          }
        );
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
    const { restaurants, showResult, fetching, msg, message } = this.state;
    return (
      <React.Fragment>
        {msg ? (
          <div
            className="alert alert-success"
            role="alert"
            style={{ width: '90%', margin: '5px auto' }}
          >
            {message}
          </div>
        ) : null}
        <h2>Pick restaurant</h2>
        {/* FILTER BAR */}
        {/* <select onChange={this.handleFilter}>
          <option value="all">All</option>
          {restaurants.map((restaurants, index) => (
            <option key={index} value={restaurants.category}>
              {restaurants.category}
            </option>
          ))}
        </select> */}
        <div className="form-group filter">
          <label htmlFor="exampleFormControlSelect1">Categories</label>
          <select onChange={this.handleFilter} className="form-control">
            <option value="all">All</option>
            <option value="chinese">chinesse</option>
            <option value="Indian">Indian</option>
            <option value="Burguer">Burguer</option>
            <option value="Spanish">Spanish</option>
            <option value="Italian">Italian</option>
          </select>
        </div>
        {/* SEARCH BAR */}
        {/* <input
          onChange={this.handleSearch}
          type="text"
          placeholder="Enter the name"
        ></input> */}

        <input
          onChange={this.handleSearch}
          className="form-control mr-sm-2 search"
          type="text"
          placeholder="Enter restaurant name"
          aria-label="Search"
        />

        {fetching ? (
          <div className="spinner-grow text-info" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <React.Fragment>
            <Maps restaurants={showResult} />
            {showResult.map((restaurant, index) => {
              {
                /* <div key={index}>
                  <img src={restaurant.images[0]}></img>
                  <div> {restaurant.category}</div>
                    {restaurant.name}
                  <Link to={`/restaurant/${restaurant._id}`}>
                  </Link>
                </div> */
              }
              return (
                <Link key={index} to={`/restaurant/${restaurant._id}`}>
                  <div className="card" style={{ width: '20rem' }}>
                    <img
                      className="card-img-top"
                      src={restaurant.images[0]}
                      alt="restaurant image"
                    />
                    <div className="card-body">
                      <h4 className="card-title"> {restaurant.name}</h4>
                      <p className="card-text">{restaurant.category}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
export default Restaurant;
