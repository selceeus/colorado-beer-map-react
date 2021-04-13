import React, { useRef, useEffect } from "react"
import mapboxgl from "mapbox-gl"

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

export const MapTest = () => {

    const mapContainer = useRef()

    useEffect(() => {

        const map = new mapboxgl.Map({
            container: "map",
            style: 'mapbox://styles/mapbox/light-v10',
            center: [-105.358887, 39.113014],
            zoom: 7,
            pitch: 45,
            antialias: true
        })

        map.on("load", () => {
            map.addSource("mapbox-dem", {
            type: "raster-dem",
            url: "mapbox://mapbox.mapbox-terrain-dem-v1",
            tileSize: 512,
            maxZoom: 16,
        })

        var layers = map.getStyle().layers;
        var labelLayerId;

        for (var i = 0; i < layers.length; i++) {
            if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                labelLayerId = layers[i].id;
            break;
            }
        }

        //map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 })

        map.addLayer({
            id: "sky",
            type: "sky",
            paint: {
                "sky-type": "atmosphere",
                "sky-atmosphere-sun": [0.0, 90.0],
                "sky-atmosphere-sun-intensity": 15,
            },
        })

        map.addLayer({
            'id': 'add-3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
                'fill-extrusion-color': '#aaa',
                
                // Use an 'interpolate' expression to
                // add a smooth transition effect to
                // the buildings as the user zooms in.
                'fill-extrusion-height': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15,
                    0,
                    15.05,
                    ['get', 'height']
                ],
                'fill-extrusion-base': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15,
                    0,
                    15.05,
                    ['get', 'min_height']
                ],
                'fill-extrusion-opacity': 0.6
            }
        },

        labelLayerId

        )
    })
}, [])

    return (
        <div
            id="map"
            ref={mapContainer}
            style={{ width: "100%", height: "100vh" }}
        />
    )
}

export default MapTest;