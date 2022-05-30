import React from 'react'
import styled from 'styled-components'

const Select = ({ list, placeholder }) => {
	return (
		<SelectField>
			<option value="">{placeholder}</option>
			{list.map((option, key) => (
				<option value={option} key={key}>{option}</option>
			))}
		</SelectField>
	)
}

const SelectField = styled.select`
	outline: none;
	font-weight: bold;
	border: none;
	margin-bottom: 10px;
	height: 50px;
	width: 200px;
	background-color: transparent;
	border-bottom: 1px solid var(--select-border-color);
	color: var(--select-border-color);
`

export default Select