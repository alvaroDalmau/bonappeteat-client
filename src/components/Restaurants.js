import React, { Component } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import config from "../config.js";

 class Restaurant extends Component {
    state={
        restaurants:[]
    }

   componentDidMount() {
     axios
       .get(`${config.API_URL}/api/restaurants`)
       .then((response) => {
         console.log("data fetched");
         this.setState({
           restaurants: response.data,
         });
       })
       .catch(() => {
         console.log("error");
       });
   }

   render() {
       const{restaurants}= this.state
     return (
       <div>
         <h1>All the restaurants</h1>
         {restaurants.map((restaurant) => {
           return (
               <div>
               <img src={restaurant.images[0]}></img>
             <Link key={restaurant._id} to={`/restaurant/${restaurant._id}`}>{restaurant.name}</Link>
               <div>
                 {restaurant.category}
                 {restaurant.location}
               </div>
               </div>
           );
         })}
       </div>
     );
   }
 }
export default Restaurant