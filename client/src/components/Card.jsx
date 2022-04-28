import React from 'react';
import './card.css';


export default function Card ({ name, img, temperament, weigth}) {

    return (
          <div className="card"> 
              <img className= "img-dog" src= {img} alt='imagen no diponible' width= "200px" height="250px"></img>
                <h1 className="titulo-card">{name}</h1>
                <p className="temperamento-card">Temperamento: <p/> {temperament}</p>  
                <p className="peso">Peso: <p/>  {weigth}</p>       
          </div>
      );
    }
    
