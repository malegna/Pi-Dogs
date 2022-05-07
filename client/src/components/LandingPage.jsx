import React from "react";
import { Link } from "react-router-dom";
import './landing.css'
import Zeus from '../imagen/img/Zeus1.png'


export default function LandingPage (){
    return (
            <div className="fondo">
                <div className="landing">
                    <div className="Titulo">
                <h1>Bienvenidos a la Página de Perros de Zeus</h1>
                </div>
                </div>
                <Link to = '/home'>
                    <button className="Ingreso"
                    >Ingresar</button>
                </Link>
                <div className="Zeus">
                <img src={Zeus} class = "Zeus" alt="imagen de Zeus"/>
                </div>
            </div>
    )
}