import React from "react";
import { Link } from "react-router-dom";
import './landing.css'


export default function LandingPage (){
    return (
            <div className="landing">
                <h1>Bienvenidos a la mejor pagina de Perros del mundo mundial</h1>
                <Link to = '/home'>
                    <button>Ingresar</button>
                </Link>
            </div>
    )
}