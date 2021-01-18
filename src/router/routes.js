import React from 'react';

import RouteTable from '../pages/Map'
import Map from '../pages/Map/ReadMap'
import RouteCreator from '../pages/Map/CreateRoute'
import AnadirPregunta from '../pages/Map/AddPreguntas'
import Preguntas from '../pages/Preguntas'
import UserTable from '../pages/Usuarios'
import UpdateUsuario from '../pages/Usuarios/UpdateUsuario'

export const routes = [
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
    },{
        key: "3",
        path: "/routes_create/add_pregunta",
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
        key: "7",
        path:"/usuarios",
        exact: true,
        text: "Usuarios",
        body: ()=><UserTable/>
    },
    {
        key: "8",
        path:"/usuarios/update/{id}",
        exact: true,
        text: "Usuarios",
        body: ()=><UpdateUsuario/>
    }
];
