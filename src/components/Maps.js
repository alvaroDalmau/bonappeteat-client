import { React, Component } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Link } from "react-router-dom";

function MyComponent(props) {
  const map = useMap();
  map.setView(props.center);
  return null;
}

class Maps extends Component {
  state = {
    position: [42, -3],
  };

  componentDidMount() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position1) => {
        this.setState({
          position: [position1.coords.latitude, position1.coords.longitude],
        });
      });
    } else {
      console.log("Not Available");
    }
  }

  render() {
    const { restaurants } = this.props;
    // console.log(this.state.position)
    const iconMark = new L.Icon({
      iconUrl:
        "https://lh3.googleusercontent.com/proxy/jsFMaNyp7f09WiCZ9pJfw6BFzo_5L08P5NGpVdrTS9f8uMZi4kptF7Zb1GET5XWvR86XIlZ96SBNTm2PtmbYoYdN4W-RySJ7Fo3PA-TgWXuFvjI2N-han9K0dW7IAC9cXg",
      iconSize: [68, 65],
    });

    return (
      <div>
        <h4>Maps</h4>

        <div>
          <MapContainer
            style={{ width: "800px", height: "500px" }}
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
              restaurants.map((singleRestaurant) => {
                return (
                  <Marker icon={iconMark} position={singleRestaurant.location}>
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
      </div>
    );
  }
}

export default Maps;
