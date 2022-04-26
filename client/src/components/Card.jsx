import React from 'react';
import './card.css';


export default function Card ({ name, img, temperament, weigth}) {

    return (
          <div className="card">
              <img className= "img-dog" src= {img} width= "200px" height="250px"></img>
                <h1 className="titulo-card">{name}</h1>
                <p className="temperamento-card">Temperamento: <p/> {temperament}</p>  
                <p className="peso">Peso: <br/> <p/> {weigth}</p>       
          </div>
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