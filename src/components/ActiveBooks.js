import React, { Component } from 'react';
import axios from "axios";
import config from "../config.js";
import { Link} from "react-router-dom";

export default class ActiveBooks extends Component {
  state={
    bookings: [],
  }
  componentDidMount() {
    // let userId = this.props.match.params.userId;
    axios
      .get(`${config.API_URL}/api/bookings`)
      .then((response) => {
        console.log("bookings data fetched");
        this.setState({
          bookings: [response.data],
        })
      })
      .catch(() => {
        console.log("Error grabbing bookings");
      });
  }
  
  render() {
    const{bookings}= this.state
    const{user} = this.props
    return (
      <React.Fragment>
        <h4>My Bookings</h4>
{/* if matches req.session 'id' show the images of the specific user(this.props)*/}
       {bookings.map(singleBooking => {
        return (
            <div id={singleBooking._id}>{singleBooking.restaurant}</div>
        );
      })}
      </React.Fragment>
    );
  }
}
