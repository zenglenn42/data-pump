
//Need to get starting coordinates. 

L.mapbox.accessToken = 'pk.eyJ1IjoibmtnNDQ4IiwiYSI6ImNpd3JncG45bjBzZDIyeXFsd2ZnOHA4MXIifQ.cUQfTxmm4r87cMn6LfJ3Vw';

function clusterLayer(dataset){
	var clusterMarkers = new L.MarkerClusterGroup();
	for (var i = 0; i < dataset.length; i++) {
	        var latLong = dataset[i].geometry.coordinates;
	        var title = dataset[i].properties.name;
            var icontype = dataset[i].properties['marker-symbol'];
	        var marker = L.marker(new L.LatLng(latLong[1], latLong[0]), {
	            icon: L.mapbox.marker.icon({'marker-symbol': icontype, 'marker-color': '0044FF'}),
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

function initMap(map1, dataset) {
        
        var clusters = clusterLayer(dataset.features);
        var rawData =  rawLayer(dataset);
        addLayer(map1, L.mapbox.tileLayer('mapbox.outdoors'), 'Outdoor Map', 1);
        addLayer(map1, L.mapbox.tileLayer('mapbox.streets'), 'Street Map', 2);
        addLayer(map1, clusters, 'Cluster Layer', 3);
        addLayer(map1, rawData, 'Raw Layer', 4);
}

function addLayer(map, layer, name, zIndex) {
    layer
        .setZIndex(zIndex)
        .addTo(map);

    // Create a simple layer switcher that
    // toggles layers on and off.
    var link = document.createElement('button');
        link.type = "button";
        link.href = '#';
        link.className = 'active btn btn-primary';
        link.innerHTML = name;
    //var newButton = $("label");
    //newButton.addClass("btn btn-primary active");
    //newButton.html(name);
        
    /*newButton.on("click", function(e){
        e.preventDefault();
        e.stopPropagation();

        if (map.hasLayer(layer)) {
            map.removeLayer(layer);
            $(this).removeClass("active");
        } else {
            map.addLayer(layer);
        //    this.className = 'active';
            $(this).addClass("active");
        }

    })   */                         

    link.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (map.hasLayer(layer)) {
            map.removeLayer(layer);
            this.className = 'btn btn-primary';
        } else {
            map.addLayer(layer);
            this.className = 'active btn btn-primary';
        }
    };

    layers.appendChild(link);

    //$("#menu-ui").append(newButton);
}