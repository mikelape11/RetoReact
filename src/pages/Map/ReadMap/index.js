import React, { useState, useEffect} from 'react';

//Leaflet
import { MapContainer, TileLayer, Polyline, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-extra-markers/dist/js/leaflet.extra-markers.js.map';
import 'leaflet-extra-markers/dist/js/leaflet.extra-markers.min.js';
import 'leaflet-extra-markers/dist/js/leaflet.extra-markers.js';
import 'leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css';
import { Row, Col, Breadcrumb, Typography } from 'antd';

const {Title, Text} = Typography;
const icon = '/img/user.png'


const Map = () =>{
    const [ruta, setRuta] = useState(null)
    const [pregunta, setPregunta] = useState(null)
    const [divVisible, setDivVisible] = useState(false);
    const [divData, setDivData] = useState(null);
    const [users, setUsers] = useState(null)

    const [position] = useState([43.345257,-1.79636])
    const [zoom] = useState(13)

    const [polylineData, setPolylineData] = useState(null);

    const iconPerson = new L.Icon({
        iconUrl: icon,
        iconRetinaUrl: icon,
        iconAnchor: null,
        popupAnchor: null,
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        shadowSize: null,
        shadowAnchor: null,
        iconSize: new L.Point(60, 75),
    });


    useEffect(()=>{
        fetch(`http://localhost:8080/routes/${window.location.href.substring(window.location.href.lastIndexOf('/') + 1)}`)
        .then(res => res.json())
        .then(
            (result)=>{
                setRuta(result)
                let poly = result.rutas_data.map(d=> [d.lat, d.lng]);
                console.log(poly);
                setPolylineData(poly);
            }
        )
        fetch(`http://localhost:8080/preguntas/${window.location.href.substring(window.location.href.lastIndexOf('/') + 1)}`)
        .then(res => res.json())
        .then(
            (result)=>{
                setPregunta(result)
            }
        )
        fetch(`http://localhost:8080/ubicacion/todos`)
        .then(res => res.json())
        .then(
            (result)=>{
                setUsers(result)
            }
        )
    },[])
    
    useEffect(()=>{
        const ac = new AbortController();
        fetch(`http://localhost:8080/ubicacion/todos`)
        .then(res => res.json())
        .then(
            (result)=>{
                setUsers(result)
            }
        )
        return () => ac.abort(); // Abort both fetches on unmount
    })
    useEffect(()=>{
        if(polylineData){
            setPolylineData(null)
        }
    },[polylineData])

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
    const MyComponentSetView = ({polyline}) =>{
        const map = useMap();
        console.log("polyline ha cambiado", polyline);
        if(polyline) map.fitBounds(polyline);
        return null
    }
    return ruta ? (
        <div>
            <Row justify={'space-between'}>
                <Col span={12}><Title>Gestión de rutas <Text type="secondary">Consulta</Text></Title></Col>
                <Col span={12}>
                    <Breadcrumb separator=">" >
                        <Breadcrumb.Item>Gestión de Rutas</Breadcrumb.Item>
                        <Breadcrumb.Item>Tabla de datos</Breadcrumb.Item>
                        <Breadcrumb.Item>Consulta de ruta</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row justify="space-between">
                <Col><h1>Nombre: {ruta.nombre}</h1></Col>
                <Col><h1>Ciudad: {ruta.ciudad}</h1></Col>
                <Col><h1>Distancia: {(Math.round((ruta.distancia/1000)*100))/100} km</h1></Col>
                <Col><h1>Tiempo estimado: {Math.round((ruta.tiempo/1000)/60)} min</h1></Col>
            </Row>
            <MapContainer center={position} zoom={zoom} style={{ height: 'calc(105vh - 210px)' }}>
                {divVisible ? <DivPreguntas/> : null}
                <MyComponentSetView polyline={polylineData}/>
                <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"/>
                {ruta.rutas_data && ruta.rutas_data.map((ll,a)=>{
                    if(a===0){
                        return null
                    }
                    return <Polyline  key={'latlng'+a} weight={4} pathOptions={{color: 'orange'}} positions={[[ruta.rutas_data[a-1].lat, ruta.rutas_data[a-1].lng],[ll.lat, ll.lng]]}></Polyline>
                })}
                {ruta.rutas_loc && ruta.rutas_loc.map((mrkr,a)=>{
                    let descMarker = new L.ExtraMarkers.Icon({
                         markerColor: 'orange', icon: 'fa-number', number: `${a+1}`
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
                {
                    users && users.map((user,a)=>{
                        console.log(user)
                        return <Marker icon={iconPerson} position={[user.lat, user.lng]}></Marker>
                    })
                }
            </MapContainer>
        </div>
    ) : <p>Cargando...</p>
}

export default Map;