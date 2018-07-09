if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/javascripts/sw.js', {scope: '/javascripts/sw.js'})
        .then((registration) => {
            console.log('Service worker registered with scope :', registration.scope);
        })
        .catch((err) => {
            console.log('Registration failed: ' + err);
        });
}

function getPosition() {
    let location = navigator.geolocation;
    let mapLocation;

    if (!location) {
        return "Not supported by your browser";
    }

    function getLocation() {
        return new Promise(function (resolve, reject) {
            location.getCurrentPosition(function (position) {
                resolve({latitude: position.coords.latitude, longitude: position.coords.longitude});
            });
        });
    }

    getLocation().then(
        (doc) => {
            mapLocation = new google.maps.LatLng(doc.latitude, doc.longitude);
            console.log(mapLocation.lat);
        },
        (err) => {
            console.error(err);
        }
    ).catch((err) => {
        console.error('Ko sise', err);
    });
}

$('#getLocation').on('click', function () {
    getPosition();
});

$('#goGetLocation').on('click', function() {
    let input = $('#locationInput')[0];
    getPosition();
});

$('#locationInput').on('input', function () {
    let autocomplete,
        input = $(this)[0];

    if (!input) {
        return;
    }

    if (input.length >= 4) {

        autocomplete = new google.maps.places.Autocomplete(input);
        console.log(autocomplete);

        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            infowindow.close();
            let place = autocomplete.getPlace();
            if (!place.geometry) {
                return;
            }

            console.log('Place ID: ' + place.place_id);
            console.log('Place Address: ' + place.formatted_address);
        });

    }
});









//Example from google

//
// var map;
// var infowindow;
//
// function initMap() {
//     var pyrmont = {lat: -33.867, lng: 151.195};
//
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: pyrmont,
//         zoom: 15
//     });
//
//     infowindow = new google.maps.InfoWindow();
//     var service = new google.maps.places.PlacesService(map);
//     service.nearbySearch({
//         location: pyrmont,
//         radius: 500,
//         type: ['store']
//     }, callback);
// }
//
// function callback(results, status) {
//     if (status === google.maps.places.PlacesServiceStatus.OK) {
//         for (var i = 0; i < results.length; i++) {
//             createMarker(results[i]);
//         }
//     }
// }
//
// function createMarker(place) {
//     var placeLoc = place.geometry.location;
//     var marker = new google.maps.Marker({
//         map: map,
//         position: place.geometry.location
//     });
//
//     google.maps.event.addListener(marker, 'click', function() {
//         infowindow.setContent(place.name);
//         infowindow.open(map, this);
//     });
// }