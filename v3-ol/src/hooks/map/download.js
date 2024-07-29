// 下载pdf需要安装插件jsPDF：pnpm install jspdf --save
import { jsPDF } from "jspdf";

function useMapViewHook() {
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

    //下载视图( pdf格式)
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

    return {
        viewImageDownload,
        viewPdfDownload
    }
}

export default useMapViewHook