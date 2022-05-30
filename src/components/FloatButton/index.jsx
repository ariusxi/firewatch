import React from 'react'
import styled from 'styled-components'

const FloatButton = ({ children, onClick }) => {
	return (
		<FloatButtonWrapper onClick={onClick}>
			{children}
		</FloatButtonWrapper>
	)
}

const FloatButtonWrapper = styled.button`
	background-color: var(--float-button-background);
	color: var(--float-button-text-color);
	border-radius: 50%;
	cursor: pointer;
	border: none;
	z-index: 1000;
	padding: 10px 12px;
	text-align: center;
	position: fixed;
	bottom: 2vh;
	right: 2vw;
	box-shadow:
        0 16px 24px 2px rgb(0 0 0 / 14%), 
        0 6px 30px 5px rgb(0 0 0 / 12%), 
        0 8px 10px -5px rgb(0 0 0 / 20%);
`

export default FloatButton