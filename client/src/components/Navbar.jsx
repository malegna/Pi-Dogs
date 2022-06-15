import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

export default function NavBar() {

    return (
        <div className='Nav'>
        <div className='Logo'>
            <Link to = '/home'>
        <h3>ZEUS APP</h3>
        </Link>

        <Link to ='/dog'>
        <div className="centro">
          <h6>CREAR NUEVA RAZA</h6>
        </div>
        </Link>
        </div>
        </div>
    )
}