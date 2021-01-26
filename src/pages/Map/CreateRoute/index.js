import React, { useState } from 'react';

//Leaflet
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from 'react-leaflet'

import {routingService} from '../../../services/routing'

//Import Leaflet and plugins
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {Button, Form, Input, Breadcrumb, Row, Col, Typography} from 'antd';

const {Title, Text} = Typography;

//estado por defecto
const INITIAL_STATE = {
    lat: 43.2612,
    lng: -1.779,
    zoom: 8,
    track: [
      [43.34365692013493, -1.7948913574218752],
      [42.815299518379796, -1.642112731933594],
      [41.60312076451184, -0.8569335937500001],
      [40.33817045213394, -1.0958862304687502],
      [40.09557563847372, -1.2575000524520874]
    ]
}

const RouteCreator = () => {
  const [mapState] = useState(INITIAL_STATE); //Estado por defecto
  const [rutaClick, setRutaClick] = useState(null);
  const [track, setTrack] = useState([]);
  const [markers, setMarkers] = useState([])
  const [markerMode, setMarkerMode] = useState(false);
  const [distancia, setDistancia] = useState(0);
  const [tiempo, setTiempo] = useState(0);

  //aux
  const [clickAux, setClickAux] = useState(null)
  const [cont, setCont] = useState(0)

  let descMarker = new L.ExtraMarkers.Icon({
    markerColor: 'blue', prefix: 'fa',
  });
  
  //Creador de ruta
  const CrearRuta = () =>{
  // eslint-disable-next-line
    const map = useMapEvents({
      click: (e) => {
        if(rutaClick===null){
          setRutaClick({lat: e.latlng.lat, lng: e.latlng.lng})
        }else{
          routingService.getRoute(rutaClick.lat, rutaClick.lng, e.latlng.lat, e.latlng.lng)
          .then(response => {
            if (!response.error){
              setTrack(track => [...track,...response.latLon])
              setClickAux({lat: rutaClick.lat, lng: rutaClick.lng})
              setRutaClick({lat: e.latlng.lat, lng: e.latlng.lng})
              setDistancia(distancia+response.distance)
              setTiempo(tiempo+response.time)
            } 
          });
        }
      }
    });
    return null;
  }

  //Funcion para añadir los puntos de las preguntas
  const CrearPuntos = () =>{
    // eslint-disable-next-line
    const map = useMapEvents({
      click:(e)=>{
        if(cont<7){//limite de 7 puntos
          setMarkers([...markers, e.latlng])
          setCont(cont+1)
        }
      }
    })
    return null
  }
  //Borrar Punto
  const BorrarPuntos = () =>{
    setMarkers(markers.filter(item => item !== markers[markers.length-1]))
    if(cont>0){
      setCont(cont-1)
    }
    return null;
  }

  //Funcion para deshacer
  const deshacerRuta = () => {
    setTrack(track.filter(item => item===clickAux))
    setClickAux(null)
    setRutaClick(null)
    setDistancia(0)
    setTiempo(0)
    //un intento de deshacer, pero borra toda la ruta
    //el problema es que, al guardarse en el array se reducen los decimales
  }

  const ChangeMode = ()=>{
    if(!markerMode){
      setMarkerMode(true)
    }else{
      setMarkerMode(false)
    }
  }
  const GuardarRuta = values =>{
    fetch(`http://localhost:8080/routes/save`,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:
        JSON.stringify({
          nombre: values.nombre,
          ciudad: values.ciudad,
          distancia: distancia,
          tiempo: tiempo,
          rutas_data: track,
          rutas_loc: markers,
        })
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => window.location.href=`/routes_create/add_pregunta/${response._id}`);
  }
 
  
  return (
    <div>
      <Row justify={'space-between'}>
          <Col span={12}><Title>Gestión de rutas <Text type="secondary">Creación</Text></Title></Col>
          <Col span={12}>
            <Breadcrumb separator=">" >
              <Breadcrumb.Item>Gestión de Rutas</Breadcrumb.Item>
              <Breadcrumb.Item>Creación de ruta</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <Form onFinish={GuardarRuta}>
          <Row justify="center">
            <Col span={7}>
              <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: 'El nombre es obligatorio!!' }]}>
                <Input/>
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item label="Ciudad" name="ciudad" rules={[{ required: true, message: 'La ciudad es obligatoria!!' }]}>
                  <Input/>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="center"><Col><Button htmlType="submit">Guardar Ruta</Button></Col></Row>
        </Form>
        <Row justify="space-around">
          <Col><Button onClick={ChangeMode}>Cambiar Modo</Button></Col>
          <Col><Button onClick={deshacerRuta}>Borrar ruta</Button></Col>
          <Col><Button onClick={BorrarPuntos}>Borrar última localización</Button></Col>
        </Row> 
        <h1>{(Math.round((distancia/1000)*100))/100} km</h1>
        <h1>{Math.round((tiempo/1000)/60)} min.</h1>
        <MapContainer 
          center={[mapState.lat, mapState.lng]} 
          zoom={mapState.zoom} 
          style={{ height: 'calc(100vh - 210px)' }}
        >
          {markerMode ? <CrearPuntos/> : <CrearRuta/>}
          {markers.length>0 ? 
            <div>
              {markers && markers.map((mark, a)=>{
                return <Marker key={"marker"+a} icon={descMarker} position={[mark.lat, mark.lng]}></Marker>
            })}
            </div>
            : null}
            <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"/>
        {track ? <Polyline positions={track}></Polyline>: null}
        </MapContainer>
    </div>
  )
};

export default RouteCreator;