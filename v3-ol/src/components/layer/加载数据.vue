<script setup>
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { defaults } from 'ol/interaction';
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from 'ol/Feature'
import { Point } from "ol/geom"
import { Style, Fill, Stroke, Icon } from 'ol/style'
import GeoJSON from 'ol/format/GeoJSON'
import GPX from 'ol/format/GPX';
import KML from 'ol/format/KML';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTile from 'ol/source/VectorTile';
import MVT from 'ol/format/MVT';
import WebGLTileLayer from 'ol/layer/WebGLTile.js';
import TileGrid from 'ol/tilegrid/TileGrid.js';
import { sourcesFromTileGrid } from 'ol/source.js';
import GeoTIFF from 'ol/source/GeoTIFF';
import WKB from 'ol/format/WKB';
import WKT from 'ol/format/WKT'
import { TileWMS } from 'ol/source';
import WMTS from 'ol/source/WMTS'
// 需要安装插件d3-fetch：pnpm i d3-fetch --save
import { csv } from "d3-fetch";
// 需要安装shapefile插件: pnpm i shapefile
import * as shapefile from "shapefile"

import { onMounted } from "vue";

import Location from './assets/icon/location.jpg'

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

onMounted(() => {
    initMap();
});


let source, layer
const roamTargetPosition = (lon, lat) => {
    map.getView().animate({
        center: [lon, lat],
        zoom: 8,
        duration: 500
    })
}
const style = new Style({
    stroke: new Stroke({
        color: 'yellow',
        width: 10,
    }),
    fill: new Fill({
        color: 'blue'
    }),
    image: new Icon({
        anchor: [0.5, 60],
        anchorOrigin: "top-right",
        anchorXUnits: "fraction",
        anchorYUnits: "pixels",
        offsetOrigin: "top-right",
        scale: 0.2,
        opacity: 0.75,
        src: Location,
    })
})
const removeLayer = () => {
    map.on('contextmenu', (event) => {
        event.preventDefault();
        if (layer) {
            map.removeLayer(layer)
        }
    })
}

// csv
const loadCsv = () => {
    source = new VectorSource({ wrapX: false })
    layer = new VectorLayer({ source, style, zIndex: 2 })
    map.addLayer(layer)

    csv("/public/csv-data.csv").then((data) => {
        let pointFeatures = [];
        for (let i = 0; i < data.length; i++) {
            let lat = data[i].latitude;
            let lon = data[i].longitude;
            let pointFeature = new Feature({
                geometry: new Point([lon, lat]),
            })
            pointFeatures.push(pointFeature)
        }
        source.addFeatures(pointFeatures)
    });

    removeLayer()
    roamTargetPosition(-97.94, 29.88)
}

// shp
const loadShp = () => {
    let shpSource = new VectorSource({ wrapX: false })
    let layer = new VectorLayer({ source: shpSource, style, zIndex: 2 })
    map.addLayer(layer)

    let shp = "/shp/POLYGON.shp";
    let dbf = "/shp/POLYGON.dbf";
    shapefile.open(shp, dbf, { encoding: 'utf-8' }).then(source => source.read()
        .then(function log(result) {
            if (result.done) return;
            let feature = new GeoJSON().readFeature(result.value);
            shpSource.addFeature(feature);
            return source.read().then(log);
        }))
        .catch(error => console.error(error));


    // 此处直接调用方法删不掉, 必须重新写一遍方法
    map.on('contextmenu', (event) => {
        event.preventDefault();
        if (layer) {
            map.removeLayer(layer)
        }
    })
    roamTargetPosition(113.77533758982344, 35.41530331049161)
}

// tif
const loadTif = () => {
    // let tifSource = new GeoTIFF({
    //     normalize: false,
    //     sources: [{ url: '/example.tif' }]     // 必须是数组
    // })
    // let layer = new WebGLTileLayer({ source: tifSource, zIndex: 2 })
    // map.addLayer(layer)

    let tileGrid = new TileGrid({
        extent: [-180, -90, 180, 90],
        resolutions: [0.703125, 0.3515625, 0.17578125, 8.7890625e-2, 4.39453125e-2],
        tileSizes: [[512, 256], [1024, 512], [2048, 1024], [4096, 2048], [4096, 4096],],
    });
    const layer = new WebGLTileLayer({
        sources: sourcesFromTileGrid(tileGrid, ([z, x, y]) => new GeoTIFF({
            sources: [{ url: `https://s2downloads.eox.at/demo/EOxCloudless/2019/rgb/${z}/${y}/${x}.tif`, },],
        })),
        zIndex: 2
    });
    map.addLayer(layer)

    // 此处直接调用方法删不掉, 必须重新写一遍方法
    map.on('contextmenu', (event) => {
        event.preventDefault();
        if (layer) {
            map.removeLayer(layer)
        }
    })
}

// gpx
const loadGpx = () => {
    source = new VectorSource({
        url: '/fells_loop.gpx',
        format: new GPX(),
        wrapX: false
    })
    layer = new VectorLayer({ source, style, zIndex: 2 })
    map.addLayer(layer)

    removeLayer()
    roamTargetPosition(-71.119277, 42.438878)
}

// wkb
const loadWkb = () => {
    let wkbData = '0103000000010000000500000054E3A59BC4602540643BDF4F8D1739C05C8FC2F5284C4140EC51B81E852B34C0D578E926316843406F1283C0CAD141C01B2FDD2406012B40A4703D0AD79343C054E3A59BC4602540643BDF4F8D1739C0'
    let wkbFeature = new WKB().readFeature(wkbData, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:4326'
    })
    source = new VectorSource({
        wrapx: false,
        features: [wkbFeature]
    })
    layer = new VectorLayer({ source, style, zIndex: 2 })
    map.addLayer(layer)

    removeLayer()
    roamTargetPosition(25, -35)
}

// wkt
const loadWkt = () => {
    let wktData = "POLYGON((6.027164 49.524078,6.088064 49.680508,5.948726 49.772232,5.941587 49.91943,6.03742 50.064381,6.147439 50.130783,6.211109 50.166946,6.312177 50.134426,6.340263 49.998951,6.525142 49.858585,6.734586 49.815399,6.715019 49.685902,6.603117 49.621159,6.636707 49.462303,6.57162 49.490456,6.315996 49.495625,6.02716449.524078))"
    let wktFeature = new Feature({
        geometry: new WKT().readGeometry(wktData, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:4326'
        })
    })
    let source = new VectorSource({
        features: [wktFeature],
    })
    layer = new VectorLayer({ source, style, zIndex: 2 })
    map.addLayer(layer)

    removeLayer()
    roamTargetPosition(5, 20)
}

// wms
const loadWms = () => {
    source = new TileWMS({
        url: 'http://192.168.1.16:8080/geoserver/rs_data/wms',  // url是geoserver发布的
        params: {
            'FORMAT': 'image/png',
            'VERSION': '1.1.0',
            'LAYERS': 'rs_data:GF1B_PMS_E116.2_N40.8_20220221_L1A1228103768',
            'transparent': 'true',
            'STYLES': '',
            'angle': 0
        },
    })
    layer = new TileLayer({
        zIndex: 2,
        source,
        style
    });
    map.addLayer(layer)

    console.log('layer', source)
    removeLayer()
    roamTargetPosition(130.78125, 14.0625)
}

// mvt
const loadMvt = () => {
    source = new VectorTile({
        url: 'https://gibs-{a-c}.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?TIME=2020-03-18T00:00:00Z&layer=GRanD_Dams&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&FORMAT=application%2Fvnd.mapbox-vector-tile&TileMatrix={z}&TileCol={x}&TileRow={y}',
        format: new MVT(),
        projection: 'EPSG:4326',
        tileGrid: new WMTSTileGrid({
            extent: [-180, -90, 180, 90],
            resolutions: [0.5625, 0.28125, 0.140625, 0.0703125, 0.03515625, 0.017578125],
            tileSize: [512, 512]
        })
    })
    layer = new VectorTileLayer({ source, style })
    map.addLayer(layer)

    removeLayer()
}

// wmts
const loadWmts = () => {
    let source = new WMTS({
        url: 'https://gibs-{a-c}.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?TIME=2013-06-16',
        layer: 'MODIS_Terra_CorrectedReflectance_TrueColor',    // 网络图层名称
        format: 'image/jpeg',   // 图像格式
        matrixSet: '250m',  // 矩阵集
        tileGrid: new WMTSTileGrid({    // 平铺网格
            origin: [-180, 90], // 瓦片网格原点
            // Resolutions. The array index of each resolution needs to match the zoom level. This means that even if a is configured, the resolutions array will have a length of minZoommaxZoom + 1
            resolutions: [0.5625, 0.28125, 0.140625, 0.0703125, 0.03515625, 0.017578125, 0.0087890625, 0.00439453125, 0.002197265625],
            matrixIds: [0, 1, 2, 3, 4, 5, 6, 7, 8], // 矩阵 ID。此数组的长度需要 以匹配数组的长度
            tileSize: 512,  // 磁贴大小。长度 此数组需要与数组的长度匹配
        })
    });
    let layer = new TileLayer({
        style,
        source,
        zIndex: 2
    });
    map.addLayer(layer)

    // 此处直接调用方法删不掉, 必须重新写一遍方法
    map.on('contextmenu', (event) => {
        event.preventDefault();
        if (layer) {
            map.removeLayer(layer)
        }
    })
}

// kml
const loadKml = () => {
    source = new VectorSource({
        url: '/xinXiang.kml',
        format: new KML({
            extractStyles: false,    // 从kml中提取样式
        }),
        wrapX: false
    })
    layer = new VectorLayer({ source, style, zIndex: 2 })
    map.addLayer(layer)

    removeLayer()
    roamTargetPosition(113.77533758982344, 35.41530331049161)
}

// geojson
const loadGeojson = () => {
    source = new VectorSource({ wrapX: false })
    layer = new VectorLayer({ source, style, zIndex: 2 })
    map.addLayer(layer)

    // 自定义geojson : source = new VectorSource({ features: new GeoJSON().readFeatures(geodata) })
    source = new VectorSource({
        url: '/xinXiang.geojson',
        format: new GeoJSON(),
        wrapX: false
    })
    layer.setSource(source)

    removeLayer()
    roamTargetPosition(113.77533758982344, 35.41530331049161)
}
</script>

<template>
    <div class="card">
        <button @click="loadCsv">csv</button>
        <button @click="loadShp">shp</button>
        <button @click="loadTif">tif</button>
        <button @click="loadGpx">gpx</button>
        <button @click="loadWkb">wkb</button>
        <button @click="loadWkt">wkt</button>
        <button @click="loadWms">wms</button>
        <button @click="loadMvt">mvt</button>
        <button @click="loadWmts">wmts</button>
        <button @click="loadKml">kml</button>
        <button @click="loadGeojson">geojson</button>
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
    left: 20%;
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