import React, { useState, useEffect } from 'react';

import { Input, Select, Form, Breadcrumb, Typography, Radio, Row, Col, Button } from 'antd';

const {Option} = Select;

const {Title, Text} = Typography;

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
        setPreg(null)
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

    const ActPreguntas = (data) =>{
        // eslint-disable-next-line
        preg && preg.map((p,index)=>{
            fetch(`http://localhost:8080/preguntas/${p._id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    'pregunta': data[`preg`+index],
                    'opcion' : data[`radio-group`+index],
                    'respuestas':[
                        {
                            'numRespuesta': 1,
                            'respuesta': data[`opcion${index}1`]
                        },{
                            'numRespuesta': 2,
                            'respuesta': data[`opcion${index}2`]}
                        ,{
                            'numRespuesta': 3,
                            'respuesta': data[`opcion${index}3`]
                        }
                    ]
                })
            }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
            window.location.reload();
        })
    }
    return(
        <div>
            <Row justify={'space-between'}>
              <Col span={12}><Title>Gestión de Preguntas <Text type="secondary">Formulario</Text></Title></Col>
              <Col span={12}>
                <Breadcrumb separator=">" >
                  <Breadcrumb.Item>Gestión de Preguntas</Breadcrumb.Item>
                  <Breadcrumb.Item>Modificaciones y lectura</Breadcrumb.Item>
                </Breadcrumb>
              </Col>
            </Row>
            <Row justify="space-between">
                <Col span={12}>
                    {ciudades ? <Select showSearch placeholder="Seleccione una ciudad" onChange={RutasCiudad}>
                        {ciudades && ciudades.map((ciudad,a)=>{
                            return <Option key={'ciudad'+a} value={ciudad}>{ciudad}</Option>
                        }
                        )}
                    </Select>: <p>Cargando...</p>}
                </Col>
                <Col span={12}>
                    {rutas ? <Select showSearch placeholder="Seleccione una ruta" onChange={PreguntasRuta}>
                        {rutas && rutas.map((ruta,a)=>{
                            return <Option key={'ruta'+a} value={ruta._id}>{ruta.nombre}</Option>
                        }
                        )}
                    </Select>: null}
                </Col>
            </Row>
            {preg ? 
                <Form onFinish={ActPreguntas}>
                    {preg && preg.map((p,a)=>{
                        console.log(p)
                        return <div key={"pregunta"+a}>
                            <Form.Item key={"preg"+a} name={"preg"+a} label={"Pregunta nº"+p.numPregunta} required initialValue={p.pregunta}>
                                <Input></Input>
                            </Form.Item>
                            <Form.Item required key={"opcion"+a+p.respuestas[0].numRespuesta} name={"opcion"+a+p.respuestas[0].numRespuesta} label={"Respuesta "+p.respuestas[0].numRespuesta} initialValue={p.respuestas[0].respuesta}><Input></Input></Form.Item>
                            <Form.Item required key={"opcion"+a+p.respuestas[1].numRespuesta} name={"opcion"+a+p.respuestas[1].numRespuesta} label={"Respuesta "+p.respuestas[1].numRespuesta} initialValue={p.respuestas[1].respuesta}><Input></Input></Form.Item>
                            <Form.Item required key={"opcion"+a+p.respuestas[2].numRespuesta} name={"opcion"+a+p.respuestas[2].numRespuesta} label={"Respuesta "+p.respuestas[2].numRespuesta} initialValue={p.respuestas[2].respuesta}><Input></Input></Form.Item>
                            <Form.Item name={"radio-group"+a} label="Respuesta correcta" required initialValue={p.opcion}>
                                {/*al mandar los datos pone undefined aunque esté marcado desde el inicio*/}
                                <Radio.Group>
                                    <Radio value={1}>Respuesta 1</Radio>
                                    <Radio value={2}>Respuesta 2</Radio>
                                    <Radio value={3}>Respuesta 3</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </div>
                    })}
                    <Button htmlType="submit">Actualizar preguntas</Button>
                </Form>
            : null}
        </div>
    )
}

export default Preguntas;