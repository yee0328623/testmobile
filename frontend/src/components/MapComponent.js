import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import "./SearchBox.css";
import SearchBox from './SearchBox';
import { Icon, divIcon, point } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster'

const homeIcon = new Icon({
  iconUrl: require("../img/marker-home.png"),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// https://icons8.com/icons/set/location

const clientIcon = (color) => new Icon({
  iconUrl: require(`../img/marker-${color}.png`),
  iconSize: [30, 30],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapComponent = ({clients, handleClientSelection, setSelectedClientLocation, selectedClientLocation, selectedClientData }) => {
  
  var defaultCenter = [22.642081110582417, 120.33120388762121];
  const center = selectedClientLocation || defaultCenter;
  const zoom = selectedClientLocation ? 25 : 13;

  const getClientIcon = (status) => {
    let iconColor;

    switch (status) {
      case "OK":
        iconColor = "green";
        break;
      case "error":
        iconColor = "red";
        break;
      case "disconnect":
        iconColor = "black";
        break;
      default:
        iconColor = "red";
        break;
    }

    return iconColor;
  };

  const getClientPopupContent = (client) => {
    return (
      <div className={`popup-container popup-${client.status}`}>
        <div className="popup-content">
          <h3>{client.clientName}</h3>
          <p>Current Status:<span className={`status-${client.status}`}>{client.status}</span></p>
        </div>
      </div>
    );
  };
  
  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: 'custom-cluster-icon',
      iconSize: point(32, 32, true)
    })
  }

  return (
    <div className='map-section'>
      <SearchBox clients={clients} onClientSelected={handleClientSelection} setSelectedClientLocation={setSelectedClientLocation} />
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerClusterGroup chunkedLoading iconCreateFunction={createCustomClusterIcon}>
          <Marker position={defaultCenter} icon={homeIcon}>
            {/* <Popup>知訊科技</Popup> */}
          </Marker>
          {clients.map((client, index) => (
            <Marker key={`${client.id}-${index}`} position={client.location} icon={clientIcon(getClientIcon(client.status))} eventHandlers={{click: () => { handleClientSelection(client.clientName)},}}>
              <Popup>{getClientPopupContent(client)}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
