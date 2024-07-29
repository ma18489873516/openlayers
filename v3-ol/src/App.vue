<script setup>
import { Map, View } from "ol";
import { defaults } from 'ol/interaction';
import { gaode_vector } from "./hooks/map/layer.js";
import { onMounted } from "vue";

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

onMounted(() => {
    initMap();
});
</script>

<template>
    <div class="card">
        <button @click="getControls(map)">添加画笔</button>
        <button @click="addControls(map)">移除画笔</button>
        <button @click="removeControls(map)">开始编辑</button>
        <button @click="removeControls(map)">结束编辑</button>
    </div>
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

.card {
    position: absolute;
    left: 40%;
    bottom: 5%;
    z-index: 2;
}

.card button {
    margin-left: 1vw;
    cursor: pointer;
    padding: 1vh 1vw;
    border-radius: 1vw;
}
</style>