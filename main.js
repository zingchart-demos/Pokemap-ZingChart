var pokescript = require('./pokemon-scripts');
var svgToZing = require('./svg-to-zing');
var SVGSTRING;

window.addEventListener("load", beginApp);
function beginApp() {
    document.getElementById('select_Region').addEventListener("change", function () {
        if (document.getElementById('select_Region').value != "")
        {
            var location = new XMLHttpRequest();
            var url = 'region_maps/' + document.getElementById('select_Region').value + '.svg';
            location.onreadystatechange = function() {
                if (location.readyState == 4 && location.status == 200) {
                    SVGSTRING = location.response;
                    loadSVG();
                }
            };
            location.open("GET", url, true);
            location.send();
        }
    }, false);
    function loadSVG() {
        var parser = new DOMParser();
        var SVGObject = parser.parseFromString(SVGSTRING, "image/svg+xml");
        var pathList = SVGObject.getElementsByTagName("path");
        var pathArray = Array.from(pathList);
        var shapesArray = [];
        pathArray.forEach(function (path) {
            shapesArray.push(svgToZing.mkshape(path));
        });
        var circleList = SVGObject.getElementsByTagName("circle");
        var circleArray = Array.from(circleList);
        circleArray.forEach(function (circle) {
            shapesArray.push(svgToZing.mkshape(circle))
        });
        pokescript.createDropDown(SVGObject.getElementsByTagName("svg")[0].getAttribute("regionID"),[SVGObject,shapesArray]);
    }
}