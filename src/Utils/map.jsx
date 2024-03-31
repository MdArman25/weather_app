/* eslint-disable react/prop-types */
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// eslint-disable-next-line react/prop-types
const MapLocation = ({ onLocationSelect }) => {
  const handleMapClick = (event) => {
    const { lat, lng } = event.latlng;
    onLocationSelect(lat, lng);
  };

  return (
    <div className="rounded-lg overflow-hidden bg-white shadow-md">
    <h2 className="text-lg font-semibold bg-gray-200 p-3">Map</h2>
    <div className="h-96">
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%' }} onClick={handleMapClick}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Optionally, you can add a marker to indicate the clicked location */}
        {/* <Marker position={[selectedLocation.latitude, selectedLocation.longitude]}>
          <Popup>You clicked here</Popup>
        </Marker> */}
      </MapContainer>
    </div>
  </div>
  );
};

export default MapLocation;