import React, { Component } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import config from "../config.js";

 class Restaurant extends Component {
//     state={
//         restaurants:[]
//     }

//    componentDidMount() {
//      axios
//        .get(`${config.API_URL}/api/restaurants`)
//        .then((response) => {
//          console.log("data fetched");
//          this.setState({
//            restaurants: response.data,
//          });
//        })
//        .catch(() => {
//          console.log("error");
//        });
//    }

   render() {
       const{restaurants}= this.props
     return (
       <div>
         <h1>All the restaurants</h1>
         {restaurants.map((restaurant) => {
           return (
             <Link key={restaurant._id} to={`/restaurant/${restaurant._id}`}>
               <div>
               <img src={restaurant.images[0]}></img>
                 {restaurant.name}
                 {restaurant.category}
                 {restaurant.location}
               </div>
             </Link>
           );
         })}
       </div>
     );
   }
 }
export default Restaurant