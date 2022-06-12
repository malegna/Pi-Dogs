import React from "react";
import { Link } from "react-router-dom";
import './landing.css'
import Zeus from '../imagen/img/Zeus1.png'
import Zeus2 from '../imagen/img/Zeus2.png'
import Zeus3 from '../imagen/img/Zeus3.png'
import Zeus4 from '../imagen/img/Zeus4.png'


export default function LandingPage (){
    return (
            <div className="fondo">
                <div className="landing">
                    <div className="Titulo">
                <h1>ZEUS APP</h1>
                </div>
                </div>
                <Link to = '/home'>
                    <button className="Ingreso"
                    >Ingresa Aqui</button>
                </Link>
                <div className="Zeus">
                <img src={Zeus4} class = "Zeus" alt="imagen de Zeus"/>
                </div>
            </div>
    )
}