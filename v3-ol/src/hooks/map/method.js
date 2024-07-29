function useMapMethodHook() {
    // 获取单个图层
    const getSingleLayer = (map) => {
        map.getAllLayers().forEach(layer => {
            if (layer.get('id') === 'gaode_vector') {
                console.log('获取单个图层', layer.get('id'))
            }
        })
    }


    // 获取所有图层
    const getAllLayer = (map) => {
        let layers = map.getAllLayers()      // 方式一
        // let layers = map.getLayers().getArray()  // 方式二
        console.log('获取所有图层', layers)
    }


    // 添加单个图层
    const addSingleLayer = (map) => {
        // map.addLayer(gaode_image)
    }


    // 添加多个图层
    const addMutiLayer = (map) => {
        // let newLayer = [gaode_image]
        // for (let i in newLayer) {
        //     map.addLayer(newLayer[i])
        // }
    }


    // 删除单个图层---删除图层既可以使用removeLayer方法, 亦可通过设置opacity/zIndex/Visible等属性控制其显隐
    const removeSingleLayer = (map) => {
        let targetLayer = map.getAllLayers()[0];
        map.removeLayer(targetLayer);
    }


    // 删除多个图层---删除图层既可以使用removeLayer方法, 亦可通过设置opacity/zIndex/Visible等属性控制其显隐
    const removeMutiLayer = (map) => {
        let allLayer = map.getAllLayers()
        for (let i in allLayer) {
            if (allLayer[i].get('id') !== 'gaode_vector') {
                map.removeLayer(allLayer[i]);
            }
        }
        console.log('删除多个图层')
    }

    // 获取地图尺寸
    const getMapSize = (map) => {
        let mapSize = map.getSize();
        console.log('获取地图尺寸', mapSize)
    }


    // 设置地图尺寸
    const setMapSize = (map) => {
        map.setSize([800, 200])
        console.log('设置地图尺寸')
        // updateMapSize()
    }


    // 更新地图尺寸
    const updateMapSize = (map) => {
        map.updateSize();

        console.log('更新地图尺寸')
    }


    return {
        getSingleLayer,
        getAllLayer,
        addSingleLayer,
        addMutiLayer,
        removeSingleLayer,
        removeMutiLayer,
        getMapSize,
        setMapSize,
        updateMapSize,
    }
}

export default useMapMethodHook