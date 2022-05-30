import React from 'react'
import styled from 'styled-components'

import FloatButton from './../FloatButton'
import Icon from './../Icon'

const FilterMenu = ({ 
	visible,
	toggleVisible,
	monthList, 
	biomeList, 
	stateList, 
	countyList, 
}) => {
	return (
		<>
			<FilterMenuWrapper
				visible={visible}>
				teste
			</FilterMenuWrapper>
			<FloatButton onClick={() => toggleVisible()}>
				<Icon iconText="filter_list"/>
			</FloatButton>
		</>
	)
}

const FilterMenuWrapper = styled.div`
	z-index: 1000;
	display: ${(props) => props.visible ? 'block' : 'none'};
	padding: 10px;
	border-radius: 5px;
	background-color: var(--filter-background-color);
	color: var(--filter-text-color);
	transition: .2s all;
	position: fixed;
	right: 1.2vw;
	bottom: calc(5vh + 34px);
	box-shadow:
		0 16px 24px 2px rgb(0 0 0 / 14%), 
		0 6px 30px 5px rgb(0 0 0 / 12%), 
		0 8px 10px -5px rgb(0 0 0 / 20%);
`

export default FilterMenu