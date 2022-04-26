import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getSearchNAme } from "../actions";
import "./searchBar.css";

export default function SearchBar (){
    const dispatch = useDispatch();
    const [name, setName] = useState ("");

function handlerInputChange(e){
    e.preventDefault();
    setName(e.target.value); // lleno el valor del estado local con lo que escribe el usuario 
    console.log(name)
}

function handlerSubmit(e){
    e.preventDefault();
    dispatch(getSearchNAme(name)) // lo que he guardao que escribio el usuario , es mi accion a despachar 
}
    return (
        <div className="Search">
            <input
            type= 'text'
            placeholder="Buscar..."
            onChange={(e)=>{handlerInputChange(e)}}
            />
            <button type="submit" onClick={(e)=>{handlerSubmit(e)}}>Buscar</button>
        </div>
    )
}