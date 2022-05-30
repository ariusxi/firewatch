import React from 'react'
import { Route, Routes as RoutesMD, BrowserRouter } from "react-router-dom"

import Home from './pages/Home'
import About from './pages/About'

const Routes = () => {
	return (
		<BrowserRouter>
			<RoutesMD>
				<Route path="/" exact element={<Home/>}/>
				<Route path="/about" exact element={<About/>}/>
			</RoutesMD>
		</BrowserRouter>
	)
}

export default Routes