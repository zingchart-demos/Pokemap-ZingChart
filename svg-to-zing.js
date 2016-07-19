/**
 * Created by tmartin on 7/8/16.
 */

module.exports = function (val_in) {
    return makeShape(val_in);
};

function pathToPolygon(array) {
    var pointsArray = [];
    var currentLetter = "";
    var position = 0;
    var pointCount = 0; //CURVE
    var curvePoints = [];
    var recentStart = [0,0];
    array.forEach(function (value) {
        if (isNaN(parseFloat(value))){
            currentLetter = value;
            if ((currentLetter == "M" || currentLetter == "m") && pointsArray.length > 0)
            {
                pointsArray.push(null);
            }
            if (currentLetter == "z" || currentLetter == "Z"){
                pointsArray.push([recentStart[0],recentStart[1]]);
            }
        }
        else {
            switch (currentLetter) {
                case 'M':
                    if (position) {
                        pointsArray[pointsArray.length-1].push(parseFloat(value));
                        recentStart[1] = parseFloat(value);
                        position = 0;

                    }
                    else {
                        pointsArray.push([parseFloat(value)]);
                        recentStart[0] = parseFloat(value);
                        position = 1;
                    }
                    break;
                case 'L':
                    if (position) {
                        pointsArray[pointsArray.length-1].push(parseFloat(value));
                        position = 0;
                    }
                    else {
                        pointsArray.push([parseFloat(value)]);
                        position = 1;
                    }
                    break;
                case 'C':
                    if (position == 0) {
                        if (pointCount == 0)
                        {
                            curvePoints.push([pointsArray[pointsArray.length-1][0],pointsArray[pointsArray.length-1][1]]);
                        }
                        curvePoints.push([parseFloat(value)]);
                        position = 1;
                    }
                    else {
                        curvePoints[curvePoints.length-1].push(parseFloat(value));
                        pointCount++;
                        position = 0;
                        if (pointCount == 3)
                        {
                            var vals = bezier(curvePoints);
                            var distance = (Math.pow(Math.pow((curvePoints[0][0]-curvePoints[1][0]),2) + Math.pow((curvePoints[0][1]-curvePoints[1][1]),2),1/2)+Math.pow(Math.pow((curvePoints[1][0]-curvePoints[2][0]),2) + Math.pow((curvePoints[1][1]-curvePoints[2][1]),2),1/2)+Math.pow(Math.pow((curvePoints[2][0]-curvePoints[3][0]),2) + Math.pow((curvePoints[2][1]-curvePoints[3][1]),2),1/2)/4);
                            for (var t = 0; t < distance;t++) {
                                pointsArray.push(vals(t/distance));
                            }
                            curvePoints = [];
                            pointCount = 0;
                        }
                    }
                    // if (position == 5) {
                    //     curvePoints.push(parseFloat(value) - curvePoints[position - 4]);
                    //     pointsArray.push(curvePoints);
                    //     position = 0;
                    //     curvePoints = [];
                    // }
                    // else if (position == 4){
                    //     curvePoints.push(parseFloat(value) - curvePoints[position - 4]);
                    //     position++;
                    // }
                    // else if (position == 2 || position ==3){
                    //     curvePoints.push(parseFloat(value) - curvePoints[position - 2]);
                    //     position++;
                    // }
                    // else if (position == 0){
                    //     var prev = pointsArray[pointsArray.length-1];
                    //     curvePoints.push(prev[prev.length-2]);
                    //     curvePoints.push(prev[prev.length-1]);
                    //     curvePoints.push(parseFloat(value));
                    //     position++;
                    // }
                    // else {
                    //     curvePoints.push(parseFloat(value));
                    //     position++;
                    // }
                    break;
                case 'A':
                    //handle arc
                    break;
            }
        }
    });
    return pointsArray;
}
function pathToLine(array) {
    var pointsArray = [];
    var currentLetter = "";
    var position = 0;
    var pointCount = 0; //CURVE
    var curvePoints = [];
    var recentStart = [0,0];
    array.forEach(function (value) {
        if (isNaN(parseFloat(value))){
            currentLetter = value;
            if ((currentLetter == "M" || currentLetter == "m") && pointsArray.length > 0)
            {
                pointsArray.push(null);
            }
            if (currentLetter == "z" || currentLetter == "Z"){
                pointsArray.push([recentStart[0],recentStart[1]]);
            }
        }
        else {
            switch (currentLetter) {
                case 'M':
                    if (position) {
                        pointsArray[pointsArray.length-1].push(parseFloat(value));
                        recentStart[1] = parseFloat(value);
                        position = 0;

                    }
                    else {
                        pointsArray.push([parseFloat(value)]);
                        recentStart[0] = parseFloat(value);
                        position = 1;
                    }
                    break;
                case 'L':
                    if (position) {
                        pointsArray[pointsArray.length-1].push(parseFloat(value));
                        position = 0;
                    }
                    else {
                        pointsArray.push([parseFloat(value)]);
                        position = 1;
                    }
                    break;
                case 'C':
                    if (position == 0) {
                        if (pointCount == 0)
                        {
                            curvePoints.push([pointsArray[pointsArray.length-1][0],pointsArray[pointsArray.length-1][1]]);
                        }
                        curvePoints.push([parseFloat(value)]);
                        position = 1;
                    }
                    else {
                        curvePoints[curvePoints.length-1].push(parseFloat(value));
                        pointCount++;
                        position = 0;
                        if (pointCount == 3)
                        {
                            var vals = bezier(curvePoints);
                            var distance = (Math.pow(Math.pow((curvePoints[0][0]-curvePoints[1][0]),2) + Math.pow((curvePoints[0][1]-curvePoints[1][1]),2),1/2)+Math.pow(Math.pow((curvePoints[1][0]-curvePoints[2][0]),2) + Math.pow((curvePoints[1][1]-curvePoints[2][1]),2),1/2)+Math.pow(Math.pow((curvePoints[2][0]-curvePoints[3][0]),2) + Math.pow((curvePoints[2][1]-curvePoints[3][1]),2),1/2)/4);
                            for (var t = 0; t < distance;t++) {
                                pointsArray.push(vals(t/distance));
                            }
                            curvePoints = [];
                            pointCount = 0;
                        }
                    }
                    break;
                case 'A':
                    //handle arc
                    break;
            }
        }
    });
    return pointsArray;
}

function makeShape(path) {
    var lineColor_in = "black";
    var fillColor_in = "none";
    var strokeWidth_in = "5";
    var points_in = [];
    var style_array = [];
    if (path.getAttribute("class") == "ROUTE") {
        if (path.getAttribute("d")) {
            points_in = pathToLine(path.getAttribute("d").trim().split(/[\s,]+/));
            lineColor_in = "black";
            strokeWidth_in = "5";
            style_array = path.getAttribute("style").split(";");
            style_array.forEach(function (value) {
                value.trim();
                if (value.startsWith("stroke:")) {
                    lineColor_in = value.substr(7);
                }
                else if (value.startsWith("stroke-width:")) {
                    strokeWidth_in = value.substr(13);
                }
            });
            return {
                id: path.getAttribute("id"),
                type: "line",
                lineWidth: strokeWidth_in,
                lineColor: lineColor_in,
                points: points_in,
                //FOR POKEMON
                "hover-state": {
                    "lineColor": "#FFD700",
                }
            };
        }
    }
    else if (path.getAttribute("class") == "LAND") {
        if (path.getAttribute("d")) {
            points_in = pathToPolygon(path.getAttribute("d").trim().split(/[\s,]+/));
            style_array = path.getAttribute("style").split(";");
            style_array.forEach(function (value) {
                value.trim();
                if (value.startsWith("stroke:")) {
                    lineColor_in = value.substr(7);
                }
                else if (value.startsWith("fill:")) {
                    fillColor_in = value.substr(5);
                }
                else if (value.startsWith("stroke-width:")) {
                    strokeWidth_in = value.substr(13);
                }
            });
            return {
                id: path.getAttribute("id"),
                type: "poly",
                borderWidth: strokeWidth_in,
                borderColor: lineColor_in,
                backgroundColor: fillColor_in,
                points: points_in,
                "shadow": true,
                "shadow-distance": 3,
                "shadow-color": "#0D485F",
                "shadow-alpha": 1,
                flat: true
            };
        }
    }
    else if (path.getAttribute("class") == "CITY") {
        var circleR = path.getAttribute("r").trim();
        var circleX = path.getAttribute("cx").trim();
        var circleY = path.getAttribute("cy").trim();
        lineColor_in = "black";
        strokeWidth_in = "5";
        style_array = path.getAttribute("style").split(";");
        style_array.forEach(function (value) {
            value.trim();
            if (value.startsWith("stroke:")) {
                lineColor_in = value.substr(7);
            }
            else if (value.startsWith("fill:")) {
                fillColor_in = value.substr(5);
            }
            if (value.startsWith("stroke-width:")) {
                strokeWidth_in = value.substr(13);
            }
        });
        return {
            id: path.getAttribute("id"),
            type:"circle",
            borderWidth:strokeWidth_in,
            borderColor:lineColor_in,
            backgroundColor: fillColor_in,
            size:circleR + "px",
            x: circleX + "px",
            y: circleY + "px",
            "hover-state": {
                "borderColor": "#FFD700",
                "backgroundColor": "#FFD700",
            }
        };
    }
}