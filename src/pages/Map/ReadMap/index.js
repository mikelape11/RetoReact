import React, { useState, useEffect, useRef } from 'react';

//Leaflet
import { MapContainer, TileLayer, Polyline, useMap, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-extra-markers/dist/js/leaflet.extra-markers.js.map';
import 'leaflet-extra-markers/dist/js/leaflet.extra-markers.min.js';
import 'leaflet-extra-markers/dist/js/leaflet.extra-markers.js';
import 'leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css';

const Map = () =>{
    const [ruta, setRuta] = useState(null)

    useEffect(()=>{
        fetch(`http://localhost:8080/routes/${window.location.href.substring(window.location.href.lastIndexOf('/') + 1)}`)
        .then(res => res.json())
        .then(
            (result)=>{
                setRuta(result)
            }
        )
    },[])
    return ruta ? (
        <MapContainer center={[43.25, -1.25]} zoom={5} style={{ height: 'calc(105vh - 210px)' }}>
            <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"/>
            {ruta.rutas_data && ruta.rutas_data.map((ll,a)=>{
                console.log(ll)
                if(a===0){
                    return null
                }
                return <Polyline  key={'latlng'+a} weight={4} positions={[[ruta.rutas_data[a-1].lat, ruta.rutas_data[a-1].lng],[ll.lat, ll.lng]]}></Polyline>
            })}
            {ruta.rutas_loc && ruta.rutas_loc.map((ll,a)=>{
                let descMarker = new L.ExtraMarkers.Icon({
                     markerColor: 'blue', prefix: 'fa',
                });
                return <Marker key={'marker'+a} icon={descMarker} position={[ll.lat, ll.lng]}></Marker>
            })}
        </MapContainer>
    ) : <p>Cargando...</p>
}

export default Map;