import React, { useState, useCallback } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'

const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env

const containerStyle = {
    width: '100vw',
    height: '80vh',
}

const center = {    
    lat: -3.745,
    lng: -38.523,
}

console.log(REACT_APP_GOOGLE_MAPS_API_KEY)

const Map = ({ markers }) => {
    const [_, setMap] = useState(null)

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API_KEY,
    })

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center)
        map.fitBounds(bounds)
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}/>
    ) : ''
}

export default Map