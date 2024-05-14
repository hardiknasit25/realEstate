import React, { useEffect, useState } from 'react'
import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import "leaflet/dist/leaflet.css"
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";


let DefaulIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
})
L.Marker.prototype.options.icon = DefaulIcon


const GeoCoderMarker = ({ address }) => {

  // const map = useMap()
  const [position, setPosition] = useState([21.1702, 72.8311])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch coordinates');
        }
        const data = await response.json();
        if (data.length > 0) {
          setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        } else {
          throw new Error('No coordinates found for the address');
        }
      } catch (error) {
        console.error('Error geocoding address:', error.message);
        setPosition([21.1702, 72.8311]);
      }
    };

    if (address) {
      fetchData();
    }
  }, [address]);



  return (
    <Marker position={position} icon={DefaulIcon}>
      <Popup />
    </Marker>
  )
}

export default GeoCoderMarker