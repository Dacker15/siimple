import {colors, strokes} from "../defaults.js";
import {getStartPosition, getEndPosition} from "../utils/math.js";

//Export rectangle element
export const rectangleElement = {
    "icon": "square",
    "visibleOnToolbar": true,
    "initialConfig": {
        "fillColor": "transparent",
        "strokeColor": "dark",
        "strokeWidth": "small",
        "radius": 5,
        "opacity": 1.0
    },
    "draw": function (element, context, rc) {
        //Get real positions
        let xStart = getStartPosition(element.x, element.width); //Real x start position
        let yStart = getStartPosition(element.y, element.height); //Real y start position
        let xEnd = getEndPosition(element.x, element.width); //Real y end position
        let yEnd = getEndPosition(element.y, element.height); //Real y end position
        let radius = Math.min(element.radius, Math.abs(element.width) / 2, Math.abs(element.height) / 2); //Get max radius
        context.beginPath();
        context.globalAlpha = element.opacity;
        //context.rect(element.x, element.y, element.width, element.height);
        context.moveTo(xStart + radius, yStart);
        context.lineTo(xEnd - radius, yStart);
        context.quadraticCurveTo(xEnd, yStart, xEnd, yStart + radius);
        context.lineTo(xEnd, yEnd - radius);
        context.quadraticCurveTo(xEnd, yEnd, xEnd - radius, yEnd);
        context.lineTo(xStart + radius, yEnd);
        context.quadraticCurveTo(xStart, yEnd, xStart, yEnd - radius);
        context.lineTo(xStart, yStart + radius);
        context.quadraticCurveTo(xStart, yStart, xStart + radius, yStart);
        context.closePath();
        context.fillStyle = colors[element.fillColor];
        context.fill();
        //Check for no stroke color --> render rectangle stroke
        if (element.strokeColor !== "transparent") {
            context.strokeStyle = colors[element.strokeColor];
            context.lineWidth = strokes[element.strokeWidth];
            context.setLineDash([]); //Clear line-dash style
            context.stroke();
        }
        context.globalAlpha = 1; //Reset opacity
    }
};

