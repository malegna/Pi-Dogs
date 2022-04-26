import React from 'react';  
import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'; 
import { getDogs, getTemperaments, filterCreated, orderName, orderWeight } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card.jsx';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import "./Home.css";




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
    const [peso, setPeso] = useState ("")
    
   

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

    function handlerSortAsDe(e){
        e.preventDefault();
        dispatch(orderName(e.target.value))
        setCurrentPage(1); // seteame la pagina en la primera 
        setOrden(`Ordenado ${e.target.value}`) // setOrder para que cuando yo setee la pagina, me modifique el estado local y me renderice. set modifica estados
    };

    function handlerWeight(e){
        e.preventDefault();
        dispatch(orderWeight(e.target.value))
        setCurrentPage(1);
        setPeso(`Ordenado ${e.target.value}`)
    }




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
            <div className='Nav'>
            <Link to ='/dog'>CREAR PERRO</Link>
            </div>
            
            <div className='center'>
            <h1>PAGINA DE PERROS</h1> 
            </div>

            <div className='Reset'>
            <button onClick={e=>{handleClick(e)}}>
                Volver a Cargar Perros</button>
                </div>
            <div>
            <div className='Order'>
                <select onChange = {e =>handlerSortAsDe(e)}>
                    <option value="">Orden Alfabetico</option>
                    <option value= 'asc'> A a Z</option> 
                    <option value = 'des'> Z a A</option>
                </select>
               
                

                <select onChange = {e =>handlerWeight(e)}>
                    <option value="">Orden por Peso</option>
                    <option value= 'LIGHTEST'> Mas Liviano a mas Pesado</option> 
                    <option value = 'HEAVIEST'> Mas Pesado a mas Liviano</option>
                </select>
                </div>

                <div className='Filter'>
                <select onChange={temperamentChange}>
                    <option value ={''}> Filtro por Temperamentos </option>
                    {temperaments ? (temperaments.map((el)=>{
                        return (
                            <option key={el.id} value={el.name} > {el.name}</option>
                        );
                    }) 
                    ) : (
                        <option>Temperaments</option>
                      )}
                </select>
                </div>
                
               
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
                   
                    <div>
                <select onChange={e => handlerFilterCreated(e) }>
                <option value="">Orden Por Razas</option>
                    <option value = 'all'>Todas las Razas</option>
                    <option value = 'created'>Creados</option>
                    <option value = 'original'>Existente(Traidos de la api)</option>
                </select>
                <Paginado
                dogsPage={dogsPage}
                allDogs = {allDogs.length}
                paginado ={paginado}
                />
                </div>
                
                <SearchBar/>
                </div>
                
                <div className='todos'>
                {
                   currentDogs?.map((element) =>{
                        return (
                            <div>
                                <Link to = {"/dogs/"+ element.id}>
                                <Card name={element.name} 
                                img={element.img} 
                                weigth={!element.create ? element.weight + ` kg`: `${element.weight.min ? element.weight.min : ""} ${
                                    element.weight.max ? " - " + element.weight.max : ""}  kg`} 
                                temperament={!element.create ? element.temperament + ' ' : element.temperaments.map(el => el.name + (' ,'))} key={element.id}/>
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

