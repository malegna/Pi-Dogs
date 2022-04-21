import React from "react";

export default function Paginado ({dogsPage, allDogs, paginado}){
    const pagesNumbers = []

    for (let i=0; i <= Math.ceil(allDogs/dogsPage); i++){
        pagesNumbers.push(i+1)
    }
    return (
        <nav>
            <ul className="paginado">
                {pagesNumbers &&
                pagesNumbers.map(number=>(
                    <li className="number">
                    <a onClick={()=> paginado(number)}>{number}
                    </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}