import React, { Component } from 'react'

import Navbar from './../components/Navbar'
import Map from './../components/Map'

import markers from './../data/dataset.json'

class Main extends Component {

    constructor(props) {
        super(props)
        console.log(markers)
    }

    render() {
        return (
            <div className="Main">
                <Navbar/>
                <Map markers={markers}/>
            </div>
        )
    }

}



export default Main