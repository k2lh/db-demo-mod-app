app.controller('mapController', ['$scope', '$stateParams', '$state', 'storageFactory',
    function mapController($scope, $stateParams, $state, storageFactory) {

         /** TODO: kill google maps & add leaflet instead **/
        // this goes here bc I'm too annoyed to keep whacking at the stupid directive
        var lon = storageFactory.lon;
        var lat = storageFactory.lat;

        var center = new google.maps.LatLng(lat, lon);
        var styles = [
            {
              stylers: [ { saturation: -20 } ]
            },{
            },{
                featureType: "road",
                elementType: "geometry",
                stylers: [ { lightness: 100 }, { visibility: "simplified" } ]
            },{
                featureType: "water",
                elementType: "geometry",
                stylers: [ { color: "#a2daf2"} ]
            },
            {
                featureType: "landscape.man_made",
                elementType: "geometry",
                stylers: [ {color: "#f7f1df"} ]
            },
            {
                featureType: "landscape.natural",
                elementType: "geometry",
                stylers: [ {color: "#d0e3b4"} ]
            },
            {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [ {color: "#bde6ab"} ]
            },
            {
                featureType: "poi.business",
                stylers: [ {visibility: "off"} ]
            },
            {
                featureType: "road",
                elementType: "labels",
                stylers: [ { visibility: "simplified"} ]
            }
        ];

        var styledMap = new google.maps.StyledMapType(styles, {name: "x"});
        var map_options = {
            zoom: 15,
            center: center,
            disableDefaultUI: true,
            mapTypeControlOptions: {
              mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
            }
        };
        var map = new google.maps.Map(document.getElementById('map_canvas'), map_options);

        var marker_options = {
            map: map,
            position: center
        };
       var marker = new google.maps.Marker(marker_options);

       map.mapTypes.set('map_style', styledMap);
       map.setMapTypeId('map_style');
       map.panBy(-250,30);

       window.setTimeout(function(){
           google.maps.event.trigger(map, 'resize');
       },100);

    }
]);
