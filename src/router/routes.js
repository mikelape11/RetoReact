import React from 'react';

import Home from '../pages/about'
import RouteTable from '../pages/Map'
import Map from '../pages/Map/ReadMap'
import RouteCreator from '../pages/Map/CreateRoute'
import UpdateRouteData from '../pages/Map/UpdateRouteData'
import AnadirPregunta from '../pages/Map/AddPreguntas'
import Preguntas from '../pages/Preguntas'
import Ranking from '../pages/Ranking'
import UserTable from '../pages/Usuarios'
import ChatRoom from '../pages/Chat/ChatRoom/index'

export const routes = [
    {
        key: "0",
        path: "/",
        exact: true,
        text: "None",
        body: () => <Home /> 
    },
    {
        key: "1",
        path: "/routes",
        exact: true,
        text: "Mapa",
        body: () => <RouteTable /> 
    },
    {
        key: "2",
        path: "/routes/:id",
        exact: true,
        text: "Mapa",
        body: () => <Map /> 
    },
    {
        key: "3",
        path: "/routes_create",
        exact: true,
        text: "Mapa",
        body: ()=><RouteCreator />
    },
    {
        key: "35",
        path: "/routes_update/:id",
        exact: true,
        text: "Mapa",
        body: ()=><UpdateRouteData />
    },
    {
        key: "4",
        path: "/routes_create/add_pregunta/:id",
        exact: true,
        text: "Mapa_Pregunta",
        body: ()=><AnadirPregunta/>
    },
    {
        key: "5",
        path:"/preguntas",
        exact: true,
        text: "Pregunta",
        body: ()=><Preguntas/>
    },
    {
        key: "6",
        path:"/ranking",
        exact: true,
        text: "Ranking",
        body: ()=><Ranking/>
    },
    {
        key: "7",
        path:"/usuarios",
        exact: true,
        text: "Usuarios",
        body: ()=><UserTable/>
    },
    {
        key: "8",
        path:"/chats/:roomId",
        exact: true,
        text: "Chats",
        body: ()=><ChatRoom/>
    }
];
