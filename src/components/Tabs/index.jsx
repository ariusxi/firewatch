import React, { useState } from 'react'
import styled from 'styled-components'

const Tabs = ({ tabs }) => {
    const [tab, setTab] = useState(0)
    return tabs ? (
        <TabsWrapper>
            <TabGroupButton>
                {tabs.map((currentTab, index) => (
                    <TabButton
                        key={index} 
                        active={index === tab}
                        onClick={() => setTab(index)}>
                        {currentTab.title}
                    </TabButton>
                ))}
            </TabGroupButton>
            {tabs.map((currentTab, index) => index === tab ? ( 
				<TabContent
					md={12}
					key={index}>
					{currentTab.content}
				</TabContent>
			) : '')}
        </TabsWrapper>
    ) : ''
}

const TabsWrapper = styled.div`
    border-top: 1px solid var(--tabs-wrapper-border-color);
    border-bottom: 1px solid var(--tabs-wrapper-border-color);
    margin: 30px 0;
    width: 100%;
    padding-top: 15px;
    padding-bottom: 25px;
    position: relative;
`

const TabGroupButton = styled.div`
    position: relative;
    display: flex;
    flex: 1 0 auto;
    transform: none;
    will-change: transform;
`

const TabButton = styled.button`
    color: ${({active}) => active ? 'var(--tabs-text-color-active)' : 'var(--tabs-text-color)'};
    height: 48px;
    font-size: .875rem;
    line-height: 2.25rem;
    font-weight: 500;
    letter-spacing: .0892857143em;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0 24px;
    position: relative;
    display: flex;
    flex: 1 0 auto;
    justify-content: center;
    box-sizing: border-box;
    margin: 0;
    border: none;
    outline: none;
    background: transparent;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    z-index: 1;
    transition: .2s;
    border-bottom: 2px solid ${({active}) => active ? 'var(--tabs-border-color)' : 'transparent'};
`

const TabContent = styled.div`
    width: 100%;
    position: relative;
    display: block;
`

export default Tabs