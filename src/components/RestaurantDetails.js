import React, { Component } from 'react';
import axios from 'axios';
import config from '../config.js';
import { withRouter, Redirect } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

class RestaurantDetails extends Component {
  state = {
    restaurant: {},
    bookings: [],
    position: [],
  };

  componentDidMount() {
    let restaurantId = this.props.match.params.restaurantId;
    axios
      .get(`${config.API_URL}/api/restaurant/${restaurantId}`)
      .then(response => {
        this.setState({
          restaurant: response.data,
          fetching: false,
          position: response.data.location,
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
            msg: `A booking at ${response.data.restaurant} has been created`,
          },
          () => {
            this.props.history.push({ pathname: '/', mesage: this.state.msg });
          }
        );
      })
      .catch(err => {
        console.log('Bookings creation failed', err);
      });
  };

  render() {
    const { restaurant, position } = this.state;
    const { loggedInUser } = this.props;
    if (!loggedInUser) {
      return <Redirect to={'/'} />;
    }
    const iconMark = new L.Icon({
      iconUrl:
        'https://lh3.googleusercontent.com/proxy/jsFMaNyp7f09WiCZ9pJfw6BFzo_5L08P5NGpVdrTS9f8uMZi4kptF7Zb1GET5XWvR86XIlZ96SBNTm2PtmbYoYdN4W-RySJ7Fo3PA-TgWXuFvjI2N-han9K0dW7IAC9cXg',
      iconSize: [68, 65],
    });
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
        {position.length > 0 ? (
          <MapContainer
            style={{ width: '500px', height: '300px' }}
            center={position}
            zoom={13}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* MARKER */}

            <Marker icon={iconMark} position={position}>
              <Popup>{restaurant.name}</Popup>
            </Marker>
          </MapContainer>
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
