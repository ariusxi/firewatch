import React, { Component } from 'react'

import Navbar from './../components/Navbar'
import Map from './../components/Map'

class Main extends Component {

    render() {
        return (
            <div className="Main">
                <Navbar/>
                <Map/>
            </div>
        )
    }

}



export default Main