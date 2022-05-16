import React, { useState, useCallback } from "react"
import styled from "styled-components"
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"

import styles from './style-map.json'
import FireIcon from "./../../assets/img/fireicon.png"

const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env

const containerStyle = {
  width: "100vw",
  height: "80vh",
};

const Map = ({ markers = [] }) => {
  const [map, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const onLoad = useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds({
        lat: Number.parseFloat(markers[0].latitude),
        lng: Number.parseFloat(markers[0].longitude),
      });
      map.fitBounds(bounds);
      setMap(map);
    },
    [markers]
  );

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  console.log(map);

  return isLoaded ? (
    <MapWrapper>
      <GoogleMap
        mapContainerStyle={containerStyle}
        mapTypeId={"terrain"}
        zoom={6}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          styles,
          disableDefaultUI: true,
        }}
        center={{
          lat: Number.parseFloat(markers[0].latitude),
          lng: Number.parseFloat(markers[0].longitude),
        }}
      >
        {markers.map((marker) => (
          <Marker
            icon={{
              url: FireIcon,
              scaledSize: new window.google.maps.Size(15, 15),
            }}
            position={{
              lat: Number.parseFloat(marker.latitude),
              lng: Number.parseFloat(marker.longitude),
            }}
          />
        ))}
      </GoogleMap>
    </MapWrapper>
  ) : (
    ""
  );
};

const MapWrapper = styled.div`
  z-index: 0;
`;

export default Map;