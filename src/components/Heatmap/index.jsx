import React from 'react'
import { HeatmapLayer } from '@react-google-maps/api'

const Heatmap = ({ googleMaps, positions = [] }) => {


  const getHeatMarkers = () => positions.map((position) => new googleMaps.LatLng(
    position[0],
    position[1],
  ))

  return (
    <HeatmapLayer
      radius={20}
      data={getHeatMarkers()}/>
  )
}

export default Heatmap