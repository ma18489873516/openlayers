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

// 地图漫游
const mapRoaming = (map) => {
    /* 
            1. 开启地图漫游就添加地图事件
            2. 取消地图漫游就移除地图事件
        */
    map.on('click', (event) => {
        // 获取点击位置坐标
        const [lng, lat] = event.coordinate
        // 漫游至点击位置
        map.getView().animate({
            center: [lng, lat],  // 中心点
            zoom: 8,    // 缩放级别
            duration: 1000,  // 持续时间，单位为毫秒
        })
    })
}

onMounted(() => {
    initMap();
    mapRoaming(map)
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