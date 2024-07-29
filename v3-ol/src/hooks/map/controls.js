import 'ol/ol.css';
import { format } from 'ol/coordinate'; // 鼠标位置控件 坐标格式
import { Zoom, ZoomSlider, FullScreen, MousePosition, ScaleLine, OverviewMap, ZoomToExtent, Rotate } from 'ol/control';
import { gaode_image } from "./layer.js";

function useMapControlHook() {
    // 添加控件
    const addControls = (map) => {
        // 缩放控件：默认类名为         .ol-zoom-in 和 .ol-zoom-out 
        map.addControl(new Zoom())

        // 滑块控件：默认类名为         .ol-zoomslider
        map.addControl(new ZoomSlider())

        // 全屏控件：默认类名为         .ol-full-screen
        map.addControl(new FullScreen())

        // 鼠标位置控件：默认类名为     .ol-mouse-position
        map.addControl(new MousePosition({
            coordinateFormat: function (coordinate) {
                return format(coordinate, '精度：{x} 纬度：{y}', 2)
            },
            projection: 'EPSG:4326'
        }))

        // 比例尺控件：默认类名为       .ol-scale-line
        map.addControl(new ScaleLine({
            units: 'metric',    // 单位：metric米、degrees度、inch英尺、imperial英寸、海里nautical (mile)
        }))

        // 鹰眼控件：默认类名为         .ol-overviewmap
        map.addControl(new OverviewMap({
            collapsed: false,   // 启动时折叠
            collapsible: false, // 是否可折叠
            layers: [gaode_image], // 底图图层
            rotateWithView: false,   // 视图是否随主视图一同旋转  
        }))

        // 缩放到全局组件：默认类名为    .ol-zoom-extent
        map.addControl(new ZoomToExtent())

        // 旋转组件：按住   alt + shift键后拖动鼠标旋转
        map.addControl(new Rotate())
    }

    // 移除控件
    const removeControls = (map) => {
        map.getControls().getArray().slice(0).forEach(control => {
            if (control) {
                map.removeControl(control)
            }
        })
    }

    // 获取控件
    const getControls = (map) => {
        const allControls = map.getControls().getArray()
        console.log('allControls', allControls)
    }



    return {
        addControls,
        removeControls,
        getControls
    }
}

export default useMapControlHook