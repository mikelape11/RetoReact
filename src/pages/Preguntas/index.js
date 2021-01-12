import React, { useState, useEffect} from 'react';

import { Select } from 'antd';

const {Option} = Select;

const Preguntas =() =>{
    const [preg, setPreg] = useState(null)
    useEffect(()=>{
        fetch(`http://localhost:8080/preguntas/all`)
        .then(res => res.json())
        .then(
            (result)=>{
                console.log(result)
                setPreg(result)
            }
        )
    },[])
    //hay que hacer que reciba todas las ciudades de las rutas que hayen una array/lista sin que se repitan

    return(
        <div>
            <Select>
            </Select>
            <h1>dd</h1>
        </div>
    )
}

export default Preguntas;