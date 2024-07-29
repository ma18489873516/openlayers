/* 
    1. Circle点
    2. Stroke线
    3. Fill面
    4. Text文字
    5. 图标Icon：使用时需要注意路径问题
        (1). 方式一：路径使用绝对路径；
        (2). 方式二：使用相对路径，但要先使用import引入，再给url赋值
        (3). 方式三：使用require，因为openlayers中要求icon为base64格式
*/
import { Style, Fill, Circle, Stroke, Text, Icon } from 'ol/style'
import Location from '../../assets/icon/location.jpg'

import { randomColor } from './randomColor.js'


// 普通样式(变量式)
export const commonStyle = new Style({
    stroke: new Stroke({
        color: randomColor(),
        width: 10,
    }),
    fill: new Fill({
        color: randomColor()
    }),
    image: new Circle({ //点样式
        radius: 20,
        fill: new Fill({ color: randomColor() }),
        stroke: new Stroke({ color: randomColor(), width: 2 })
    }),
})


// 普通色(函数式)
export function styleFunc(feature = undefined) {
    let number, name
    if (feature) {
        number = feature.get('features').length.toString()
        name = feature.get('name') || feature.get('id')
    }
    let mystyle = new Style({
        fill: new Fill({
            color: randomColor()
        }),
        stroke: new Stroke({
            width: 10,
            color: randomColor(),
        }),
        image: new Circle({ //点样式
            radius: 10,
            fill: new Fill({ color: randomColor() }),
            stroke: new Stroke({ color: randomColor(), width: 2 }),
            text: new Text({
                font: '12px sans-serif', // 设置字体
                maxAngle: 30,
                textAlign: 'right',
                offsetx: 0, // 设置文字偏移量
                offsetY: 0,
                text: feature ? (number ? number : name ? name : '') : ' ',// 文字描述
                fill: new Fill({ color: randomColor() }),
                stroke: new Stroke({ color: randomColor(), width: 2 })
            })
        }),
        text: new Text({
            font: '12px sans-serif', // 设置字体
            maxAngle: 30,
            textAlign: 'right',
            offsetX: 2, // 设置文字偏移量
            offsetY: 2,
            text: feature ? (number ? number : name ? name : '') : ' ', // 文字描述
            fill: new Fill({ color: randomColor() }),
            stroke: new Stroke({ color: randomColor(), width: 2 })
        }),
        // image: new Icon({
        //     anchor: [0.5, 60],
        //     anchorOrigin: "top-right",
        //     anchorXUnits: "fraction",
        //     anchorYUnits: "pixels",
        //     offsetOrigin: "top-right",
        //     // offset:[0,10],
        //     //图标缩放比例
        //     scale: 0.2,
        //     //透明度
        //     opacity: 0.75,
        //     //图标的url
        //     src: Location,
        // })
    });
    return mystyle;
}