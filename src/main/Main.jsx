import React, { Component } from 'react'
import { Container, Row, Col } from 'react-grid-system'

import Chart from '../components/Chart'
import Footer from './../components/Footer'
import Map from './../components/Map'
import Navbar from './../components/Navbar'
import Raised from '../components/Raised'
import Tabs from '../components/Tabs'

import data from './../data/data.json'

class Main extends Component {

    tabs = [{
        title: 'Estados',
        content: (
            <Chart
                title='Estados com mais casos de queimadas'
                chartData={this.filterChartData(data)}/>
            ),
    }, {
        title: 'Aba 2',
        content: 'Conteúdo da aba 2',
    }]

    filterMarkersData = () => data.filter((current) => current.pais === 'Brasil')

    filterChartData() {
        const values = data
            .filter((row) => row.pais === 'Brasil')
            .map((row) => row.estado)
            .reduce((row, current) => {
                const property = current
                row[property] = row[property] || []
                row[property].push(row)
                return row
            }, {})
        
        const states = Object.keys(values)
        const chart = Object.values(values)
            .map((row, index) => [states[index], row.length])
            .slice(0, 5)

        return [['Estado', 'Quantidade'], ...chart]
    }

    render() {
        return (
            <div className="Main">
                <Navbar/>
                <Map markers={this.filterMarkersData()}/>
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
                                    markers={this.filterMarkersData()}/>
                            </Col>
                        </Row>
                    </Container>
                </Raised>
                <Footer copyrightText={'© Firewatch - Todos os direitos reservados.'}/>
            </div>
        )
    }

}


export default Main