import React, { Component } from 'react'
import { Container, Row, Col } from 'react-grid-system'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Footer from '../components/Footer'
import Loading from './../components/Loading'
import Map from './../components/Map'
import Markers from '../components/Markers'
import Navbar from '../components/Navbar'
import Raised from '../components/Raised'

// Imgs
import Alef from './../assets/img/alef.png'
import Bruno from './../assets/img/bruno.png'
import Camilla from './../assets/img/camilla.png'
import Leonardo from './../assets/img/leonardo.png'
import Rafael from './../assets/img/rafael.png'
import Raphael from './../assets/img/raphael.png'

// Icons
import { ReactComponent as GithubIcon } from './../assets/img/github.svg'
import { ReactComponent as LinkedInIcon } from './../assets/img/linkedin.svg'

import data from '../data/data_2021.json'

class About extends Component {

	state = {
		filtered: data.filter((current) => current.pais === 'Brasil'),
		isLoading: true,
	}

	componentDidMount() {
		document.title = 'Sobre nós - Firewatch'

		const self = this
		setTimeout(() => self.setState({
			isLoading: false,
		}), 2000)
	}
	
	render() {
		const { filtered, isLoading } = this.state

		const center = {
			lat: Number.parseFloat(filtered[0].latitude),
			lng: Number.parseFloat(filtered[0].longitude),
		}

		return (
			<div className='About'>
				<Loading visible={isLoading}/>
				<Navbar/>
				<Map center={center}>
					<Markers data={filtered}/>
                </Map>
				<Raised>
                    <Container>
                        <Row>
                            <Col md={12}>
								<TitleAbout>Quem somos nós</TitleAbout>
							</Col>
							<Col 
								sm={12} 
								md={4}
								className="center">
								<ImgMember src={Alef} alt="Alef Felix de Farias"/>
								<MemberGroupIcons>
									<a
										target="_blank"
										className='MemberIcon'
										href="https://github.com/ariusxi">
										<GithubIcon/>
									</a>
									<a
										target="_blank"
										className='MemberIcon'
										href="https://www.linkedin.com/in/alef-felix/">
										<LinkedInIcon/>
									</a>
								</MemberGroupIcons>
								<p>
									Alef Felix de Farias <br/>
									RA: 819152004
								</p>
							</Col>
							<Col 
								sm={12} 
								md={4}
								className="center">
								<ImgMember 
									src={Bruno} 
									alt="Bruno Leiva Pires"/>
								<MemberGroupIcons>
									<a
										target="_blank"
										className='MemberIcon'
										href="https://github.com/brunoleiva">
										<GithubIcon/>
									</a>
									<a
										target="_blank"
										className='MemberIcon'
										href="https://www.linkedin.com/in/bruno-leiva-pires/">
										<LinkedInIcon/>
									</a>
								</MemberGroupIcons>
								<p>
									Bruno Leiva Pires<br/>
									RA: 819152987
								</p>
							</Col>
							<Col 
								sm={12} 
								md={4}
								className="center">
								<ImgMember 
									src={Rafael} 
									alt="Rafael de Paula"/>
								<MemberGroupIcons>
									<a
										target="_blank"
										className='MemberIcon'
										href="https://github.com/DePaulaRafael">
										<GithubIcon/>
									</a>
									<a
										target="_blank"
										className='MemberIcon'
										href="https://linkedin.com/in/rafael-de-paula-lima">
										<LinkedInIcon/>
									</a>
								</MemberGroupIcons>
								<p>
									Rafael de Paula Lima <br/>
									RA: 819152501
								</p>
							</Col>
						</Row>
						<Row>
							<Col 
								sm={12} 
								md={4}
								className="center">
								<ImgMember src={Camilla} alt="Camilla Regina Freitas Silva"/>
								<MemberGroupIcons>
									<Link
										target="_blank"
										className='MemberIcon'
										to={{ pathname: "https://github.com/CamillaFreitas" }}>
										<GithubIcon/>
									</Link>
									<Link
										target="_blank"
										className='MemberIcon'
										to={{ pathname: "https://www.linkedin.com/in/camilla-freitas-9507a9194/" }}>
										<LinkedInIcon/>
									</Link>
								</MemberGroupIcons>
								<p>
									Camilla Regina Freitas Silva<br/>
									RA: 819119143
								</p>
							</Col>
							<Col 
								sm={12} 
								md={4}
								className="center">
								<ImgMember 
									src={Raphael} 
									alt="Raphael Batista"/>
								<MemberGroupIcons>
									<a
										target="_blank"
										className='MemberIcon'
										href="https://github.com/RaphaelAbracos">
										<GithubIcon/>
									</a>
									<a
										target="_blank"
										className='MemberIcon'
										href="https://www.linkedin.com/in/raphael-batista-6254671a4/">
										<LinkedInIcon/>
									</a>
								</MemberGroupIcons>
								<p>
									Raphael Batista<br/>
									RA: 81911633
								</p>
							</Col>
							<Col 
								sm={12} 
								md={4}
								className="center">
								<ImgMember 
									src={Leonardo} 
									alt="Rafael de Paula"/>
								<MemberGroupIcons>
									<a
										target="_blank"
										className='MemberIcon'
										href="https://github.com/LeonardoLBasso">
										<GithubIcon/>
									</a>
									<a
										target="_blank"
										className='MemberIcon'
										href="https://www.linkedin.com/in/leonardo-basso-711558199/">
										<LinkedInIcon/>
									</a>
								</MemberGroupIcons>
								<p>
									Leonardo Lara Basso<br/>
									RA: 819110027
								</p>
							</Col>
						</Row>
					</Container>
				</Raised>
				<Footer copyrightText={'© Firewatch - Todos os direitos reservados.'}/>
			</div>
		)
	}

}

const TitleAbout = styled.h3`
	text-align: center;
	margin-bottom: 40px;
`

const ImgMember = styled.img`
	width: 50%;
	border-radius: 50%;
	margin: 40px 0;
	border: 2px solid var(--member-img-member-border);
	position: relative;
	transition: all .2s;
`

const MemberGroupIcons = styled.div`
	width: 100%;
	position: relative;
	display: block;
	margin-bottom: 10px;
`

export default About