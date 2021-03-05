import React, { Component } from 'react'
import LogForm from './LogForm'
import axios from "axios";
import config from "../config";

 class AboutUs extends Component {
   state = {
     loggedInUser: null,
     error: null
   };

   handleSignUp = (event) => {
     event.preventDefault();
     let user = {
       email: event.target.email.value,
       password: event.target.password.value,
     };
     axios
       .post(`${config.API_URL}/api/user/log`, user)
       .then((response) => {
         this.setState(
           {
             loggedInUser: response.data,
           },
             () => {
               this.props.history.push("/");
             }
         );
       })
       .catch((err) => {
         this.setState({
           error: err.response.data,
         });
        console.log('error')
       });
   };

   handleSignIn = (event) => {
     event.preventDefault();
     let user = {
       email: event.target.email.value,
       password: event.target.password.value,
     };
     axios
       .post(`${config.API_URL}/api/user/log`, user, { withCredentials: true })
       .then((response) => {
         this.setState(
           {
             loggedInUser: response.data,
           },
             () => {
               this.props.history.push("/");
             }
         );
       })
       .catch(() => {
         console.log("error");
       });
   };

   render() {
        const { user } = this.props;
     return (
       <React.Fragment>
         <h1>Bon Appeteat</h1>
         <p>
           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod
           tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim
           veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex
           ea commodi consequat. Quis aute iure reprehenderit in voluptate velit
           esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat
           cupiditat non proident, sunt in culpa qui officia deserunt mollit
           anim id est laborum.
         </p>
         {!user ? <LogForm onSignUp={this.handleSignUp}/> : <LogForm onSignIn={this.handleSignIn} />}
         
       </React.Fragment>
     );
   }
 }
export default AboutUs