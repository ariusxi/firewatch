import React from 'react'
import styled from 'styled-components'

const Navbar = () => {
    return (
        <NavbarWrapper>
            <NavbarContainer>
                <NavbarBrand>
                    Firewatch
                </NavbarBrand>
            </NavbarContainer>
        </NavbarWrapper>
    )
}

const NavbarWrapper = styled.nav`
    padding-top: 25px;
    padding: 0.625rem 0;
    background-color: transparent;
    box-shadow: none;
    color: var(--navbar-color);
`

const NavbarContainer = styled.div`
    width: 80vw;
    margin: 20px auto;
`

const NavbarBrand = styled.div`
    text-transform: uppercase;
    color: var(--navbar-color);
`

export default Navbar