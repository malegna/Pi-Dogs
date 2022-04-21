import React from 'react';  
import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'; 
import { getDogs, getTemperaments, filterCreated, orderName } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card.jsx';
import Paginado from './Paginado';

export default function Home (){
    //paginado
    const dispatch = useDispatch()
    const allDogs = useSelector ((state) => state.dogs)
    const [currentPage, setCurrentPage] = useState (1)
    const [dogsPage, setDogsPage] = useState(8)
    const indexOfLastDog = currentPage * dogsPage
    const indexOfFirstDog = indexOfLastDog - dogsPage
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)
    //const allTemperaments = useSelector((state)=> state.allDogs)
    
    // temperaments
    const temperaments = useSelector((state) => state.temperaments);
    const [temperamentSelected, setTemperamentSelected] = useState("")

    //order
    const [orden, setOrden] = useState("") // estado local vacio 
    
   

    const paginado =(pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    // const temperamentChange = (e) => {
    //     let temperament = e.target.value
    //     dispatch(setTemperamentSelect(temperament))
    // }

    useEffect (()=> {
        dispatch(getDogs()); // es lo mismo que hacer el mapdispatch to props 
    },[dispatch]) // para que no se me genere un bucle infinito de llamados. 

    useEffect (()=> {
        dispatch(getTemperaments()); // es lo mismo que hacer el mapdispatch to props 
    },[dispatch])

    function handleClick(e){ // funcion para que me resetee los personajes 
        e.preventDefault(); // evita que se rompa cada vez que cargamos las cosas 
        dispatch(getDogs()); // le paso la accion que quiero hacer, la accion que me trae los personajes. 
    }

    // function handlerFilTertemperaments (e){
    //     dispatch(filterTemperaments(e.target.value === 'all'));
    // }

    const temperamentChange = (e) => {
        let temperament = e.target.value
        setTemperamentSelected(temperament)
    }

    function handlerFilterCreated (e){
        dispatch(filterCreated(e.target.value))
    }

    function handlerSort (e){
        e.preventDefault();
        dispatch(orderName(e.target.value))
        setCurrentPage(1); // seteame la pagina en la primera 
        setOrden(`Ordenado ${e.target.value}`) // setOrder para que cuando yo setee la pagina, me modifique el estado local y me renderice. set modifica estados
    };
    // function handlerFilterCreated (e){
    //     if (
    //         e.target.value === 'original' ||
    //         e.target.value === 'created' ||
    //         e.target.value === 'all'
    //       )
    //     dispatch(filterCreated(e.target.value))
    // }

    

    return (
        <div>
            <Link to ='/dogs'>Crear Perrito</Link>
            <h1>Pagina de Perritos</h1> 
            <button onClick={e=>{handleClick(e)}}>
                Volver a cargar perritos</button>
            <div>
                <select onChange = {e =>handlerSort(e)}>
                    <option value= 'asc'> Asendente</option> 
                    <option value = 'des'> Desendente</option>
                </select>

                <select onChange={temperamentChange}>
                    <option value ={''}> --by Temperaments </option>
                    {temperaments ? (temperaments.map((el)=>{
                        return (
                            <option key={el.id} value={el.name} > {el.name}</option>
                        );
                    }) 
                    ) : (
                        <option>Temperaments</option>
                      )}
                </select>
                <div className="dogs-container">
                {temperamentSelected &&
                    currentDogs
                    .filter((dog) => dog.temperament?.includes(temperamentSelected))
                    .map((dog) => (
                        <Card 
                            img= {dog.img} 
                            name={dog.name} 
                            temperament={dog.temperament}
                            weight={dog.weight}
                            />
                    ))}
                    </div>

                <select onChange={e => handlerFilterCreated(e) }>
                    <option value = 'all'>Todas las Razas</option>
                    <option value = 'created'>Creados</option>
                    <option value = 'original'>Existente(Traidos de la api)</option>
                </select>
                <Paginado
                dogsPage={dogsPage}
                allDogs = {allDogs.length}
                paginado ={paginado}
                />
                {
                   currentDogs?.map((element) =>{
                        return (
                            <div>
                                <Link to = {"/home"}>
                                <Card name={element.name} img={element.img} weigth={`${element.weight} kg`} temperament={element.temperament}/>
                                </Link>
                            </div>
                        )
                    })
                }
                
            </div>
        </div>
    )
}

// value me permite acceder al valor 
// pendiente crear en el filtro de temperamentos un map, en la creacion     

