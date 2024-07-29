function useLayerMethodHook() {
    // 更新图层数据源
    const updateLayerSource = (layer) => {
        layer.getSource().changed()
    }

    // get: 获取图层属性
    const getLayerAttribute = (layer) => {
        let layerId = layer.get('id')
        let layerZIndex = layer.get('zIndex')
        let layerOpacity = layer.get('opacity')
        let layerVisible = layer.get('visible')

        console.log('get：获取图层属性', layerId, layerZIndex, layerOpacity, layerVisible)
    }

    // set：设置图层属性
    const setLayerAttribute = (layer) => {
        layer.set('name', 'gaode_vector')
        layer.set('zIndex', 10)
        layer.set('opacity', 0.5)
        layer.set('visible', true)

        console.log('set：设置图层属性')
    }

    // 获取图层透明度
    const getLayerOpacity = (layer) => {
        let layerOpacity = layer.getOpacity()

        console.log('获取图层透明度', layerOpacity)
    }

    // 设置图层透明度
    const setLayerOpacity = (layer) => {
        layer.setOpacity(0.6)

        console.log('设置图层透明度')
    }

    // 获取图层可见性
    const getLayerVisible = (layer) => {
        let layerVisible = layer.getVisible()

        console.log('获取图层可见性', layerVisible)
    }

    // 设置图层可见性
    const setLayerVisible = (layer) => {
        layer.setVisible(false)

        console.log('设置图层可见性')
    }

    // 获取图层层级
    const getLayerZIndex = (layer) => {
        let layerZIndex = layer.getZIndex()

        console.log('获取图层层级', layerZIndex)
    }

    // 设置图层层级
    const setLayerZIndex = (layer) => {
        layer.setZIndex(10)

        console.log('设置图层层级')
    }

    return {
        updateLayerSource,
        getLayerAttribute,
        setLayerAttribute,
        getLayerOpacity,
        setLayerOpacity,
        getLayerVisible,
        setLayerVisible,
        getLayerZIndex,
        setLayerZIndex,
    }
}

export default useLayerMethodHook