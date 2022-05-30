import React, { Component } from 'react'
import { Container, Row, Col } from 'react-grid-system'

import Chart from '../components/Chart'
import Footer from '../components/Footer'
import FilterMenu from '../components/FilterMenu'
import Heatmap from '../components/Heatmap'
import Map from '../components/Map'
import Markers from '../components/Markers'
import Navbar from '../components/Navbar'
import Raised from '../components/Raised'
import Tabs from '../components/Tabs'

import data from '../data/data_2021.json'

class Home extends Component {

	state = {
		filtered: data.filter((current) => current.pais === 'Brasil'),
		filterMenuShow: false,
	}

	months = {
		1: "Janeiro",
		2: "Fevereiro",
		3: "Março",
		4: "Abril",
		5: "Maio",
		6: "Junho",
		7: "Julho",
		8: "Agosto",
		9: "Setembro",
		10: "Outubro",
		11: "Novembro",
		12: "Dezembro",
	}

    tabs = [{
        title: 'Estado',
        content: (
            <Chart
                title='Estados com mais casos de queimadas'
                chartData={this.filterChartData("estado", ['Estado', 'Quantidade'])}
                />
            ),
    }, {
        title: 'Biomas',
        content: (
        <Chart
            title='Biomas com mais casos de queimadas'
            chartData={this.filterChartData("bioma", ['Bioma', 'Quantidade'])}
            chartType="BarChart"/>
        ),
    },
    {
        title: 'Mês',
        content: (
        <Chart
            title='Meses com mais casos de queimadas no ano de 2021'
            chartData={this.filterChartDataPerMonth()}
            chartType="ColumnChart"/>
        ),
    }]

	componentDidUpdate() {
		console.log('A página carregou')
	}

	getMonthOptions = () => Object.values(this.months)

    filterHeatmapData() {
        const values = this.state.filtered.map((row) => [
            row.latitude, 
            row.longitude,
        ])
  
        return values
    }

    filterChartData(fieldName, labels) {
        const values = this.state.filtered
            .map((row) => row[fieldName])
            .reduce((row, current) => {
                const property = current
                row[property] = row[property] || []
                row[property].push(row)
                return row
            }, {})
		
        const states = Object.keys(values)
        const chart = Object.values(values)
            .map((row, index) => [states[index], row.length])
            .sort((a,b) => b[1] - a[1])
            .slice(0, 5)

        return [labels, ...chart]
    }
    
    filterChartDataPerMonth() {
        const values = this.state.filtered
            .map((row) => this.months[new Date(row.datahora).getMonth()])
            .reduce((row, current) => {
                const property = current
                row[property] = row[property] || []
                row[property].push(row)
                return row
            }, {})

        const states = Object.keys(values)
        const chart = Object.values(values)
			.map((row, index) => [states[index], row.length])
			.sort((a,b) => b[1]-a[1])
			.slice(0,5)
        return [['Mês','Quantidade'], ...chart]
    }
    
    render() {
		const { 
			filtered, 
			filterMenuShow, 
		} = this.state

        return (
            <div className="Main">
                <Navbar/>
                <Map center={{
                    lat: Number.parseFloat(filtered[0].latitude),
                    lng: Number.parseFloat(filtered[0].longitude),
                }}>
					<Markers data={filtered}/>
                </Map>
                <Raised>
                    <Container>
                        <Row>
                            <Col md={12}>
                                <h3 align="center">Sobre o projeto</h3>
                                <p>
                                    O objetivo deste projeto é apresentar um relatório ambiental com a centralização 
                                    de informações sobre queimadas em florestas no Brasil e suas origens, utilizando 
                                    dados emitidos por órgãos oficiais, compilando as principais causas e suas recorrências 
                                    por meio de coordenadas geográficas.<br/><br/>
                                    Para isso será utilizado um algoritmo que adotará a metodologia de Deep Learning para 
                                    filtrar a presença de focos de incêndio com base em imagens extraídas de um banco de 
                                    dados com essas ocorrências em diversos biomas. A partir dessa detecção, teremos inclusive 
                                    a captura dos dados geográficos com a localização da ocorrência, efetuando registros para 
                                    sinalizações futuras, capazes de identificar se aquela área possui chances de se tornar um 
                                    foco recorrente de incêndios.
                                </p>
                            </Col>
                            <Col md={12}>
                                <Tabs tabs={this.tabs}/>
                            </Col>
                            <Col md={12}>
                                <h3 align="center">Relatório Analítico</h3>
                                <p>
                                    Para trabalharmos com os dados de queimadas, utilizamos um órgão especializado para o levantamento
                                    desses dados que o INPE, decidimos optar pelos relatórios mais recentes que o mesmo emitiu para o
                                    início do ano de 2021 até o final, com isso podemos analisar alguns fatores bem interessantes com
                                    base no que foi analisado. O dataset disponibilizado pela instituição, tem os dados organizados de
                                    forma que haja a menor quantidade de variáveis para armazenar a maior quantidade de dados possíveis,
                                    com nomes subentendidos e fáceis de se analisar, sendo estes: “bioma”, que fala sobre o bioma que 
                                    ocorreu o incêndio, “municipio”, que fala sobre a cidade que ocorreu o fogo, “estado”, referente a 
                                    Unidade Federal, ”latitude” e “longitude”, que fornecem coordenadas exatas, e “datahora”, referindo-se 
                                    ao dia e a hora do ocorrido.
                                </p>
                            </Col>
                            <Col md={12}>
                                <Map 
                                    mapWidth='100%'
                                    center={{
                                        lat: Number.parseFloat(data[0].latitude),
                                        lng: Number.parseFloat(data[0].longitude),
                                    }}>
                                    <Heatmap positions={this.filterHeatmapData()}/>
                                </Map>
                            </Col>
                        </Row>
                    </Container>
                </Raised>
				<FilterMenu
					visible={filterMenuShow}
					toggleVisible={() => this.setState(() => ({
						filterMenuShow: !filterMenuShow,
					}))}/>
                <Footer copyrightText={'© Firewatch - Todos os direitos reservados.'}/>
            </div>
        )
    }

}


export default Home