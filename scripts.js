//API Key: AIzaSyCjsuf6lDKHz_fkTGZTNuh3qehl_LzJP-o
var map;
var canvas = document.getElementById("map-canvas");

function initMap() {
    var mapOptions = {
        center: new google.maps.LatLng(36.778, -119.417),
        zoom: 6
    }
    map = new google.maps.Map(canvas, mapOptions);
    var input = document.getElementById("user-input");

    var autocomplete = new google.maps.places.Autocomplete(input, {
        placeIdOnly: true
    });
    autocomplete.bindTo("bounds", map);
    var geocoder = new google.maps.Geocoder;
    var marker = new google.maps.Marker({
        map: map
    });

    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();

        if (!place.place_id) {
            return;
        }
        geocoder.geocode({
            'placeId': place.place_id
        }, function (results, status) {

            if (status !== 'OK') {
                window.alert('Geocoder failed due to: ' + status);
                return;
            }
            map.setZoom(11);
            map.setCenter(results[0].geometry.location);
            // Set the position of the marker using the place ID and location.
            marker.setPlace({
                placeId: place.place_id,
                location: results[0].geometry.location
            });
            marker.setVisible(true);
        });
    });
};
