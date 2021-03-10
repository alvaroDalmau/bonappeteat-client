import React, { Component } from 'react';
import axios from 'axios';
import config from '../config.js';
import { Link, withRouter } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

class RestaurantDetails extends Component {
  state = {
    restaurant: {},
    bookings: [],
    position:[]
  };

  componentDidMount() {
    let restaurantId = this.props.match.params.restaurantId;
    axios
      .get(`${config.API_URL}/api/restaurant/${restaurantId}`)
      .then((response) => {
        console.log("data fetched");
        this.setState({
          restaurant: response.data,
          position: response.data.location
        });
      })
      .catch(() => {
        console.log("error getting restaurant details");
      });
  }

  handleSubmit = event => {
    event.preventDefault();
    let restaurantId = this.props.match.params.restaurantId;
    axios
      .post(`${config.API_URL}/api/${restaurantId}/create`, {
        user: this.props.user,
        restaurant: restaurantId,
        dateTime: event.target.dateTime.value,
        pax: event.target.pax.value,
      },)
      .then(response => {
        console.log(response);
        this.setState(
          {
            bookings: [response.data],
          },
          () => {
            this.props.history.push('/');
          }
        );
      })
      .catch(err => {
        console.log('Bookings creation failed', err);
      });
  };
  
  render() {
    const { restaurant , position} = this.state;
    console.log(restaurant.location)
    const {user}= this.props
    
    console.log(position)


    const iconMark = new L.Icon({
      iconUrl:
        "https://lh3.googleusercontent.com/proxy/jsFMaNyp7f09WiCZ9pJfw6BFzo_5L08P5NGpVdrTS9f8uMZi4kptF7Zb1GET5XWvR86XIlZ96SBNTm2PtmbYoYdN4W-RySJ7Fo3PA-TgWXuFvjI2N-han9K0dW7IAC9cXg",
      iconSize: [68, 65],
    })

    return (
      <React.Fragment>
        <h1>{restaurant.name}</h1>
        <div>{restaurant.description}</div>
        <img src={restaurant.images} alt="restaurant image" />
        <Link
          key={restaurant._id}
          to={`/${restaurant._id}/create`}
          onSubmit={this.handleSubmit}
        >
          <button>Make your Booking</button>
        </Link>

        {/* MAP DETAILS */}

        {position.length > 0 ? (
          <MapContainer
            style={{ width: "500px", height: "300px" }}
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
      </React.Fragment>
    );
  }
}
export default withRouter(RestaurantDetails);
