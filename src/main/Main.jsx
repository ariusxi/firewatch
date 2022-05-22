import React, { Component } from 'react'
import { Container, Row, Col } from 'react-grid-system'

import Navbar from './../components/Navbar'
import Map from './../components/Map'
import Footer from './../components/Footer'

import brasilData from './../data/datasetBrasil_2021.json'
import markers from './../data/data.json'
import Raised from '../components/Raised'
import PieChart from '../components/PieChart'

class Main extends Component {

    render() {
        return (
            <div className="Main">
                <Navbar/>
                <Map markers={markers}/>
                <Raised>
                    <Container>
                        <Row>
                            <Col md={12}>
                                <h3>Sobre o projeto</h3>
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
                        </Row>
                    </Container>
                </Raised>
                <h1>Graficos de Queimadas no Brasil</h1>
                <PieChart dataBrasil={brasilData}/>
                <Footer copyrightText={'© Firewatch - Todos os direitos reservados.'}/>
            </div>
        )
    }

}



export default Main