import React, { useState, useEffect } from 'react';

import { Select } from 'antd';

const {Option} = Select;

const Preguntas =() =>{
    const [ciudades, setCiudades] = useState(null);
    const [aux, setAux] = useState([]);
    const [rutas, setRutas] = useState(null);
    useEffect( ()=>{
        if(!ciudades){
            fetch(`http://localhost:8080/routes/all`)
            .then(res => res.json())
            .then(
                (result)=>{
                    result && result.map((ruta)=>{
                        setAux(aux =>[...aux, ruta.ciudad])
                    })
                    setCiudades(Array.from(new Set(aux)))
                }
            )
        }
        
    },[aux])
    
    const RutasCiudad = (e) =>{
        fetch(`http://localhost:8080/routes/ciudad/${e}`)
            .then(res => res.json())
            .then(
                (result)=>{
                    console.log(result)
                    setRutas(result)
                    console.log(rutas)
                }
            )
    }

    //hay que hacer que reciba todas las ciudades de las rutas que hayen una array/lista sin que se repitan
    //mas o menos hecho, spring es una puta mierda

    return(
        <div>
           
            {ciudades ? <Select onChange={RutasCiudad}>
                {ciudades && ciudades.map((ciudad,a)=>{
                    return <Option key={'ciudad'+a} value={ciudad}>{ciudad}</Option>
                }
                )}
            </Select>: null}
            <h1>{ciudades}</h1>
            {rutas ? <Select>
                {rutas && rutas.map((ruta,a)=>{
                    return <Option key={'ruta'+a} value={ruta.nombre}>{ruta.nombre}</Option>
                }
                )}
            </Select>: null}
        </div>
    )
}

export default Preguntas;