$(document).ready(function () { //main

    main();

});

function main(){}

var locations = [];

function initMap(){
    //'https://firms.modaps.eosdis.nasa.gov/data/active_fire/c6/csv/MODIS_C6_Global_24h.csv'
    $.when($.ajax({
        type: "GET",
        url: 'https://firms.modaps.eosdis.nasa.gov/data/active_fire/c6/csv/MODIS_C6_Global_24h.csv',
        dataType: "text",
        success: function(data) {processData(data);}
    })).done(
        function(){
    var center = {lat: 0, lng: 0};
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 2, center: center});
    var markers = locations.map(function(location, i) {
        return new google.maps.Marker({
            position: location,
            icon: "fire.png"
        });
    });
    new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
        });
}

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
                tarr.lat = (parseFloat(data[0]));
                tarr.lng = (parseFloat(data[1]));
            locations.push(tarr);
        }
    }
}