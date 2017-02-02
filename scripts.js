//API Key: AIzaSyCjsuf6lDKHz_fkTGZTNuh3qehl_LzJP-o
var map;
var canvas = document.getElementById("map-canvas");

function initMap() {
    var mapOptions = {
        center: new google.maps.LatLng(36.778, -119.417),
        zoom: 6
    }
    map = new google.maps.Map(canvas, mapOptions);
};
