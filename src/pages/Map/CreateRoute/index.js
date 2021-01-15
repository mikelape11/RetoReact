import React, { useState, useEffect } from 'react';

//Leaflet
import { MapContainer, TileLayer, Popup, Marker, Polyline, useMapEvents } from 'react-leaflet'

import {routingService} from '../../../services/routing'

//Import Leaflet and plugins
import L, { marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {Button, Form, Input} from 'antd';

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
  const [mapState, setMapState] = useState(INITIAL_STATE); //Estado por defecto
  const [rutaClick, setRutaClick] = useState(null);
  const [track, setTrack] = useState([]);
  const [markers, setMarkers] = useState([])
  const [markerMode, setMarkerMode] = useState(false);
  const [distancia, setDistancia] = useState(0);
  const [tiempo, setTiempo] = useState(0);

  let descMarker = new L.ExtraMarkers.Icon({
    markerColor: 'blue', prefix: 'fa',
  });
  
  //Creador de ruta
  const CrearRuta = () =>{
    const map = useMapEvents({
      click: (e) => {
        if(rutaClick===null){
          setRutaClick({lat: e.latlng.lat, lng: e.latlng.lng})
        }else{
          routingService.getRoute(rutaClick.lat, rutaClick.lng, e.latlng.lat, e.latlng.lng)
          .then(response => {
            if (response) 
            console.log(response)
            setTrack(track => [...track,...response.latLon])
            setRutaClick({lat: e.latlng.lat, lng: e.latlng.lng})
            setDistancia(distancia+response.distance)
            setTiempo(tiempo+response.time)
          });
        }
      }
    });
    return null;
  }
  //Funcion para añadir los puntos de las preguntas
  const CrearPuntos = () =>{
    const map = useMapEvents({
      click:(e)=>{//hay que poner limite de 10 puntos
        setMarkers([...markers, e.latlng])
      }
    })
    return null
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
          rutas_data: track,
          rutas_loc: markers,
        })
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
    window.location.href='/routes_create/add_pregunta'
  }
  useEffect(() => {
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png")
      });
    }, []);
  
  return (
    <div>
        <Form onFinish={GuardarRuta}>
          <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: 'El nombre es obligatorio!!' }]}>
              <Input/>
          </Form.Item>
        <Button htmlType="submit">Guardar Ruta</Button>

        </Form>
        <Button onClick={ChangeMode}>Terminar ruta</Button>
        <h1>{(Math.round((distancia/1000)*100))/100} km</h1>
        <h1>{tiempo/1000} segundos</h1>
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