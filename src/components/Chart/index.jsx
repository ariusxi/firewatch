import React from 'react'
import ChartMD from 'react-google-charts'
import styled from 'styled-components'

const Chart = ({
    title,
    chartData = [],
    is3D = false,
    textColor = '#fff',
    backgroundColor = '#2a2b31',
}) => {

    const options = {
        title,
        is3D,
        backgroundColor,
        titleTextStyle: { 
            fontFamily: "Montserrat, Arial, Helvetica, sans-serif;", 
            color: textColor,
        },
        legend: { 
            fontFamily: "Montserrat, Arial, Helvetica, sans-serif;", 
            textStyle: { 
                color: textColor,
            },
        },
    }

    return (
        <ChartContainer>
            <ChartMD
                width={'100%'}
                chartType='PieChart'
                data={chartData} 
                options={options}/>
        </ChartContainer>
    );
}

const ChartContainer = styled.div`
    display:flex;
    width:100%;
    justify-content: center;
    align-items: center;
`

export default Chart;
