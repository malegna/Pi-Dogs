import React from 'react';
import './card.css'
import TemperDis from './TemperamentoNoDisponible';


export default function Card ({ name, img, temperament, weigth}) {

    return (
          <div className="card"> 
            <h3 className='nameCard'>{name}</h3> 
              <img className= "img-dog" src= {img} alt='imagen no diponible' width= "200px" height="250px"></img>
                <p className="peso">Peso: {weigth}</p>  
                <p className="temperamento-card">Temperamento: <p/></p> 

                <div className="AllTemps">
            <TemperDis temperament={temperament}/>
           
          </div>     
          </div>
      );
    }
    
