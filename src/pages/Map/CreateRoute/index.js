import React, { useState, useEffect } from 'react';

//Leaflet
import { MapContainer, TileLayer, Popup, Marker, Polyline, useMapEvents } from 'react-leaflet'

import {routingService} from '../../../services/routing'

//Import Leaflet and plugins
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {Form, Input} from 'antd';

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
var st='';
var cont = 0;

const RouteCreator = () => {
    const [mapState, setMapState] = useState(INITIAL_STATE); //Estado por defecto
    const [currentEventIvi, setCurrentEventIvi] = useState(null);
    const [track, setTrack] = useState([])

    //Cambiar posición
    const changeLocation = e => {
      console.log(e)
      setMapState({...mapState, lat: e.latlng.lat, lng: e.latlng.lng})
      console.log(mapState)
    };
    const Prueba = () =>{
      
      const map = useMapEvents({
        click: (e) => {
            if(currentEventIvi===null){
                setCurrentEventIvi({lat: e.latlng.lat, lng: e.latlng.lng})
              }else{
                routingService.getRoute(currentEventIvi.lat, currentEventIvi.lng, e.latlng.lat, e.latlng.lng)
                .then(response => {
                  if (response) console.log(response.latLon)
                  setTrack(track => [...track,...response.latLon])
                  setCurrentEventIvi({lat: e.latlng.lat, lng: e.latlng.lng})
                });
                //crear una ruta para ponerla debajo de la de vitoria y asociarla a los testconfig
                //mejorar creador de rutas para usarlo en el proyecto
              }
        }
      });
      return null;
      
    }

    //Corregir error de icono no encontrado
    //Si utilizas imagenes porpias para iconos o una libreria de marcadores, esto no hace falta
    useEffect(() => {
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
          iconUrl: require("leaflet/dist/images/marker-icon.png"),
          shadowUrl: require("leaflet/dist/images/marker-shadow.png")
        });
      }, []);

    let descMarker = new L.ExtraMarkers.Icon({
        markerColor: 'blue', prefix: 'fa',
    });
    return (
        <div>
            <Form>
                <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: 'El nombre es obligatorio!!' }]}>
                    <Input/>
                </Form.Item>
            </Form>
            <MapContainer 
              center={[mapState.lat, mapState.lng]} 
              zoom={mapState.zoom} 
              style={{ height: 'calc(100vh - 210px)' }}
            >
            <Prueba/>
                <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                />
                
            {track ? <Polyline positions={track}></Polyline>: null}
            </MapContainer>
        </div>
        
      )
};

export default RouteCreator;