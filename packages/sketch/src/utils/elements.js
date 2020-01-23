import {colors, selectionColor} from "./style.js";
import {strokes} from "./style.js";

//Available elements
let elements = {
    "selection": {
        "initialConfig": {},
        "draw": function (element, context) {
            context.beginPath();
            context.fillStyle = selectionColor;
            context.rect(element.x, element.y, element.width, element.height);
            context.fill();
        }
    },
    "rectangle": {
        "initialConfig": {
            "color": "blue",
            "strokeColor": "transparent",
            "strokeWidth": "small",
            "opacity": 1.0
        },
        "draw": function (element, context) {
            context.beginPath();
            context.fillStyle = colors[element.color];
            context.rect(element.x, element.y, element.width, element.height);
            context.fill();
        }
    },
    "ellipse": {
        "initialConfig": {
            "color": "red",
            "opacity": 1.0
        },
        "draw": function (element, context) {
            let rx = element.width / 2;
            let ry = element.height / 2;
            context.beginPath();
            context.fillStyle = colors[element.color];
            context.ellipse(element.x + rx, element.y + ry, Math.abs(rx), Math.abs(ry), 0, 0, 2*Math.PI);
            context.fill();
        }
    },
    "line": {
        "initialConfig": {
            "strokeColor": "dark",
            "strokeWidth": "small",
            "opacity": 1.0
        },
        "draw": function (element, context) {
            context.beginPath();
            context.strokeStyle = colors[element.strokeColor];
            context.lineWidth = strokes[element.strokeWidth];
            context.setLineDash([]); //Clear line-dash style
            context.moveTo(element.x, element.y);
            context.lineTo(element.x + element.width, element.y + element.height);
            context.stroke();
        }
    },
    "arrow": {
        "initialConfig": {
            "strokeColor": "dark",
            "strokeWidth": "small",
            "opacity": 1.0
        },
        "draw": function (element, context) {
            //Calculate the arrow size
            let size = Math.sqrt(Math.pow(element.width, 2) + Math.pow(element.height, 2));
            let xEnd = element.x + element.width; //End x-point of the arrow
            let yEnd = element.y + element.height; //End y-point of the arrow
            context.beginPath();
            context.strokeStyle = colors[element.strokeColor];
            context.lineWidth = strokes[element.strokeWidth];
            context.setLineDash([]); //Clear line-dash style
            context.moveTo(element.x, element.y);
            context.lineTo(xEnd, yEnd);
            if (size >= 10) {
                let dx = element.width; // - element.x;
                let dy = element.height; // - element.y;
                let arrowSize = 12; //Arrow line size
                let arrowAngle = Math.atan2(dy, dx); //Arrow line angle
                //First arrow line
                context.moveTo(xEnd, yEnd);
                context.lineTo(
                    xEnd - arrowSize * Math.cos(arrowAngle - Math.PI / 6),
                    yEnd - arrowSize * Math.sin(arrowAngle - Math.PI / 6)
                );
                context.moveTo(xEnd, yEnd);
                context.lineTo(
                    xEnd - arrowSize * Math.cos(arrowAngle + Math.PI / 6), 
                    yEnd - arrowSize * Math.sin(arrowAngle + Math.PI / 6)
                );
            }
            context.stroke();
        }
    }
};

//Create a new element
export function createElement (options) {
    return Object.assign(options, elements[options.type].initialConfig, {
        "id": Date.now(), //TODO: replace thid
        "width": 0,
        "height": 0,
        "selected": false,
        "locked": false
    });
}

//Draw the provided element
export function drawElement (element, context) {
    elements[element.type].draw(element, context);
}

