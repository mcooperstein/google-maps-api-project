//API Key: AIzaSyCjsuf6lDKHz_fkTGZTNuh3qehl_LzJP-o
var map;
var canvas = document.getElementById("map-canvas");

function initMap() {
    var mapOptions = {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 5
    }
    map = new google.maps.Map(canvas, mapOptions);
};
