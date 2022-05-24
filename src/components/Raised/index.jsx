import React from 'react'
import styled from 'styled-components'

const Raised = ({ children }) => {
    return (
        <RaisedWrapper>
            {children}
        </RaisedWrapper>
    )
}

const RaisedWrapper = styled.div`
    padding: 40px 20px;
    z-index: 100;
    position: relative;
    color: var(--raised-text-color);
    background-color: var(--raised-background-color);
    margin: -60px 10vw 0;
    border-radius: 6px;
    box-shadow:
        0 16px 24px 2px rgb(0 0 0 / 14%), 
        0 6px 30px 5px rgb(0 0 0 / 12%), 
        0 8px 10px -5px rgb(0 0 0 / 20%);
    
    @media only screen and (max-width: 412px) {
        margin: -60px 30px 0;
    }
`

export default Raised