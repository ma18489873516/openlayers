<script setup>
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { defaults } from 'ol/interaction';
import { format } from 'ol/coordinate'; // 鼠标位置控件 坐标格式
import { Zoom, ZoomSlider, FullScreen, MousePosition, ScaleLine, OverviewMap, ZoomToExtent, Rotate } from 'ol/control';
import 'ol/ol.css';

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

// 添加控件
const addControls = () => {
    // 缩放控件：默认类名为   .ol-zoom-in 和 .ol-zoom-out 
    map.addControl(new Zoom())

    // 滑块控件：默认类名为  .ol-zoomslider
    map.addControl(new ZoomSlider())

    // 全屏控件：默认类名为  .ol-full-screen
    map.addControl(new FullScreen())

    // 鼠标位置控件：默认类名为   .ol-mouse-position
    map.addControl(new MousePosition({
        coordinateFormat: function (coordinate) {
            return format(coordinate, '精度：{x} 纬度：{y}', 2)
        },
        projection: 'EPSG:4326'
    }))

    // 比例尺控件：默认类名为  .ol-scale-line
    map.addControl(new ScaleLine({
        units: 'metric',    // 单位：metric米、degrees度、inch英尺、imperial英寸、海里nautical (mile)
    }))

    // 鹰眼控件：默认类名为   .ol-overviewmap
    map.addControl(new OverviewMap({
        collapsed: false,   // 启动时折叠
        collapsible: false, // 是否可折叠
        // layers: [gaodeMap], // 底图图层
        rotateWithView: false,   // 视图是否随主视图一同旋转  
    }))

    // 缩放到全局组件：默认类名为    .ol-zoom-extent
    map.addControl(new ZoomToExtent())

    // 旋转组件：按住   alt + shift键后拖动鼠标旋转
    map.addControl(new Rotate())
}

// 移除控件
const removeControls = () => {
    map.getControls().getArray().slice(0).forEach(control => {
        if (control) {
            map.removeControl(control)
        }
    })
}

// 获取控件
const getControls = () => {
    const allControls = map.getControls().getArray()
    console.log('allControls', allControls)
}

onMounted(() => {
    initMap();
});
</script>

<template>
    <div class="card">
        <button @click="getControls">获取控件</button>
        <button @click="addControls">添加控件</button>
        <button @click="removeControls">移除控件</button>
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