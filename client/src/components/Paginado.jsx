import React from "react";
import "./Home.css";

export default function Paginado ({dogsPage, allDogs, paginado}){
    const pagesNumbers = []

    for (let i=1; i <= Math.ceil(allDogs/dogsPage); i++){
        pagesNumbers.push(i)
    }
    return (
        <nav>
            <ul className="paginado">
                {pagesNumbers &&
                pagesNumbers.map(number=>(
                    <li className="number">
                    <span className="separador"> | </span><button onClick={()=> paginado(number)}>{number}
                    </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}