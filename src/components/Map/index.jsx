import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import {
    GoogleMap,
    Marker,
    useJsApiLoader,
} from '@react-google-maps/api'

import Icon from './../Icon'

import styles from './style-map.json'
import FireIcon from './../../assets/img/fireicon.png'

const DEFAULT_ZOOM_NUMBER = 5
const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env


const Map = ({ markers = [], mapWidth = '100vw', mapHeight = '80vh' }) => {
    const [map, setMap] = useState(null);
    const [zoom, setZoom] = useState(DEFAULT_ZOOM_NUMBER)

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API_KEY,
    })

    const containerStyle = {
        width: mapWidth,
        height: mapHeight,
    }

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds({
            lat: Number.parseFloat(markers[0].latitude),
            lng: Number.parseFloat(markers[0].longitude),
        })
        map.setZoom(DEFAULT_ZOOM_NUMBER)
        map.fitBounds(bounds)
        setMap(map)
    }, [markers])

    const onUnmount = useCallback(function callback(map) {
        console.log('Map loaded: ', map)

        setMap(null)
    }, [])

    console.log('Map state: ', map)

    return isLoaded ? (
        <MapWrapper>
            <GoogleMap
                mapContainerStyle={containerStyle}
                mapTypeId='terrain'
                defaultZoom={DEFAULT_ZOOM_NUMBER}
                zoom={zoom}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                    styles,
                    maxZoom: 8,
                    gestureHandling: 'greedy',
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
                <OptionButton onClick={() => setZoom(zoom + 1)}>
                    <Icon iconText="zoom_in" />
                </OptionButton>
                <OptionButton onClick={() => setZoom(zoom - 1)}>
                    <Icon iconText="zoom_out" />
                </OptionButton>
            </OptionButtonGroup>
        </MapWrapper>
    ) : ''
};

const MapWrapper = styled.div`
    position: relative;
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
    width: 50px;
    height: 50px;
    padding: 12px;
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