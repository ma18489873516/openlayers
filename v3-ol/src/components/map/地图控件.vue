<script setup>
import { Map, View } from "ol";
import { defaults } from 'ol/interaction';
import { gaode_vector } from "./hooks/map/layer.js";
import { onMounted } from "vue";

import useMapControlHook from './hooks/map/controls.js'
const { addControls, removeControls, getControls } = useMapControlHook()

let view, map

const initMap = () => {
    view = new View({
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

// 给地图注册事件
const registerClickEvent = (map) => {

}

onMounted(() => {
    initMap();
    registerClickEvent()
});
</script>

<template>
    <div class="card">
        <button @click="getControls(map)">获取控件</button>
        <button @click="addControls(map)">添加控件</button>
        <button @click="removeControls(map)">移除控件</button>
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

/* 全屏控件 */
.ol-full-screen {
    position: absolute;
    right: 20px;
}

/* 鼠标位置控件 */
.ol-mouse-position {
    width: 100%;
    padding: 10px 20px;
    top: unset !important;
    bottom: 10px !important;
    text-align: center;
}

/* 鹰眼控件 */
.ol-overviewmap-map {
    border: none !important;
}

.ol-overviewmap {
    left: unset !important;
    right: 0px;
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