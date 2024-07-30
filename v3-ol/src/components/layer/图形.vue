<script setup>
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { defaults } from 'ol/interaction';
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import { Point, LineString, Polygon, Circle } from "ol/geom";
import { Style, Fill, Circle as CircleStyle, Stroke } from 'ol/style'

import { onMounted } from "vue";

let map
const initMap = () => {
    const gaodeMap = new TileLayer({
        id: "gaodeMap",
        projection: 'EPSG:4326',
        source: new XYZ({
            title: "gaodeMap",
            url: "https://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}",
            wrapX: true,
            crossOrigin: "Anonymous",
        }),
    });
    const view = new View({
        projection: "EPSG:4326",
        center: [108.945951, 34.465262],
        zoom: 8,
    });
    map = new Map({
        target: "map",
        layers: [gaodeMap],
        view: view,
        controls: [],
        interactions: defaults({
            doubleClickZoom: false,
        })
    });
}

// 设置样式
const customStyle = new Style({
    stroke: new Stroke({
        color: 'yellow',
        width: 10,
    }),
    fill: new Fill({
        color: 'blue'
    }),
    image: new CircleStyle({
        radius: 20,
        fill: new Fill({ color: 'red' }),
        stroke: new Stroke({ color: 'green', width: 2 })
    }),
})

// 点图层
const addPointLayer = (map) => {
    const pointFeature = new Feature({
        geometry: new Point([108.94, 34.34]),
        name: "Point",
    });
    const pointSource = new VectorSource({
        features: [pointFeature],
    });
    const pointLayer = new VectorLayer({
        source: pointSource,
        style: customStyle,
        zIndex: 2
    });
    map.addLayer(pointLayer);
}

// 线图层
const addPolylineLayer = (map) => {
    const lineFeature = new Feature({
        geometry: new LineString([
            [109, 32],
            [110, 35],
        ]),
        name: "Line",
    });
    const lineSource = new VectorSource({
        features: [lineFeature],
    });
    const lineLayer = new VectorLayer({
        source: lineSource,
        style: customStyle,
        zIndex: 2
    });
    map.addLayer(lineLayer);
}

// 面图层
const addPolygonLayer = (map) => {
    const polygonFeature = new Feature({
        geometry: new Polygon([
            [
                [108, 34.5],
                [107, 34.5],
                [107, 34],
                [108, 34],
            ],
        ]),
        name: "Polygon",
    });
    const polygonSource = new VectorSource({
        features: [polygonFeature],
    });
    const polygonLayer = new VectorLayer({
        source: polygonSource,
        style: customStyle,
        zIndex: 2
    });
    map.addLayer(polygonLayer);
}

// 圆
const addCircleLayer = (map) => {
    let circleFeature = new Feature({
        name: 'circle',
        geometry: new Circle([106, 34], 0.5)
    })
    const circleSource = new VectorSource({
        features: [circleFeature],
    });
    const circleLayer = new VectorLayer({
        source: circleSource,
        style: customStyle,
        zIndex: 2
    });
    map.addLayer(circleLayer);
}



onMounted(() => {
    initMap();

    addPointLayer(map)
    addPolylineLayer(map)
    addPolygonLayer(map)
    addCircleLayer(map)
});
</script>

<template>

    <div id="map"></div>
</template>

<style>
* {
    padding: 0;
    margin: 0;
}

#map {
    width: 100vw;
    height: 100vh;
}
</style>