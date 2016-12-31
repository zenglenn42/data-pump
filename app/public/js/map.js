
//Need to get starting coordinates. 

L.mapbox.accessToken = 'pk.eyJ1IjoibmtnNDQ4IiwiYSI6ImNpd3JncG45bjBzZDIyeXFsd2ZnOHA4MXIifQ.cUQfTxmm4r87cMn6LfJ3Vw';

function clusterLayer(dataset){
	var clusterMarkers = new L.MarkerClusterGroup();
	for (var i = 0; i < dataset.length; i++) {
	        var latLong = dataset[i].geometry.coordinates;
	        var title = dataset[i].properties.name;
	        var marker = L.marker(new L.LatLng(latLong[1], latLong[0]), {
	            icon: L.mapbox.marker.icon({'marker-symbol': 'car', 'marker-color': '0044FF'}),
	            title: title
	        });
	        marker.bindPopup(title);
	        clusterMarkers.addLayer(marker);
	    }

	return clusterMarkers;
}

function rawLayer(dataset){
	var myLayer = L.mapbox.featureLayer().setGeoJSON(dataset);
	return myLayer;
}

function addLayer(layer, name, zIndex) {
    layer
        .setZIndex(zIndex)
        .addTo(map);

    // Create a simple layer switcher that
    // toggles layers on and off.
    var link = document.createElement('a');
        link.href = '#';
        link.className = 'active';
        link.innerHTML = name;

    link.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (map.hasLayer(layer)) {
            map.removeLayer(layer);
            this.className = '';
        } else {
            map.addLayer(layer);
            this.className = 'active';
        }
    };

    layers.appendChild(link);
}

function addLayer2(map, layer, name, zIndex) {
    layer
        .setZIndex(zIndex)
        .addTo(map);

    // Create a simple layer switcher that
    // toggles layers on and off.
    var link = document.createElement('a');
        link.href = '#';
        link.className = 'active';
        link.innerHTML = name;

    link.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (map.hasLayer(layer)) {
            map.removeLayer(layer);
            this.className = '';
        } else {
            map.addLayer(layer);
            this.className = 'active';
        }
    };

    layers.appendChild(link);
}