function useMapEventHook() {
    // 鼠标左键单击
    const leftSingleClick = (map) => {
        map.on('singleclick', (event) => {
            console.log('鼠标左键单击地图事件')
        })
    }

    // 鼠标左键点击
    const leftClick = (map) => {
        map.on('click', (event) => {
            console.log('鼠标左键点击地图事件')
        })
    }

    // 鼠标左键双击
    const leftDoubleClick = (map) => {
        map.on('dblclick', (event) => {
            console.log('鼠标左键双击地图事件')
        })
    }

    // 鼠标右键单击
    const rightClick = (map) => {
        map.on('contextmenu', (event) => {
            // 屏蔽自带的右键事件
            event.preventDefault();

            console.log('鼠标右击地图事件')
        })
    }

    // 地图开始移动事件
    const startRemove = (map) => {
        map.on('movestart', (event) => {
            console.log('地图开始移动事件')
        })
    }


    // 地图停止移动事件
    const endRemove = (map) => {
        map.on('moveend', (event) => {
            console.log('地图停止移动事件')
        })
    }

    return {
        leftSingleClick,
        leftClick,
        leftDoubleClick,
        rightClick,
        startRemove,
        endRemove,
    }
}

export default useMapEventHook