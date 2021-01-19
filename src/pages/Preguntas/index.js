import React, { useState, useEffect } from 'react';

import { Input, Select, Form, Radio } from 'antd';

const {Option} = Select;

const Preguntas = () =>{
    const [ciudades, setCiudades] = useState(null);
    const [aux, setAux] = useState([]);
    const [rutas, setRutas] = useState(null);
    const [preg, setPreg] = useState(null);
    useEffect( ()=>{
        if(!ciudades){
            fetch(`http://localhost:8080/routes/all`)
            .then(res => res.json())
            .then(
                (result)=>{
                    // eslint-disable-next-line
                    result && result.map((ruta)=>{
                        setAux(aux =>[...aux, ruta.ciudad])
                    })
                    setCiudades(Array.from(new Set(aux)))
                }
            )
        }
    // eslint-disable-next-line
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
    const PreguntasRuta = (e) =>{
        console.log(e)
        fetch(`http://localhost:8080/preguntas/${e}`)
            .then(res => res.json())
            .then(
                (result)=>{
                   console.log(result)
                   setPreg(result)
                }
            )
    }
    return(
        <div>
            {ciudades ? <Select onChange={RutasCiudad}>
                {ciudades && ciudades.map((ciudad,a)=>{
                    return <Option key={'ciudad'+a} value={ciudad}>{ciudad}</Option>
                }
                )}
            </Select>: null}
            <h1>{ciudades}</h1>
            {rutas ? <Select onChange={PreguntasRuta}>
                {rutas && rutas.map((ruta,a)=>{
                    return <Option key={'ruta'+a} value={ruta.id}>{ruta.nombre}</Option>
                }
                )}
            </Select>: null}
            
            {preg ? 
                <Form>
                    {preg && preg.map((p,a)=>{
                        console.log(p)
                        return <div key={"pregunta"+a}>
                            <Form.Item key={"preg"+a} name={"preg"+a} label={"Pregunta nº"+p.numPregunta} initialValue={p.pregunta}>
                                <Input></Input>
                            </Form.Item>
                            <Form.Item key={"opcion"+a+p.respuestas[0].numRespuesta} name={"opcion"+a+p.respuestas[0].numRespuesta} label={"Respuesta "+p.respuestas[0].numRespuesta} initialValue={p.respuestas[0].respuesta}><Input></Input></Form.Item>
                            <Form.Item key={"opcion"+a+p.respuestas[1].numRespuesta} name={"opcion"+a+p.respuestas[1].numRespuesta} label={"Respuesta "+p.respuestas[1].numRespuesta} initialValue={p.respuestas[1].respuesta}><Input></Input></Form.Item>
                            <Form.Item key={"opcion"+a+p.respuestas[2].numRespuesta} name={"opcion"+a+p.respuestas[2].numRespuesta} label={"Respuesta "+p.respuestas[2].numRespuesta} initialValue={p.respuestas[2].respuesta}><Input></Input></Form.Item>
                            <Form.Item name={"radio-group"+a} label="Respuesta correcta♥">
                              <Radio.Group defaultValue={p.opcion}>
                                <Radio value={1}>Respuesta 1</Radio>
                                <Radio value={2}>Respuesta 2</Radio>
                                <Radio value={3}>Respuesta 3</Radio>
                              </Radio.Group>
                            </Form.Item>
                        </div>
                    })}
                </Form>
            : null}
            
            
        </div>
    )
}

export default Preguntas;