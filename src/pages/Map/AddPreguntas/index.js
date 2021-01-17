import React, { useState, useEffect } from 'react';

import {Button, Form, Input, Radio} from 'antd';

const AnadirPregunta = () =>{
    const [ruta, setRuta] = useState(null)
    useEffect(()=>{
        fetch('http://localhost:8080/routes/ultima_ruta')
        .then(res => res.json())
        .then(
            (result)=>{
                setRuta(result)
            }
        )
    },[])

    return(
        <div>
            <Form>
                {ruta && ruta.rutas_loc.map((loc,a)=>{
                    return <div>
                                <Form.Item key={"preg"+a} name={"preg"+a} label={"Pregunta nº"+a}>
                                    <Input></Input>
                                </Form.Item>
                                <Form.Item key={"opcion"+a+"1"} name={"opcion"+a+"1"} label={"Respuesta 1"}><Input></Input></Form.Item>
                                <Form.Item key={"opcion"+a+"2"} name={"opcion"+a+"2"} label={"Respuesta 2"}><Input></Input></Form.Item>
                                <Form.Item key={"opcion"+a+"3"} name={"opcion"+a+"3"} label={"Respuesta 3"}><Input></Input></Form.Item>
                                <Form.Item name={"radio-group"+a} label="Respuesta correcta♥">
                                  <Radio.Group>
                                    <Radio value={1}>Respuesta 1</Radio>
                                    <Radio value={2}>Respuesta 2</Radio>
                                    <Radio value={3}>Respuesta 3</Radio>
                                  </Radio.Group>
                                </Form.Item>
                            </div>
                })}
            </Form>
        </div>
    )
}

export default AnadirPregunta;