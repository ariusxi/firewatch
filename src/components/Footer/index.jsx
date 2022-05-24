import React from 'react'
import styled from 'styled-components'
import { Container } from 'react-grid-system'

const Footer = ({ copyrightText }) => {
    return (
        <FooterWrapper>
            <Container>
                <CopyrightContent>{copyrightText}</CopyrightContent>
            </Container>
        </FooterWrapper>
    )
}

const FooterWrapper = styled.div`
    color: var(--footer-text-color);
    padding: 0.9375rem 0;
    text-align: center;
    display: flex;
`

const CopyrightContent = styled.div`
    padding: 15px 0;
    float: right;
`

export default Footer