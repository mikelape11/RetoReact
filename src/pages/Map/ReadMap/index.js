import React, { useState, useEffect} from 'react';

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
    const [pregunta, setPregunta] = useState(null)
    const [divVisible, setDivVisible] = useState(false);
    const [divData, setDivData] = useState(null);


    useEffect(()=>{
        fetch(`http://localhost:8080/routes/${window.location.href.substring(window.location.href.lastIndexOf('/') + 1)}`)
        .then(res => res.json())
        .then(
            (result)=>{
                setRuta(result)
            }
        )
        fetch(`http://localhost:8080/preguntas/${window.location.href.substring(window.location.href.lastIndexOf('/') + 1)}`)
        .then(res => res.json())
        .then(
            (result)=>{
                setPregunta(result)
            }
        )
    },[])

    const POSITION_CLASSES = {
        bottomleft: 'leaflet-bottom leaflet-left',
        bottomright: 'leaflet-bottom leaflet-right',
        topleft: 'leaflet-top leaflet-left',
        topright: 'leaflet-top leaflet-right',
    }

    const DivPreguntas = () =>{
        console.log(divData)
        return(
            <div className={"panel " + POSITION_CLASSES.bottomleft}>
                <div className="panel-heading">Información de la pregunta</div>
                <div className="panel-body">
                    <h1>Pregunta: {divData.pregunta}</h1>
                    {divData.respuestas.map((resp,a)=>{
                        if(divData.opcion===a+1){
                            return <h1 key={"opcion"+a}><b>{a+1+") "}{resp.respuesta}</b></h1>
                        }else{
                            return <h1 key={"opcion"+a}>{a+1+") "}{resp.respuesta}</h1>
                        }
                    })}
                </div>

            </div>
        )
    }

    function ChangeView () {
        const map = useMap();
        map.setView([ruta.rutas_data[Math.trunc((ruta.rutas_data.length)/2)].lat, ruta.rutas_data[Math.trunc((ruta.rutas_data.length)/2)].lng], 15);
        return null;
      }

    return ruta ? (
        <MapContainer center={[43.25, -1.25]} zoom={5} style={{ height: 'calc(105vh - 210px)' }}>
            <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"/>
            {ruta ? <ChangeView/> : null}
            {ruta.rutas_data && ruta.rutas_data.map((ll,a)=>{
                if(a===0){
                    return null
                }
                return <Polyline  key={'latlng'+a} weight={4} positions={[[ruta.rutas_data[a-1].lat, ruta.rutas_data[a-1].lng],[ll.lat, ll.lng]]}></Polyline>
            })}
            {ruta.rutas_loc && ruta.rutas_loc.map((mrkr,a)=>{
                let descMarker = new L.ExtraMarkers.Icon({
                     markerColor: 'blue', icon: 'fa-number', number: `${a+1}`
                });
                return <Marker key={'marker'+a} icon={descMarker} position={[mrkr.lat, mrkr.lng]} eventHandlers={{
                    mouseover:()=>{
                        let aux = pregunta.find(element => element.numPregunta===(a+1))
                        setDivData(aux)
                        setDivVisible(true);
                    },
                    mouseout:()=>{
                        setDivVisible(false);
                    }
                }}></Marker>
            })}
            {divVisible ? <DivPreguntas/> : null}
        </MapContainer>
    ) : <p>Cargando...</p>
}

export default Map;