import React, { Component } from 'react'
import AboutUs from './AboutUs.js'
import Restaurants from './Restaurants'

class Home extends Component {
    render() {
        const{user, restaurants}=this.props
        return (

        <React.Fragment>
            {
               
                !user ? <Restaurants restaurants={restaurants} /> : <AboutUs/>
            }
        </React.Fragment>
        );
    }
}
export default Home