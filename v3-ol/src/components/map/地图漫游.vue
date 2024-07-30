<script setup>
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { defaults } from 'ol/interaction';

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

// 地图漫游
const mapRoaming = () => {
    /* 
            1. 开启地图漫游就map.on添加地图事件
            2. 取消地图漫游就map.un移除地图事件
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
    mapRoaming()
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