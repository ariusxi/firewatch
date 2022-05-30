import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import FireBrand from './../../assets/img/firebrand.png'

const Navbar = () => {
    return (
        <NavbarWrapper>
            <NavbarContainer>
                <NavbarBrand>
					<Link to={{ pathname: '/' }}>
						<img 
							src={FireBrand} 
							alt={FireBrand}/>
					</Link>
                </NavbarBrand>
				<NavLinks>
					<Link to={{ pathname: '/about' }}>
						Quem somos
					</Link>
				</NavLinks>
            </NavbarContainer>
        </NavbarWrapper>
    )
}

const NavbarWrapper = styled.nav`
    z-index: 1;
    position: absolute;
    width: 100vw;
    padding-top: 25px;
    padding: 0.625rem 0;
    background-color: transparent;
    box-shadow: none;
    color: var(--navbar-color);
`

const NavbarContainer = styled.div`
    width: 80vw;
	display: grid;
    grid-template-columns: repeat(2, 50%);
    margin: 20px auto;
`

const NavbarBrand = styled.div`
    font-weight: bold;
    text-transform: uppercase;
    color: var(--navbar-color);
    img {
        width: 8rem;
    }
`

const NavLinks = styled.div`
	text-align: right;
	a {
		font-weight: bold;
		color: var(--navbar-color);
		line-height: 40px;
		text-decoration: none;
	}
`

export default Navbar