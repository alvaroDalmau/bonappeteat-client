import React, { Component } from 'react';
import axios from 'axios';
import config from '../config.js';
import { withRouter, Redirect } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import RestaurantDetailsCss from './RestaurantDetails.css';

class RestaurantDetails extends Component {
  state = {
    restaurant: {},
    bookings: [],
    position: [],
    timeValue: '',
    display: false,
    icon: '+',
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

  handleDisplay = () => {
    !this.state.display
      ? this.setState({ display: true, icon: '-' })
      : this.setState({ display: false, icon: '+' });
  };

  handleCreateBooking = event => {
    event.preventDefault();
    let restaurantId = this.props.match.params.restaurantId;
    this.setState(
      {
        timeValue: event.target.time.value,
      },
      () => {
        axios
          .post(
            `${config.API_URL}/api/${restaurantId}/create`,
            {
              date: event.target.date.value,
              time: this.state.timeValue,
              pax: event.target.pax.value,
            },
            { withCredentials: true }
          )
          .then(response => {
            this.setState(
              {
                bookings: [response.data],
                msg: `Your booking has been created`,
              },
              () => {
                this.props.history.push({
                  pathname: '/',
                  message: this.state.msg,
                });
              }
            );
          })
          .catch(err => {
            console.log('Bookings creation failed', err);
          });
      }
    );
  };

  render() {
    const { restaurant, position, display, icon } = this.state;
    const { loggedInUser } = this.props;
    if (!loggedInUser) {
      return <Redirect to={'/'} />;
    }
    const iconMark = new L.Icon({
      iconUrl: 'https://freewifi.com.cy/images/icons/locationicon.png',
      iconSize: [40, 42],
    });
    return (
      <React.Fragment>
        <h1>{restaurant.name}</h1>
        <p>{restaurant.description}</p>
        <a className="icon-map" onClick={this.handleDisplay}>
          {icon} Images
        </a>
        {display ? (
          <div className="display-img">
            {restaurant.images ? (
              restaurant.images.map((e, i) => {
                return <img key={i} src={e} alt="restaurant image" />;
              })
            ) : (
              <div></div>
            )}
          </div>
        ) : (
          <div></div>
        )}
        {position.length > 0 ? (
          <MapContainer
            style={{ width: '375px', height: '400px', margin: '0 auto' }}
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
        {/* <form onSubmit={this.handleCreateBooking}>
          <label>Choose the day:</label>
          <input type="date" name="date"></input>
          <br />
          <label>
            Hour:
            <select name="time">
              <option></option>
              <option disabled="disabled">---Lunch---</option>
              <option>12:30-13:30</option>
              <option>13:30-14:30</option>
              <option>14:30-15:30</option>
              <option disabled="disabled">---Dinner---</option>
              <option>19:30-20:30</option>
              <option>20:30-21:30</option>
              <option>21:30-22:30</option>
            </select>
          </label>
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
          <button type="submit">Create your Booking</button>
        </form> */}

        <form className="form-booking" onSubmit={this.handleCreateBooking}>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Choose the day:</label>
            <br />
            <input className="form-control" type="date" name="date"></input>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Hour:</label>
            <select
              name="time"
              className="form-control"
              id="exampleFormControlSelect1"
            >
              <option></option>
              <option disabled="disabled">---Lunch---</option>
              <option>12:30-13:30</option>
              <option>13:30-14:30</option>
              <option>14:30-15:30</option>
              <option disabled="disabled">---Dinner---</option>
              <option>19:30-20:30</option>
              <option>20:30-21:30</option>
              <option>21:30-22:30</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect2">Pax:</label>
            <br />
            <input
              name="pax"
              type="number"
              placeholder="pax"
              min="0"
              max="10"
              className="form-control"
            ></input>
          </div>
          <button type="submit" className="btn btn-primary">
            Reserve your Booking
          </button>
        </form>
      </React.Fragment>
    );
  }
}
export default withRouter(RestaurantDetails);
