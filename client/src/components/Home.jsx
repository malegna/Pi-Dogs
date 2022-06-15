import React from 'react';  
import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'; 
import { getDogs, getTemperaments, filterCreated, orderName, orderWeight, filterByTemper } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card.jsx';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import Navbar from './Navbar';
import "./Home.css";




export default function Home (){
    const dispatch = useDispatch()
    const allDogs = useSelector ((state) => state.dogs)

    //paginado
    const [currentPage, setCurrentPage] = useState (1) //pagina
    const [dogsPage, setDogsPage] = useState(8) // numero de cartas
    const indexOfLastDog = currentPage * dogsPage // multiplica para tener la posicion de la ultima carta //
    const indexOfFirstDog = indexOfLastDog - dogsPage //
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)
    
    // temperaments
    const temperaments = useSelector((state) => state.temperaments);
    const [temperamentSelected, setTemperamentSelected] = useState("") //guarda la info que seleccionen 

    //orden
    const [orden, setOrden] = useState("") // estado local vacio 
    const [peso, setPeso] = useState ("")
    const [creados, setCreados] = useState ("")
    
    //paginado
    const paginado =(pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    useEffect (()=> {
        dispatch(getDogs()); // es lo mismo que hacer el mapdispatch to props 
    },[dispatch]) // para que no se me genere un bucle infinito de llamados. 

    useEffect (()=> {
        dispatch(getTemperaments()); 
    },[dispatch])

    function handleClick(e){ 
        e.preventDefault();  
        dispatch(getDogs());  
    }

    function handlerSortAsDe(e){
        e.preventDefault();
        dispatch(orderName(e.target.value))
        setCurrentPage(1); // seteame la pagina en la primera 
        setOrden(`Ordenado ${e.target.value}`) // setOrder para que cuando yo modifique la pagina, me modifique el estado local y me renderice. set modifica estados
    };

    function handlerWeight(e){
        e.preventDefault();
        dispatch(orderWeight(e.target.value))
        setCurrentPage(1);
        setPeso(`Ordenado ${e.target.value}`)
    }

    const temperamentChange = (e) => {
        let temperament = e.target.value
        setCurrentPage(1);
        setTemperamentSelected(temperament) // modificar el estado los valore que va seleccionando 
    }

    function handlerFilterCreated (e){
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1);
        setCreados(e.target.value)
    }


    return (
        <div>
            <Navbar/>
            <div className='TopBoard'>
            <div>
            <button className='Reset' onClick={e=>{handleClick(e)}}>
                Volver a Cargar Razas </button>
                </div>
            <div>

                <div className='Order'>  
                <select onChange = {e =>handlerWeight(e)}>
                    <option value="">Orden por Peso</option>
                    <option value= 'LIGHTEST'> Mas Liviano a mas Pesado</option> 
                    <option value = 'HEAVIEST'> Mas Pesado a mas Liviano</option>
                </select>
                </div>


                    <div className='Filter'>
                <select onChange={e => handlerFilterCreated(e) }>
                <option value="">Orden Por Razas</option>
                    <option value = 'all'>Todas las Razas</option>
                    <option value = 'created'>Creados</option>
                    <option value = 'original'>Existente(Traidos de la api)</option>
                </select>
                </div>

                <div className='Order'>
                <select onChange = {e =>handlerSortAsDe(e)}>
                    <option value="">Orden Alfabetico</option>
                    <option value= 'asc'> A a Z</option> 
                    <option value = 'des'> Z a A</option>
                </select>
                </div>

                <div className='Filter'>
                <select onChange={(e)=>temperamentChange(e)}>
                    <option value =''> Filtro por Temperamentos </option>
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

              
               
                <SearchBar />
                </div>
                </div>

                <Paginado
                dogsPage={dogsPage}
                allDogs = {allDogs.length}
                paginado ={paginado}
                />

                <div className='todos'>
                { temperamentSelected ? temperamentSelected &&
                    allDogs
                    .filter((dog) => dog.temperament?.includes(temperamentSelected)) // filtra los temperamentos seleccinados y que se hayn guardado en el estado 
                    .map((element) => (
                        <div className='decoration'>
                        <Link to = {"/dogs/"+ element.id}>
                        <Card
                        name={element.name} 
                        img={element.img} 
                        weigth={!element.create ? element.weight + ` kg`: `${element.weight.min ? element.weight.min : ""} ${
                        element.weight.max ? " - " + element.weight.max : ""}  kg`} 
                        temperament={!element.create ? element.temperament + ' ' : element.temperaments.map(el => el.name + (' ,'))} key={element.id}/>
                        </Link>
                        </div>
                    )) :
                   currentDogs?.map((element) =>{
                        return (
                            <div className='decoration'>
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

