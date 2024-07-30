<script setup>
import { Map, View } from "ol";
import { defaults } from 'ol/interaction';

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

// 鼠标左键单击
const leftSingleClick = () => {
    map.on('singleclick', (event) => {
        console.log('鼠标左键单击地图事件')
    })
}

// 鼠标左键点击
const leftClick = () => {
    map.on('click', (event) => {
        console.log('鼠标左键点击地图事件')
    })
}

// 鼠标左键双击
const leftDoubleClick = () => {
    map.on('dblclick', (event) => {
        console.log('鼠标左键双击地图事件')
    })
}

// 鼠标右键单击
const rightClick = () => {
    map.on('contextmenu', (event) => {
        // 屏蔽自带的右键事件
        event.preventDefault();

        console.log('鼠标右击地图事件')
    })
}

// 地图开始移动事件
const startRemove = () => {
    map.on('movestart', (event) => {
        console.log('地图开始移动事件')
    })
}


// 地图停止移动事件
const endRemove = () => {
    map.on('moveend', (event) => {
        console.log('地图停止移动事件')
    })
}
</script>

<template>
    <div class="card">
        <button @click="leftSingleClick">鼠标左键单击</button>
        <button @click="leftClick">鼠标左键点击</button>
        <button @click="leftDoubleClick">鼠标左键双击</button>
        <button @click="rightClick">鼠标右键单击</button>
        <button @click="startRemove">地图开始移动事件</button>
        <button @click="endRemove">地图停止移动事件</button>
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
    left: 25%;
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