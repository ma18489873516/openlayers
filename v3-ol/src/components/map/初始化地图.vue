<script setup>
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { defaults } from 'ol/interaction';

import { onMounted } from "vue";

const initMap = () => {
    const gaodeMap = new TileLayer({
        id: "gaodeMap",
        projection: 'EPSG:4326',
        source: new XYZ({
            title: "gaodeMap",
            url: "https://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}",
            wrapX: true, // 指定地图是否再水平方向上循环显示
            crossOrigin: "Anonymous", // 地图下载要考虑跨域问题
        }),
    });
    const view = new View({
        projection: "EPSG:4326", // 投影，默认是 EPSG:3857
        center: [108.945951, 34.465262], // 视图中心
        zoom: 8, // 缩放级别
    });
    const map = new Map({
        target: "map", // 指定地图容器
        layers: [gaodeMap], // 地图图层
        view: view, // 地图视图
        controls: [], // 地图控件       
        interactions: defaults({  // 屏蔽双击放大事件
            doubleClickZoom: false,
        })
    });
}

onMounted(() => {
    initMap();
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