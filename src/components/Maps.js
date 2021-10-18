import { React, Component } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MapsCss from './Maps.css';

function MyComponent(props) {
  const map = useMap();
  map.setView(props.center);
  return null;
}

class Maps extends Component {
  state = {
    position: [42, -3],
    display: false,
    icon: '+',
  };

  componentDidMount() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position1 => {
        this.setState({
          position: [position1.coords.latitude, position1.coords.longitude],
        });
      });
    } else {
      console.log('Not Available');
    }
  }

  handleDisplay = () => {
    !this.state.display
      ? this.setState({ display: true, icon: '-' })
      : this.setState({ display: false, icon: '+' });
  };

  render() {
    const { restaurants } = this.props;
    const { display, icon } = this.state;
    // console.log(this.state.position)
    const iconMark = new L.Icon({
      iconUrl: 'https://freewifi.com.cy/images/icons/locationicon.png',
      iconSize: [40, 42],
    });
    return (
      <div>
        <a className="icon-map" onClick={this.handleDisplay}>
          {icon} Map
        </a>
        {display ? (
          <div className="map-container">
            <MapContainer
              //style={{ width: '375px', height: '400px', margin: '0 auto' }}
              // MAP POSITION
              center={this.state.position}
              zoom={15}
              scrollWheelZoom={true}
            >
              <MyComponent center={this.state.position} />
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* MARKER */}
              {restaurants ? (
                restaurants.map((singleRestaurant, i) => {
                  return (
                    <Marker
                      key={i}
                      icon={iconMark}
                      position={singleRestaurant.location}
                    >
                      <Popup>
                        <Link to={`/restaurant/${singleRestaurant._id}`}>
                          {singleRestaurant.name}
                        </Link>
                      </Popup>
                    </Marker>
                  );
                })
              ) : (
                <div></div>
              )}
            </MapContainer>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
export default Maps;
