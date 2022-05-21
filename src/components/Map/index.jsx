import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { 
    GoogleMap, 
    Marker,
    useJsApiLoader,
} from '@react-google-maps/api'

import styles from './style-map.json'
import FireIcon from './../../assets/img/fireicon.png'

const DEFAULT_ZOOM_NUMBER = 5
const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env

const containerStyle = {
  width: '100vw',
  height: '80vh',
};

const Map = ({ markers = [] }) => {
  const [map, setMap] = useState(null);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM_NUMBER)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API_KEY,
  })

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds({
      lat: Number.parseFloat(markers[0].latitude),
      lng: Number.parseFloat(markers[0].longitude),
    })
    map.setZoom(DEFAULT_ZOOM_NUMBER)
    map.fitBounds(bounds)
    setMap(map)
  }, [markers])

  const onUnmount = useCallback(function callback(_) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <MapWrapper>
      <GoogleMap
        mapContainerStyle={containerStyle}
        mapTypeId={'terrain'}
        defaultZoom={DEFAULT_ZOOM_NUMBER}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          styles,
          disableDefaultUI: true,
        }}
        center={{
          lat: Number.parseFloat(markers[0].latitude),
          lng: Number.parseFloat(markers[0].longitude),
        }}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            icon={{
              url: FireIcon,
              scaledSize: new window.google.maps.Size(15, 15),
            }}
            position={{
              lat: Number.parseFloat(marker.latitude),
              lng: Number.parseFloat(marker.longitude),
            }}>
          </Marker>
        ))}
      </GoogleMap>
      <OptionButtonGroup>
        <OptionButton onClick={() => setZoom(zoom + 1)}>+</OptionButton>
        <OptionButton onClick={() => setZoom(zoom - 1)}>-</OptionButton>
      </OptionButtonGroup>
    </MapWrapper>
  ) : (
    ''
  );
};

const MapWrapper = styled.div`
  z-index: 0;
`;

const OptionButtonGroup = styled.div`
  position: absolute;
  top: 60vh;
  right: 15px;
`

const OptionButton = styled.button`
  border-radius: 50%;
  border: none;
  width: 40px;
  height: 40px;
  padding: 10px;
  margin-bottom: 10px;
  display: block;
  font-size: 20px;
  font-weight: bold;
  z-index: 1;
  background-color: var(--map-background-color-button);
  color: var(--map-text-color-button);
  box-shadow:
    0 16px 24px 2px rgb(0 0 0 / 14%), 
    0 6px 30px 5px rgb(0 0 0 / 12%), 
    0 8px 10px -5px rgb(0 0 0 / 20%);
  
  :hover {
    cursor: pointer;
  }
`

export default Map;