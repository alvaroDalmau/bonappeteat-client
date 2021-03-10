import React, { Component } from 'react';

export default class ActiveBooks extends Component {
  changeDate = e => {
    return e.replace('T', ' ').slice(0, 16);
  };

  render() {
    const { bookings } = this.props;
    return (
      <React.Fragment>
        {bookings.map((e, i) => {
          return (
            <div key={i}>
              <h4>Restaurant:{e.restaurant.name}</h4>
              <h4>Date:{this.changeDate(e.dateTime)}</h4>
              <h4>People:{e.pax}</h4>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}
