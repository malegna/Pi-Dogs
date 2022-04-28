import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postDog, getTemperaments } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import "./DogCreate.css";

function validate(input){
    let errors ={};
    const valiName = /^([a-zA-Z ]+)$/i;
    const valiImg = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/i;

    if(!input.name){
        errors.name = 'Nombre requerido';
    }else if (!input.life_span) {
        errors.life_span = 'Años de vida es requerido';
    } else if (!input.height.min || !input.height.max) {
        errors.height = "El campo Altura debe estar completamente diligenciado";
    } else if (!input.weight.min || !input.weight.max) {
        errors.weight = "El campo Peso debe estar completamente diligenciado";
    } else if (!input.temperament || input.temperament.length < 2) {
        errors.temperament = "Porfavor, seleccione mas de dos";
    }
    if (input.name && !valiName.test(input.name)) {
        errors.name = "El nombre no puede incluir caracteres especiales o números";
      }
    if (input.img && !valiImg.test(input.img)) {
        errors.img = "Porfavor, verifique la Url";
      }
    if (input.weight && input.weight.min > input.weight.max) {
        errors.weight = "Porfavor, verifique su valor";
      }
    if (input.height && input.height.min > input.height.max) {
        errors.height = "Porfavor, verifique su valor";
      }
    return errors;
}

export default function CreateDogs(){
    const dispatch = useDispatch();
    const history = useHistory();
    const temperamentos = useSelector ((state)=> state.temperaments) // aqui nos traemos los temperaments a este estado
    const [errors, setErrors] = useState ({});

    const [input, setInput] = useState({ // aqui guardamos la info del formulario en este estado local 
        name: "",
        height: {
            min: 0,
            max: 0,
          },
          weight: {
            min: 0,
            max: 0,
          },
        life_span: "",
        temperament: [],
        img:"",
        create: true
        
    })

    function handlerChange(e){ // controla cada vez que cambien o se modifiquen mis inputs 
        setInput({
            ...input, // traete todo lo que tengas en ese estado
            [e.target.name] : e.target.value // guardame o modificame (setear) el valor que tengo por el que selecciona el usuario (todo los names)
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value

        }))
    }

    function handleHeight(e){
        e.preventDefault();
        setInput({
            ...input,
            height : {
                ...input.height,
                [e.target.name] : parseInt(e.target.value)
            }
        })
        setErrors(validate({
            ...input,
            height : {
                ...input.height,
                [e.target.name] : parseInt(e.target.value)
            }

        }))
    }

    function handleWeight(e){
        e.preventDefault();
        setInput({
            ...input,
            weight : {
                ...input.weight,
                [e.target.name] : parseInt(e.target.value)
            }
        })
        setErrors(validate({
            ...input,
            weight : {
                ...input.weight,
                [e.target.name] : parseInt(e.target.value)
            }
        }))
    }

    function handlerSelect(e){
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value] // en el arreglo de temperaments guardo lo que tenga el input en temp y le voy agregando los select seleccionados 
        })
        setErrors(validate({
            ...input,
            temperament: [...input.temperament, e.target.value]
        }))
    }

    function handlerSubmit(e){
        e.preventDefault();
        if (
            input.name &&
            input.weight.min &&
            input.weight.max &&
            input.temperament.length > 1
          ) {
        dispatch(postDog(input))
        alert('Personaje creado con éxito!')
        setInput({
        name: "",
        height: {
            min: 0,
            max: 0,
          },
        weight: {
            min: 0,
            max: 0,
          },
        life_span: "",
        temperament: [],
        img:""
        })
      history.push('/home') 
    } else {
        alert('Debe diligenciar todos los campos solicitados');
        }
    }

    function handlerDelete(el){
        setInput({
            ...input,
            temperament : input.temperament.filter(tem => tem !== el) // nos muestra el estado nuevo sin ese elemento al que le di clic 
        })
    }

    useEffect(()=>{ // despachar la accion para poder renderizarla aqui 
        dispatch(getTemperaments());
    },[dispatch]);

    

    return (
        <div className='formulario'>
            <Link to= '/home'> <button>Volver</button> </Link>
            <h1>Crea tu Personaje!</h1>

            <form onSubmit={(e) => handlerSubmit(e)}>
               
                    <label>Nombre</label>
                
                    <input className='estilo'
                    type= 'text'
                    value= {input.name}
                    name= 'name'
                    onChange={(e)=> handlerChange(e)}
                    />
                    {errors.name && (
                            <p className='error'>{errors.name}</p>
                        )}
               

                <div>
                    <label>Altura (cm)</label>
                    <div className="MinMax">
                    <label>Min:</label>
                    <input
                    type= 'number'
                    value={input.height.min}
                    name='min'
                    onChange={handleHeight}
                    min={0}
                    step={5}
                    />

                    <label>Max:</label>
                    <input
                    type= 'number'
                    value={input.height.max}
                    name='max'
                    onChange={handleHeight}
                    min={0}
                    step={5}
                    />  
                    {errors.height && <p className="error">{errors.height}</p>}
                    </div>
                </div>

                <div>
                    <label>Peso (kg)</label>
                    <div className="MinMax">
                    <label>Min:</label>
                    <input
                    type= 'number'
                    value={input.weight.min}
                    name='min'
                    onChange={handleWeight}
                    min={0}
                    step={5}
                    />

                    <label>Max:</label>
                    <input
                    type= 'number'
                    value={input.weight.max}
                    name='max'
                    onChange={handleWeight}
                    min={0}
                    step={5}
                    />
                    {errors.weight && <p className="error">{errors.weight}</p>}
                    </div>
                </div>

                <div>
                    <label>Años de Vida</label>
                    <input
                    className='estilo'
                    type='text'
                    value={input.life_span}
                    name='life_span'
                    placeholder='Ejemplo 6 - 8 años'
                    onChange={(e)=> handlerChange(e)}
                    />
                    {errors.life_span && (
                            <p className='error'>{errors.life_span}</p>
                        )}
                </div>

                <div>
                <label>Temperamentos: </label>
                    <select className='estilo' onChange ={(e)=> handlerSelect(e)}>
                        {temperamentos.map((temp) =>(
                            <option value={temp.name}>{temp.name}</option>
                        ))}
                    </select>
                    <ul>{input.temperament.map(el =>
                <div className='divTem'> 
                <p>{el}</p>
                <button onClick={()=>handlerDelete(el)}>X</button>
                </div>
                )}</ul>
                    {errors.temperament && <p className="error">{errors.temperament}</p>}
                </div>

                <div>
                    <label>Imagen</label>
                    <input
                    className='estilo'
                    type='text'
                    value={input.img}
                    name='img'
                    placeholder='Pon la url de la imagen'
                    onChange={(e)=> handlerChange(e)}
                    />
                     {errors.img && <p className="error">{errors.img}</p>}
                </div>

                <button type='submit'>Crear Personaje</button>
            </form>
            
        </div>
    )

}