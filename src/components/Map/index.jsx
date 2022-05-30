import React, { 
    Children, 
    cloneElement, 
    isValidElement, 
    useState, 
    useCallback,
} from 'react'
import styled from 'styled-components'
import {
    GoogleMap,
    useJsApiLoader,
} from '@react-google-maps/api'

import Icon from './../Icon'

import styles from './style-map.json'

const DEFAULT_ZOOM_NUMBER = 5
const libraries = ['visualization']
const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env


const Map = ({ center, children, mapWidth = '100vw', mapHeight = '80vh', marginTop = '0px' }) => {
    const [map, setMap] = useState(null);
    const [zoom, setZoom] = useState(DEFAULT_ZOOM_NUMBER)
    const { isLoaded } = useJsApiLoader({
        libraries,
        id: 'google-map-script',
        googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API_KEY,
    })

    const containerStyle = {
        width: mapWidth,
        height: mapHeight,
		marginTop,
    }

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds({
            lat: Number.parseFloat(center.lat),
            lng: Number.parseFloat(center.lng),
        })
        map.setZoom(DEFAULT_ZOOM_NUMBER)
        map.fitBounds(bounds)
        setMap(map)
    }, [center])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    const childrenWithMaps = Children.map(children, (child) => {
        if (isValidElement(child) && isLoaded) {
            return cloneElement(child, {
                googleMaps: window.google.maps,
            })
        }
        return child
    })

    return isLoaded ? (
        <MapWrapper>
            <GoogleMap
                mapContainerStyle={containerStyle}
                mapTypeId='terrain'
                defaultZoom={DEFAULT_ZOOM_NUMBER}
                zoom={zoom}
                onLoad={onLoad}
                onUnmount={onUnmount}
                center={center}
                options={{
                    styles,
                    maxZoom: 8,
                    gestureHandling: 'greedy',
                    disableDefaultUI: true,
                }}>
                {childrenWithMaps}
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
    top: 55vh;
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