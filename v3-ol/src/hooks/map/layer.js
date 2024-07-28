// 引入OpenLayers资源
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { OSM, TileImage, TileJSON, BingMaps } from 'ol/source'
import TileGrid from "ol/tilegrid/TileGrid";
import { Tile } from "ol/layer";

// 高德矢量图层
export const gaode_vector = new TileLayer({
    id: "gaode_vector",
    name: 'gaode_vector',
    projection: 'EPSG:4326',
    visible: true,
    opacity: 1,
    zIndex: 1,  // 若不设置，则获取时为undefined
    zoom: 4,
    source: new XYZ({
        title: "高德地图-矢量图层",
        url: "https://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}",
        wrapX: true, // 指定地图是否再水平方向上循环显示
        crossOrigin: "Anonymous", // 地图下载要考虑跨域问题
    }),
});

// 高德影像图层
export const gaode_image = new TileLayer({
    id: "gaode_image",
    name: 'gaode_image',
    projection: 'EPSG:4326',
    visible: true,
    opacity: 1,
    zIndex: 1,  // 若不设置，则获取时为undefined
    zoom: 4,
    minZoom: 0,
    maxZoom: 22,
    source: new XYZ({
        title: "高德地图-影像图层",
        url: "http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=6&x={x}&y={y}&z={z}",
        wrapX: true, // 指定地图是否再水平方向上循环显示
        crossOrigin: "Anonymous", // 地图下载要考虑跨域问题
    }),
});

// arcgis街道图
export const arcgis_street = new TileLayer({
    id: "arcgis_street",
    name: 'arcgis_street',
    projection: 'EPSG:4326',
    visible: true,
    opacity: 1,
    zIndex: 3,  // 若不设置，则获取时为undefined
    zoom: 4,
    source: new XYZ({
        title: "arcgis街道图",
        url: "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}",
        wrapX: true, // 指定地图是否再水平方向上循环显示
        crossOrigin: "Anonymous", // 地图下载要考虑跨域问题
    }),
});

// arcgis影像图层
export const arcgis_image = new TileLayer({
    id: "arcgis_image",
    name: 'arcgis_image',
    projection: 'EPSG:4326',
    visible: true,
    opacity: 1,
    zIndex: 0,  // 若不设置，则获取时为undefined
    zoom: 4,
    source: new XYZ({
        title: "arcgis影像图层",
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        wrapX: true, // 指定地图是否再水平方向上循环显示
        crossOrigin: "Anonymous", // 地图下载要考虑跨域问题
    }),
});

// arcgis灰色图
export const arcgis_grey = new TileLayer({
    id: "arcgis_grey",
    name: 'arcgis_grey',
    projection: 'EPSG:4326',
    visible: true,
    opacity: 1,
    zIndex: 2,  // 若不设置，则获取时为undefined
    zoom: 4,
    minZoom: 0,
    maxZoom: 22,
    source: new XYZ({
        title: "arcgis灰色图",
        url: "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}",
        wrapX: true, // 指定地图是否再水平方向上循环显示
        crossOrigin: "Anonymous", // 地图下载要考虑跨域问题
    }),
});

// arcgis深蓝图
export const arcgis_deepBlue = new TileLayer({
    id: "arcgis_deepBlue",
    name: 'arcgis_deepBlue',
    projection: 'EPSG:4326',
    visible: true,
    opacity: 1,
    zIndex: 0,  // 若不设置，则获取时为undefined
    zoom: 4,
    minZoom: 0,
    maxZoom: 22,
    source: new XYZ({
        title: "arcgis深蓝图",
        url: "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
        wrapX: true, // 指定地图是否再水平方向上循环显示
        crossOrigin: "Anonymous", // 地图下载要考虑跨域问题
    }),
});

// mapbox黑色底图
export const mapbox_black = new TileLayer({
    id: "mapbox_black",
    name: 'mapbox_black',
    projection: 'EPSG:4326',
    visible: true,
    opacity: 1,
    zIndex: 2,  // 若不设置，则获取时为undefined
    zoom: 4,
    minZoom: 0,
    maxZoom: 22,
    source: new XYZ({
        title: "mapbox黑色底图",
        url: "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
        wrapX: true, // 指定地图是否再水平方向上循环显示
        crossOrigin: "Anonymous", // 地图下载要考虑跨域问题
    }),
});

// mapbox 影像地图
const token = "pk.eyJ1IjoiY2hlbmdjaGFvODg2NiIsImEiOiJjbGhzcWowMHUwYTNyM2VwNXZhaXhjd3Q4In0.FEh2q7sEW88Z1B5GcK_TDg";
export const mabox_natural = new TileLayer({
    id: "mabox_natural",
    name: 'mabox_natural',
    projection: 'EPSG:4326',
    visible: true,
    opacity: 1,
    zIndex: 0,  // 若不设置，则获取时为undefined
    zoom: 4,
    minZoom: 0,
    maxZoom: 22,
    source: new TileJSON({
        title: 'mabox_natural',
        url: 'https://api.tiles.mapbox.com/v4/mapbox.natural-earth-hypso-bathy.json?secure&access_token=' + token,
        crossOrigin: "Anonymous", // 地图下载要考虑跨域问题
        wrapX: true, // 指定地图是否再水平方向上循环显示
    })
})

// 天地图
const tianDiToken = ''
const tiandi_vector_mapUrl = 'http://t{1-7}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' // 矢量底图
const tiandi_vector_ChineseMark_mapUrl = 'http://t{1-7}.tianditu.gov.cn/eva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=eva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' // 矢量中文标记
const tiandi_vector_EnglishMark_mapUrl = 'http://t{1-7}.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' // 矢量地图矢量英文标记
const tiandi_image_mapUrl = 'http://t{1-7}.tianditu.gov.cn/eia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=eia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' // 卫星底图
const tiandi_image_ChineseMark_mapUrl = 'http://t{1-7}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' // 卫星中文标记
const tiandi_image_EnglishMark_mapUrl = 'http://t{1-7}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' // 卫星英文标记
export const tianDi = new TileLayer({
    id: "天地图",
    name: '天地图',
    projection: 'EPSG:4326',
    visible: true,
    opacity: 1,
    zIndex: 0,  // 若不设置，则获取时为undefined
    zoom: 4,
    minZoom: 0,
    maxZoom: 22,
    source: new XYZ({
        title: "天地图",
        url: tiandi_vector_mapUrl + tianDiToken,
        wrapX: true, // 指定地图是否再水平方向上循环显示
        crossOrigin: "Anonymous", // 地图下载要考虑跨域问题
    }),
});

// OpenStreetMap地图
export const openstreetMap = new TileLayer({
    id: "openstreetMap",
    name: 'openstreetMap',
    projection: 'EPSG:4326',
    visible: true,
    opacity: 1,
    zIndex: 0,  // 若不设置，则获取时为undefined
    zoom: 4,
    minZoom: 0,
    maxZoom: 22,
    title: 'openstreetMap',
    source: new OSM(),
    wrapX: true, // 指定地图是否再水平方向上循环显示
    crossOrigin: "Anonymous", // 地图下载要考虑跨域问题
})

// 百度地图
let resolutions = [];
let baiduX, baiduY;
for (let i = 0; i < 19; i++) {
    resolutions[i] = Math.pow(2, 18 - i);
}
export const baiDuMap = new Tile({
    source: new TileImage({
        projection: "EPSG:3857",
        tileGrid: new TileGrid({
            origin: [0, 0],
            resolutions: resolutions
        }),
        tileUrlFunction: function (tileCoord) {
            if (!tileCoord) return "";
            let z = tileCoord[0];
            let x = tileCoord[1];
            let y = tileCoord[2];
            // 对编号xy处理
            baiduX = (x < 0) ? x : 'M' + (-x);
            baiduY = -y;
            return "http://online3.map.bdimg.com/onlinelabel/?qt=tile&x=" + baiduX + "&y=" + baiduY + "&z=" + z + "&styles=pl&udt=20151021&scaler=1&p=1";
        }
    })
});

// 谷歌地图
let ChineseMarkMapUrl = 'https://www.google.com/maps/vt?lyrs=y&gl=cn&x={x}&y={y}&z={z}' // 中文标记影像
let noneMarkMapUrl = 'https://mt3.google.com/maps/vt?lyrs=s&gl=en&x={x}&y={y}&z={z}'  // 英文无标记影像
let topographyMapUrl = 'https://www.google.com/maps/vt?lyrs=t&gl=en&x={x}&y={y}&z={z}'  // 地形图
let unObviousRouteMapUrl = 'https://www.google.com/maps/vt?lyrs=r&gl=en&x={x}&y={y}&z={z}'  // 路线图（不明显）
let standardRouteMapUrl = 'https://www.google.com/maps/vt?lyrs=m&gl=en&x={x}&y={y}&z={z}' // 标准路线图
let markMapUrl = 'https://www.google.com/maps/vt?lyrs=p&gl=en&x={x}&y={y}&z={z}' // 带标签的地图
export const gooleMap = new TileLayer({
    id: "gooleMap",
    name: 'gooleMap',
    projection: 'EPSG:4326',
    visible: true,
    opacity: 1,
    zIndex: 0,  // 若不设置，则获取时为undefined
    zoom: 4,
    minZoom: 0,
    maxZoom: 22,
    source: new XYZ({
        title: "谷歌地图",
        url: noneMarkMapUrl,
        wrapX: true, // 指定地图是否再水平方向上循环显示
        crossOrigin: "Anonymous", // 地图下载要考虑跨域问题
    }),
})

// 必应地图
const biYing_RoadOnDemand_MapUrl = 'RoadOnDemand'
const biYing_Aerial_MapUrl = 'Aerial'
const biYing_AerialWithLabelsOnDemand_MapUrl = 'AerialWithLabelsOnDemand'
const biYing_CanvasDark_MapUrl = 'CanvasDark'
export const bingMapLayer = new Tile({
    source: new BingMaps({
        key: 'AqQf9nX6PZKkFZOkdOqBOh3vg8xwGV1AYWGqC6EsOoJ0OHSUwm8CN8AhaFpT7mfR',
        imagerySet: biYing_RoadOnDemand_MapUrl,
    })
});

// maptiler地图
const maptiler_streets_MapUrl = 'streets'
const maptiler_toner_MapUrl = 'toner'
const maptiler_winter_MapUrl = 'winter'
const maptiler_topographique_MapUrl = 'topographique'
export const maptilerMap = new Tile({
    source: new TileJSON({
        url: 'https://api.maptiler.com/maps/' + maptiler_streets_MapUrl + '/tiles.json?key=RbTrJIUQMw0c6xtn6kZr',
        tileSize: 512,
        crossOrigin: 'anonymous'
    })
})