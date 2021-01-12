import React from 'react';

import RouteTable from '../pages/Map'
import Map from '../pages/Map/ReadMap'
import RouteCreator from '../pages/Map/CreateRoute'
import Preguntas from '../pages/Preguntas'

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
    },
    {
        key: "4",
        path:"/preguntas",
        exact: true,
        text: "Pregunta",
        body: ()=><Preguntas/>
    }
];
