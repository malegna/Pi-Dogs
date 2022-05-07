import React from 'react';
import './card.css'
import TemperDis from './TemperamentoNoDisponible';


export default function Card ({ name, img, temperament, weigth}) {

    return (
          <div className="card"> 
              <img className= "img-dog" src= {img} alt='imagen no diponible' width= "200px" height="250px"></img>
                <h1 className="titulo-card">{name}</h1> 
                <p className="peso">Peso: <p/>  {weigth}</p>  
                <p className="temperamento-card">Temperamento: <p/></p> 

                <div className="AllTemps">
            <TemperDis temperament={temperament}/>
           
          </div>     
          </div>
      );
    }
    
