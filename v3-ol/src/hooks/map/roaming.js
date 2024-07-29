function useRoamHook() {
    // 定义漫游函数
    const roamFun = (event) => {
        // 获取点击位置坐标
        const [lng, lat] = event.coordinate
        // 漫游至点击位置
        map.getView().animate({
            center: [lng, lat],  // 中心点
            zoom: 8,    // 缩放级别
            duration: 1000,  // 持续时间，单位为毫秒
        })
    }

    // 开启地图漫游
    function openRoam() {
        map.on('click', roamFun);
    }
    // 取消地图漫游
    function closeRoam() {
        map.un('click', roamFun);
    }

    return {
        openRoam,
        closeRoam
    }
}

export default useRoamHook