import React from 'react'
import styled from 'styled-components'
import { Marker } from '@react-google-maps/api'

import FireIcon from './../../assets/img/fireicon.png'

const Markers = ({
	data = [],
	setActiveMarker,
	setSelectedElement,
}) => {
	return (
		<MarkersWrapper>
			{data.map((marker, index) => (
				<Marker
					key={index}
					icon={{
						url: FireIcon,
						scaledSize: new window.google.maps.Size(15, 15),
					}}
					position={{
						lat: Number.parseFloat(marker.latitude),
						lng: Number.parseFloat(marker.longitude),
					}}
					onClick={(_, markerMD) => {
						setSelectedElement(marker)
						setActiveMarker(markerMD)
					}}>
				</Marker>
			))}
		</MarkersWrapper>
	)
}

const MarkersWrapper = styled.div`
  	width: 100%;
`

export default Markers