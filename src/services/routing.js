import axios from 'axios';

function getRoute(lat1, lng1, lat2, lng2) {
    return axios.get("https://graphhopper.com/api/1/route?point=" + lat1 + "," + lng1 + "&point=" + lat2 + "," + lng2 + "&vehicle=foot&locale=de&calc_points=true&points_encoded=false&key=75fbf8a1-dfb9-4102-84fb-123f5de9855e")
        .then(res => {
            if (res.status === 200) {
                let obj = [];
                res.data.paths[0].points.coordinates.forEach(el => {
                    obj.push({ lat: el[1], lng: el[0] })
                })
                return { latLon: obj, array: res.data.paths[0].points.coordinates };
            }
        })
        .catch(() => { return { error: "Routing fail!" } });
}

export const routingService = {
    getRoute
};