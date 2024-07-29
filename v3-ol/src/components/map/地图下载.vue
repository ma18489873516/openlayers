<script setup>
import { Map, View } from "ol";
import { defaults } from 'ol/interaction';
import { gaode_vector } from "./hooks/map/layer.js";
import { onMounted } from "vue";

// 下载pdf需要安装插件jsPDF：pnpm install jspdf --save
import { jsPDF } from "jspdf";

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

// 下载视图(image格式)
const viewImageDownload = (map) => {
    map.once('rendercomplete', function () {
        const mapCanvas = document.createElement('canvas');
        const size = map.getSize();
        mapCanvas.width = size[0];
        mapCanvas.height = size[1];
        const mapContext = mapCanvas.getContext('2d');
        Array.prototype.forEach.call(
            map.getViewport().querySelectorAll('.ol-layer canvas, canvas.ol-layer'),
            function (canvas) {
                if (canvas.width > 0) {
                    const opacity =
                        canvas.parentNode.style.opacity || canvas.style.opacity;
                    mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
                    let matrix;
                    const transform = canvas.style.transform;
                    if (transform) {
                        matrix = transform
                            .match(/^matrix\(([^\(]*)\)$/)[1]
                            .split(',')
                            .map(Number);
                    } else {
                        matrix = [
                            parseFloat(canvas.style.width) / canvas.width,
                            0,
                            0,
                            parseFloat(canvas.style.height) / canvas.height,
                            0,
                            0,
                        ];
                    }
                    CanvasRenderingContext2D.prototype.setTransform.apply(mapContext, matrix);
                    const backgroundColor = canvas.parentNode.style.backgroundColor;
                    if (backgroundColor) {
                        mapContext.fillStyle = backgroundColor;
                        mapContext.fillRect(0, 0, canvas.width, canvas.height);
                    }
                    mapContext.drawImage(canvas, 0, 0);
                }
            }
        );
        mapContext.globalAlpha = 1;
        mapContext.setTransform(1, 0, 0, 1, 0, 0);
        const link = document.getElementById('image-download');
        link.href = mapCanvas.toDataURL();
        link.click();
    });
    map.renderSync();
}

// 下载视图(pdf格式)
const viewPdfDownload = (map) => {
    map.once('rendercomplete', () => {
        const mapCanvas = document.createElement('canvas');
        const size = map.getSize();
        // 设定尺寸为A4(297*210),设定分辨率为150dpi
        const width = Math.round((297 * 150) / 25.4);
        const height = Math.round((210 * 150) / 25.4);
        mapCanvas.width = width;
        mapCanvas.height = height;
        const mapContext = mapCanvas.getContext('2d');
        Array.prototype.forEach.call(
            map.getViewport().querySelectorAll('.ol-layer canvas, canvas.ol-layer'),
            function (canvas) {
                if (canvas.width > 0) {
                    const opacity =
                        canvas.parentNode.style.opacity || canvas.style.opacity;
                    mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
                    const backgroundColor = canvas.parentNode.style.backgroundColor;
                    if (backgroundColor) {
                        mapContext.fillStyle = backgroundColor;
                        mapContext.fillRect(0, 0, canvas.width, canvas.height);
                    }
                    let matrix;
                    const transform = canvas.style.transform;
                    if (transform) {

                        matrix = transform
                            .match(/^matrix\(([^\(]*)\)$/)[1]
                            .split(',')
                            .map(Number);
                    } else {
                        matrix = [
                            parseFloat(canvas.style.width) / canvas.width,
                            0,
                            0,
                            parseFloat(canvas.style.height) / canvas.height,
                            0,
                            0,
                        ];
                    }
                    CanvasRenderingContext2D.prototype.setTransform.apply(
                        mapContext,
                        matrix
                    );
                    mapContext.drawImage(canvas, 0, 0);
                }
            }
        );
        mapContext.globalAlpha = 1;
        // 导出地图pdf		   
        const pdf = new jsPDF('landscape', undefined, [width, height]);
        pdf.addImage(
            mapCanvas.toDataURL('image/jpeg'),
            'JPEG',
            0,
            0,
            width,
            height
        );
        pdf.save('map.pdf');
    });
    map.renderSync();
}

onMounted(() => {
    initMap();
});
</script>

<template>
    <div class="card">
        <button @click="viewImageDownload(map)">下载视图(image格式)</button>
        <button @click="viewPdfDownload(map)">下载视图(pdf格式)</button>
    </div>
    <div id="map"></div>

    <!-- 下载：map.png为文件名称 -->
    <a id="image-download" download="map.png"></a>
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