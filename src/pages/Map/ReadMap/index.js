import React, { useState, useEffect, useRef } from 'react';

//Leaflet
import { MapContainer, TileLayer, Polyline, useMap, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () =>{

    return (
        <MapContainer center={[43.25, -1.25]} zoom={5} style={{ height: 'calc(105vh - 210px)' }}>
            <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"/>
        </MapContainer>
    )
}

export default Map;