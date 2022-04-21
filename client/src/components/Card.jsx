import React from 'react';
import { Link } from "react-router-dom";

export default function Card ({ name, img, temperament, weigth, id}) {

    return (
        <Link to={`/dog-detail/${id}`}>
          <div className="card-container">
              <img className= "img-dog" src= {img} width= "200px" height="250px"></img>
              <div className="titulo-dog-container">
                <p className="titulo-card">{name}</p>
                <br />
                <p className="temperamento-card">Temperamento: <br/> <p/> {temperament}</p>  
                <p className="peso">Peso: <br/> <p/> {weigth}</p>       
              </div>
          </div>
        </Link>    
      );
    }
    
//     return (
//         <div>
//             <h3>{name}</h3>
//             <h5>{temperament}</h5>
//             <h5>{weigth}</h5>
//             <img scr={img} width= "200px" height="250px"/>
//         </div>
//     )
// }