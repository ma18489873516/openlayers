import { Style, Fill, Circle, Stroke, Text, Icon } from 'ol/style'

import { randomColor } from './randomColor.js'

// 渐变色(变量式)
export const gradientColorStyle = new Style({
    renderer(coordinates, state) {
        const [[x, y], [x1, y1]] = coordinates;
        const ctx = state.context;
        const dx = x1 - x;
        const dy = y1 - y;
        const radius = Math.sqrt(dx * dx + dy * dy);
        const innerRadius = 0;
        const outerRadius = radius * 1.4;
        const gradient = ctx.createRadialGradient(x, y, innerRadius, x, y, outerRadius);
        gradient.addColorStop(0, 'red');
        gradient.addColorStop(1 / 6, randomColor());
        gradient.addColorStop(2 / 6, randomColor());
        gradient.addColorStop(3 / 6, randomColor());
        gradient.addColorStop(4 / 6, randomColor());
        gradient.addColorStop(5 / 6, randomColor());
        gradient.addColorStop(1, randomColor());
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
        ctx.strokeStyle = 'rgba(255,0,0,1)';
        ctx.stroke();
    },
})