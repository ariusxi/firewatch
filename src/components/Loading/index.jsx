import React from 'react'
import styled from 'styled-components'

import LogoImg from './../../assets/img/icon.png'

const Loading = ({ visible }) => {
	return (
		<LoadingWrapper visible={visible}>
			<Loader>
				<Logo>
					<LogoLayer/>
					<LogoLayer/>
					<LogoLayer/>
				</Logo>
			</Loader>
		</LoadingWrapper>
	)
}

const LoadingWrapper = styled.div`
	width: 100vw;
	height: 100vh;
	transition: all .2s;
	display: ${(props) => props.visible ? 'block' : 'none'};
	position: fixed;
	background-color: var(--loader-background-color);
	z-index: 2000;
	top: 0;
	left: 0;
`

const Loader = styled.div`
	color: var(--color-white);
	text-transform: uppercase;
	letter-spacing: .1em;
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const Logo = styled.div`
	color: var(--color-white);
	margin-top: calc(50vh - 110px);
	width: 160px;
	height: 220px;
	position: relative;
`

const LogoLayer = styled.div`
	position: absolute;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
	animation: loadscaler infinite;
	animation-duration: 3s;
	&:nth-child(1) {
		--anim-scale: 1.35;
		animation-delay: 0.2s;
	}
	&:nth-child(2) {
		--anim-scale: 1.2;
		animation-delay: 0.1s;
		clip-path: circle(49% at 50% 50%);
	}
	&:nth-child(3) {
		clip-path: circle(34% at 50% 50%);
	}
	&::before {
		clip-path: inherit;
		content: "";
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		animation: loadspinner infinite;
		background-image: url(${LogoImg});
		background-size: cover;
	}
	&::after {
		border-radius: 100%;
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: currentColor;
	}
`

export default Loading