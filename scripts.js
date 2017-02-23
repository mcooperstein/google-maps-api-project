//API Key: AIzaSyCjsuf6lDKHz_fkTGZTNuh3qehl_LzJP-o

var panorama;
var map;
var clicks = 0;

function initMap() {
    var myLatLng = {
        lat: -25.363,
        lng: 131.044
    };

    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('output'), {
        center: myLatLng,
        scrollwheel: false,
        zoom: 5
    });

    // Create a marker and set its position.
    var marker = new google.maps.Marker({
        map: map,
        position: myLatLng,
        title: 'Hello World!'

    });

    var geocoder = new google.maps.Geocoder();
    document.getElementById('glmaps').addEventListener('click', function () {
        geocodeAddress(geocoder, map, false);
        $("#output").show();
        $("#panorama-div").hide();
    });
    document.getElementById("guess").addEventListener("click", function () {
        randomLocation();
        $("#output").hide();
        $("#panorama-div").show();
    });
    document.getElementById('panorama').addEventListener('click', function () {
        $("#output").hide();
        $("#panorama-div").show();
        geocodeAddress(geocoder, map, true);
    });
    document.getElementById("markers").addEventListener("click", function () {
        $("#output").show();
        $("#panorama-div").hide();
        if (clicks == 0) {
            for (var i = 0; i < 5; i++) {
                /*    var lng = getRandomInt(-100, 100);
          var lat = getRandomInt(-100, 100);   */
                var lng = Math.random() * 360 - 180;
                var lat = Math.random() * 180 - 90;
                var latLng = new google.maps.LatLng(lat, lng);
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map
                });
            }
        }
        clicks++;
    })
}

function geocodeAddress(geocoder, resultsMap, showPanorama) {
    var address = document.getElementById('address').value;
    geocoder.geocode({
        'address': address
    }, function (results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location

            });
            if (showPanorama) {

                var panorama = new google.maps.StreetViewPanorama(
                    document.getElementById('panorama-div'), {

                        position: results[0].geometry.location,

                        pov: {
                            heading: 34,
                            pitch: 10
                        }
                    });
                map.setStreetView(panorama);
            }
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });

}

/*function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}*/

function getCircle(magnitude) {
    return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: 'red',
        fillOpacity: .2,
        scale: Math.pow(2, magnitude) / 2,
        strokeColor: 'white',
        strokeWeight: .5

    };
}

function randomLocation() {
    var long = Math.random() * -58 - 66;
    var lati = Math.random() * 25 + 24;
    var random = {
        lat: lati,
        lng: long
    };
    var sv = new google.maps.StreetViewService();
    console.log(sv);
    panorama = new google.maps.StreetViewPanorama(document.getElementById('output'), {
        addressControl: false
    });
    sv.getPanorama({
        location: random,
        radius: 50
    }, processSVData);
    map = new google.maps.Map(document.getElementById('map'), {
        center: random,
        zoom: 16,
        streetViewControl: false
    });
    // Look for a nearby Street View panorama when the map is clicked.
    // getPanoramaByLocation will return the nearest pano when the
    // given radius is 50 meters or less.
    map.addListener('click', function (event) {
        sv.getPanorama({
            location: event.latLng,
            radius: 50
        }, processSVData);
    });

}

function processSVData(data, status) {
    console.log(data);
    console.log(status);
    if (status === 'OK') {
        var marker = new google.maps.Marker({
            position: data.location.latLng,
            map: map
                //title: data.location.description
        });

        panorama.setPano(data.location.pano);
        panorama.setPov({
            heading: 270,
            pitch: 0
        });
        panorama.setVisible(true);

        marker.addListener('click', function () {
            var markerPanoID = data.location.pano;
            // Set the Pano to use the passed panoID.
            panorama.setPano(markerPanoID);
            panorama.setPov({
                heading: 270,
                pitch: 0
            });
            panorama.setVisible(true);
        });
    } else {
        console.error('Street View data not found for this location.');
        randomLocation();
    }
}
