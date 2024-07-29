<script setup>
// 2. 引入OpenLayers资源
import { Map, View } from "ol";
import { defaults } from 'ol/interaction';
// 3.引入图层
import { gaode_vector } from "./hooks/map/layer.js";
// 4. 引入vue资源
import { onMounted } from "vue";

// 5. 构建方法
function initMap() {
    // 创建地图视图
    const view = new View({
        projection: "EPSG:4326", // 投影，默认是 EPSG:3857
        center: [108.945951, 34.465262], // 视图中心
        zoom: 8, // 缩放级别
    });
    // 创建地图
    const map = new Map({
        target: "map", // 指定地图容器
        layers: [gaode_vector], // 地图图层
        view: view, // 地图视图
        controls: [], // 地图控件       
        interactions: defaults({  // 屏蔽双击放大事件
            doubleClickZoom: false,
        })
    });
}

onMounted(() => {
    // 加载地图
    initMap();
});
</script>

<template>
    <!-- 1. 指定地图容器 -->
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