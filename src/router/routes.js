import React from 'react';

import RouteTable from '../pages/Map'
import Map from '../pages/Map/ReadMap'



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
];
