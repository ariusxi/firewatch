import { useState, useEffect } from 'react';
import _ from 'lodash';
import Chart from 'react-google-charts';
import styled from 'styled-components'
function PieChart({ dataBrasil = [] }) {

    const ChartContainer = styled.div`
        display:flex;
        width:100%;
        justify-content: center;
        align-items: center;
    `
    const ChartFormGroup = styled.div`
        position: relative;
        padding: 15px 0 0;
        margin-right: 40px;
        margin-left: 40px;
        width: 50%;
    `
    const ChartInput = styled.input`
        font-family: inherit;
        width: 100%;
        border: 0;
        border-bottom: 2px solid #ac423a;
        outline: 0;
        font-size: 1.3rem;
        color: #fff;
        padding: 7px 0;
        background: transparent;
        transition: border-color 0.2s;

    `
    const ChartInputLabel = styled.label`
        top: 0;
        position: absolute;
        display: block;
        transition: 0.2s;
        font-size: 1rem;
        color: #ac423a;
    `
    const options = {
        title: "Estados com mais casos de queimadas",
        titleTextStyle: {  fontFamily: "Montserrat, Arial, Helvetica, sans-serif;", color:"#fff"},
        legend: { fontFamily: "Montserrat, Arial, Helvetica, sans-serif;", textStyle:{color:"#fff"}},
        is3D: false,
        backgroundColor: "#2a2b31"
    };
    const [data, setData] = useState([])
    const [topStates, setTopState] = useState(5)
    useEffect(() => {
        function getData() {
            const loadData = (data) => {
                const values = _.groupBy(data.results, (value) => {
                    if (value.pais === "Brasil")
                        return value.estado
                })
                const x = _.map(values, (value, key) => [key, value.length])
                const result = x.sort((a, b) => b[1] - a[1]).slice(0, topStates)
                //result.splice(0, 1)
                setData([["Páis", "Quantidades"], ...result])
            }
            loadData(dataBrasil)
        }
        getData()
    }, [topStates])
    return (
        <div className="App">
            <ChartContainer>
                <ChartFormGroup>
                    <ChartInputLabel for='states'>Estados</ChartInputLabel>
                    <ChartInput id='states' name='states' type="number" onInput={(e) => { e.preventDefault(); setTopState(e.target.value) }} defaultValue={topStates} min="1" max="20" />
                </ChartFormGroup>
                <Chart chartType='PieChart' data={data} width={"70%"} height={"400px"} options={options} />
            </ChartContainer>
        </div>
    );
}

export default PieChart;
