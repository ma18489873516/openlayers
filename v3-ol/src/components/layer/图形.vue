<script setup>
import { Map, View } from "ol";
import { defaults } from 'ol/interaction';
import { gaode_vector } from "./hooks/map/layer.js";
import { onMounted } from "vue";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import { Point, LineString, Polygon, Circle } from "ol/geom";
import { commonStyle } from './utils/style/commonColor.js'

let map

const initMap = () => {
    const view = new View({
        projection: "EPSG:4326",
        center: [108.945951, 34.465262],
        zoom: 8,
    });
    map = new Map({
        target: "map",
        layers: [gaode_vector],
        view: view,
        controls: [],
        interactions: defaults({
            doubleClickZoom: false,
        })
    });
}

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
        style: commonStyle,
        zIndex: 2
    });
    map.addLayer(pointLayer);
    map.getView().animate({
        center: [108.94, 34.34],
        zoom: 8,
        duration: 1000
    })
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
        style: commonStyle,
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
    // 图层
    const polygonLayer = new VectorLayer({
        source: polygonSource,
        style: commonStyle,
        zIndex: 2
    });
    // 向地图上添加图层
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
        style: commonStyle,
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