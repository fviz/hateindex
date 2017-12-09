var hmp = [];
var hateindex = [];
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
/* Data points defined as an array of LatLng objects */
$(document).ready(function() {
    calculateAmount();
    calculateLatLong();
    // calculateNewsPos();
    setTimeout(function() {
        var USA = new google.maps.LatLng(37.0902, -95.7129);
        var heatmap = new google.maps.visualization.HeatmapLayer({
            data: hmp,
            radius: 10
        });
        map = new google.maps.Map(document.getElementById('map'), {
            center: USA,
            zoom: 4,
            mapTypeId: 'terrain',
            styles: [ { "elementType": "geometry", "stylers": [ { "color": "#f5f5f5" } ] }, { "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "elementType": "labels.text.fill", "stylers": [ { "color": "#616161" } ] }, { "elementType": "labels.text.stroke", "stylers": [ { "color": "#f5f5f5" } ] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [ { "color": "#bdbdbd" } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#eeeeee" } ] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [ { "color": "#757575" } ] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [ { "color": "#e5e5e5" } ] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [ { "color": "#757575" } ] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "color": "#dadada" } ] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [ { "color": "#616161" } ] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [ { "color": "#e5e5e5" } ] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [ { "color": "#eeeeee" } ] }, { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#c9c9c9" } ] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] } ]
        });
        heatmap.setMap(map);
        var gradient = [
            'rgba(0, 255, 255, 0)',
            'rgba(0, 255, 255, 1)',
            'rgba(0, 191, 255, 1)',
            'rgba(0, 127, 255, 1)',
            'rgba(0, 63, 255, 1)',
            'rgba(0, 0, 255, 1)',
            'rgba(0, 0, 223, 1)',
            'rgba(0, 0, 191, 1)',
            'rgba(0, 0, 159, 1)',
            'rgba(0, 0, 127, 1)',
            'rgba(63, 0, 91, 1)',
            'rgba(127, 0, 63, 1)',
            'rgba(191, 0, 31, 1)',
            'rgba(255, 0, 0, 1)'
        ]
        heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
    }, 5000);
});

function calculateAmount() {
    $.getJSON("./data/hatecrimes.json", function(data) {
        $.each(data, function(i) {
            $.each(data[i], function(z) {
                var sum = 0;
                var pop = 0;
                for (var property in this) {
                    if (property == "1st quarter") {
                        sum += this[property];
                    } else if (property == "2nd quarter") {
                        sum += this[property];
                    } else if (property == "3rd quarter") {
                        sum += this[property];
                    } else if (property == "4th quarter") {
                        sum += this[property];
                    } else if (property == "Population") {
                        str = this[property];
                        str = str.replace(/,/g, "");
                        pop = parseInt(str, 10);
                    }
                }
                hicalc = (sum / pop) * 10000;
                hateindex.push(hicalc);
            });
        });
    });
    console.log("Done processing amounts.");
}

function calculateLatLong() {
    $.getJSON("./data/geo.json", function(data) {
        var currentcity = 0;
        $.each(data, function() {
            var amount = hateindex[currentcity];
            var counter = 0;
            var longitude = "";
            var latitude = "";
            for (var property in this) {
                if (counter == 0) {
                    counter++;
                    continue;
                } else if (counter == 1) {
                    latitude = this[property];
                    counter++;
                } else if (counter == 2) {
                    longitude = this[property];
                    counter = 0;
                }
            }
            hmp.push({location: new google.maps.LatLng(latitude, longitude), weight: amount});
            currentcity++;
        });
    });
    console.log("Done processing geodata.");
}