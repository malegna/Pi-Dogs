import React from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions/index';
import { useEffect } from 'react';
import './detail.css';
import NavBar from './Navbar';

export default function Detail(props){
    const dispatch = useDispatch();

    useEffect (()=>{
        dispatch(getDetail(props.match.params.id)); // para acceder al id desde el params
    })

    const myDog = useSelector ((state) => state.detail) // nos traemos el estdo global del reducer. 

    return (
        <div>
            <NavBar/>
            <div className='detail'>
            {
                myDog.length ?
                <div>
                    <h1>Soy {myDog[0].name}</h1>
                    <img className= "img-dogs" src={myDog[0].img ? myDog[0].img : myDog[0].image} alt ='' width='600px' height='700px' />
                    <h4>Peso: {!myDog[0].create ? myDog[0].weight + ` kg.`: `${myDog[0].weight.min ? myDog[0].weight.min : ""} ${
                    myDog[0].weight.max ? " - " + myDog[0].weight.max : ""}  kg.`}</h4>

                    <h4>Altura: {!myDog[0].create ? myDog[0].height.metric + ` cm.`: `${myDog[0].height.min ? myDog[0].height.min : ""} ${
                    myDog[0].height.max ? " - " + myDog[0].height.max : ""}  cm.`}</h4>
                    <h4>Años de vida: {myDog[0].life_span}</h4>
                    <h4>Temperamentos: <br/>{!myDog[0].create ? myDog[0].temperament + ' ' : myDog[0].temperaments.map(el => el.name + (' ,'))}</h4>
                   
                </div>  : <p>Loding...</p>
            }
            </div>
            <Link to = '/home' >
            <button className='botonV'>Volver</button>
            </Link>
            {/* {
                myDog.create ?
                <div>
                    <button>Editar</button>
                    <button>Eliminar</button>

                </div> :<button>Eliminar</button>
            } */}
            

        </div>




    )
}