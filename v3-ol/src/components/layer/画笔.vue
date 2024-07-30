<script setup>
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { defaults } from 'ol/interaction';
import Draw, { createBox, createRegularPolygon } from 'ol/interaction/Draw'
import Modify from 'ol/interaction/Modify.js';
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
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
            wrapX: true, // 指定地图是否再水平方向上循环显示
            crossOrigin: "Anonymous", // 地图下载要考虑跨域问题
        }),
    });
    const view = new View({
        projection: "EPSG:4326", // 投影，默认是 EPSG:3857
        center: [108.945951, 34.465262], // 视图中心
        zoom: 8, // 缩放级别
    });
    map = new Map({
        target: "map", // 指定地图容器
        layers: [gaodeMap], // 地图图层
        view: view, // 地图视图
        controls: [], // 地图控件       
        interactions: defaults({  // 屏蔽双击放大事件
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

// 画笔绘制(封装: 点、线、面、圆、矩形、方形)
let drawSource, drawLayer, draw
const commenceDraw = (drawType) => {
    // 添加画笔
    drawSource = new VectorSource({ wrapx: false })
    drawLayer = new VectorLayer({ source: drawSource, style: customStyle, zIndex: 2 })
    map.addLayer(drawLayer)

    // 判断画笔类型
    let brushType, funType
    if (drawType === 'Point') {
        brushType = 'Point'
        funType = undefined
    } else if (drawType === 'LineString') {
        brushType = 'LineString'
        funType = undefined
    } else if (drawType === 'Polygon') {
        brushType = 'Polygon'
        funType = undefined
    } else if (drawType === 'Circle') {
        brushType = 'Circle'
        funType = undefined
    } else if (drawType === 'rectangle') {
        brushType = 'Circle'
        funType = createBox()
    } else if (drawType === 'square') {
        brushType = 'Circle'
        funType = createRegularPolygon(6)
    } else {
        alert('暂无该画笔类型, 等候添加······')
        retrun
    }
    draw = new Draw({
        source: drawSource,
        type: brushType,
        geometryFunction: funType
    })
    map.addInteraction(draw)
}

// 编辑
let modify
const commenceModify = () => {
    modify = new Modify({ source: drawSource })
    map.addInteraction(modify)
}

// 获取坐标
const getCoordinate = (featureValue, featureType) => {
    if (featureType === 'Circle') {
        let center = featureValue.getGeometry().getCenter()
        let radius = featureValue.getGeometry().getRadius()
        console.log(`圆的圆心为${center}，半径为：${radius}`)
    } else {
        let coordinate = featureValue.getGeometry().getCoordinates()
        console.log(`坐标为：${coordinate}`)
    }
}

// 结束所有(绘制、编辑)
const concludeAll = () => {
    // 移除画笔、清空画布、移除画布
    if (draw) {
        map.removeInteraction(draw)
        // drawSource.clear()
        // map.removeLayer(drawLayer)
    }
    // 移除编辑
    if (modify) {
        map.removeInteraction(modify)
    }
}

onMounted(() => {
    initMap();
});
</script>

<template>
    <div class="card">
        <button @click="commenceDraw('Polygon')">开始绘制</button>
        <button @click="commenceModify">开始编辑</button>
        <button @click="concludeAll">结束所有</button>
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