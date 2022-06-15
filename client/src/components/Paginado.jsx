import React from "react";
import "./Home.css";

export default function Paginado ({dogsPage, allDogs, paginado, actual}){
    const pagesNumbers = []

    for (let i=1; i <= Math.ceil(allDogs/dogsPage); i++){
        pagesNumbers.push(i)
    }
    return (
        <div className="Numbers">
      {pagesNumbers.length ? (
        <div>
          {pagesNumbers.map((num) => (
            <button className={ num === actual? 'selectedPage': 'Num'} key={num} onClick={() => paginado(num)}>
              {num}
            </button>
          ))}
        </div>
      ) : (
        <p><button className='Num'>1</button></p>
      )}
    </div>
  );
    //     <nav>
    //         <ul className="paginado">
    //             {pagesNumbers &&
    //             pagesNumbers.map(number=>(
    //                 <li className="number">
    //                 <span className="separador">  </span><button className={ number === actual? 'selectedPage': 'Num'} key={number} onClick={()=> paginado(number)}>
    //                     {number}
    //                 </button>
    //                 </li>
    //             ))}
    //         </ul>
    //     </nav>
    // )
}