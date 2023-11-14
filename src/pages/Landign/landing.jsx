import React from "react";
import './Landing.css'
import {Link} from "react-router-dom"


const Landing=()=>{
    return(
        <div className="landing-back">
            <div className="landing-container">
                <h1 className="letra">API games</h1>
                <Link to="/home">
                    <button className="landing-boton">INGRESAR</button>
                </Link>
            </div>
        </div>
    )
}

export default Landing;