import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Leaflet's default marker icon paths break under bundlers (Vite included)
// because the URLs get rewritten. Re-point them at the bundled assets.
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Solid Cars garage location.
// TODO: update GARAGE_ADDRESS if the location ever changes.
const GARAGE_COORDS: [number, number] = [42.644444, 24.800456];
const GARAGE_ADDRESS = 'Solid Cars';

export function GarageMap() {
  return (
    <MapContainer
      center={GARAGE_COORDS}
      zoom={15}
      scrollWheelZoom={false}
      className="w-full h-[280px] rounded-card border border-border z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={GARAGE_COORDS}>
        <Popup>{GARAGE_ADDRESS}</Popup>
      </Marker>
    </MapContainer>
  );
}
