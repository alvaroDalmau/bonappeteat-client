import React, { Component } from 'react'
import LogForm from './LogForm'

 class AboutUs extends Component {
    render() {
        return (
          <div>
            <h1>Bon Appeteat</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquid ex ea commodi consequat. Quis aute iure reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
            <LogForm/>
          </div>
        );
    }
}
export default AboutUs