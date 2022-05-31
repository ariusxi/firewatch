import React, { Component } from 'react'
import { Container, Row, Col } from 'react-grid-system'

import Chart from '../components/Chart'
import Footer from '../components/Footer'
import FilterMenu from '../components/FilterMenu'
import Heatmap from '../components/Heatmap'
import Loading from '../components/Loading'
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
		isLoading: true,
		filters: [],
	}

	defaultLat = -15.7801
	defaultLng = -47.9292

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
                chartData={this.filterChartData("estado", ['Estado', 'Quantidade'])}/>
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

	constructor(props) {
		super(props)

		this.filterData = this.filterData.bind(this)
		this.resetFilters = this.resetFilters.bind(this)
	}

	componentDidMount() {
		document.title = 'Home - Firewatch'

		const self = this
		setTimeout(() => self.setState({
			isLoading: false,
		}), 2000)
	}

	getMonthOptions = () => Object.values(this.months)

	getFieldOptions = (fieldName) => {
		const values = data.map((row) => row[fieldName])
			.sort(function(a, b){
				if(a < b) return -1
				if(a > b) return 1
				return 0;
			})

		return [...new Set(values)].filter((current) => current !== '')
	}

	getBiomeOptions = () => this.getFieldOptions('bioma')

	getStateOptions = () => this.getFieldOptions('estado')

	getCountyOptions = () => this.getFieldOptions('municipio')

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

	resetFilters() {
		this.setState({
			filters: [],
			filterMenuShow: false,
			filtered: data.filter((current) => current.pais === 'Brasil'),
		})
	}

	filterData(fieldName, fieldValue) {
		let { filters } = this.state

		if (fieldValue === '') {
			filters = filters.filter((currentFilter) => currentFilter.fieldName !== fieldName)
		}

		const indexFilter = filters.findIndex((filter) => filter.fieldName === fieldName)
		if (indexFilter !== -1) {
			filters[indexFilter].fieldValue = fieldValue
		} else filters.push({
			fieldName,
			fieldValue,
		})

		filters = filters.filter((filter) => filter.fieldValue !== '')

		let currentFilteredValue = data.filter((current) => current.pais === 'Brasil')
		for (const currentFilter of filters) {
			if (currentFilter.fieldName !== 'mes') {
				currentFilteredValue = currentFilteredValue
					.filter((current) => current[currentFilter.fieldName] === currentFilter.fieldValue)
			} else {
				currentFilteredValue = currentFilteredValue
					.filter((current) => {
						const currentMonth = this.months[new Date(current.datahora).getMonth()]
						return currentMonth && currentMonth === fieldValue
					})
			}
		}

		this.setState({
			filters,
			filtered: currentFilteredValue,
			filterMenuShow: false,
		})
	}
    
    render() {
		const { 
			filtered,
			filters,
			filterMenuShow,
			isLoading,
		} = this.state

		const center = {
			lat: Number.parseFloat(filtered.length > 0 ? filtered[0].latitude : this.defaultLat),
			lng: Number.parseFloat(filtered.length > 0 ? filtered[0].longitude : this.defaultLng),
		}

        return (
            <div className="Main">
				<Loading visible={isLoading}/>
                <Navbar/>
                <Map center={center}>
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
									marginTop='30px'
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
					filters={filters}
					filterData={this.filterData}
					resetFilters={this.resetFilters}
					monthList={this.getMonthOptions()}
					biomeList={this.getBiomeOptions()}
					stateList={this.getStateOptions()}
					countyList={this.getCountyOptions()}
					toggleVisible={() => this.setState(() => ({
						filterMenuShow: !filterMenuShow,
					}))}/>
                <Footer copyrightText={'© Firewatch - Todos os direitos reservados.'}/>
            </div>
        )
    }

}


export default Home