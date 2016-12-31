//---------------------------------------------------------------------------
// File: controller.js
//
// This file contains the controller logic.  The controller is responsible
// for responding to user input and mediating communication between the
// model and view.
//
// It drives the orderly transition from one application state to another.
//---------------------------------------------------------------------------

$(document).ready(initMVC);

// Function: initMVC
// Usage: $(document).ready(initMVC);
// ----------------------------------
// Initializes the model, view and controller.  Most of the
// initial data comes from the model itself.

function initMVC() {
	console.log('initMVC');

	// Run model unit tests for sanity.  We'll comment this out in production.
	//(model.unitTests()) ? console.log("model.unitTests() passed") :
	//                      console.log("model.unitTests() failed");

	//var place = "austin";
	var place = "austin";

	// Initialize model.
	model.init(place);

	// Initialize view.
	vInit(model);

	// Initialize map.
	var map = loadMap(model);

	// Seed the dataSource, but don't display any data by default.
	// Let the user decide what they want, rather than forcing some
	// default upon them.

	var dataSource = "trafficFatalities2016";
	//loadData(map, model, dataSource);

	// Initialize controller.
	cInit(map, model, dataSource);
}

//---------------------------------------------------------------------------
// Controller Functions
//---------------------------------------------------------------------------

// Function: cInit
// Usage: cInit(map, model);
// -------------------------
// Initializes the controller by registering various callback functions
// that come to life in response to user input of some kind.

function cInit(map, model) {
	console.log("cInit");

	$("#traffic2015-button").on("click", function() {
		console.log("clicked 2015 button");
		var map = loadMap(model);
		model.setPlace("austin");
		loadData(map, model, "trafficFatalities2015");
		return false;
	});

	$("#traffic2016-button").on("click", function() {
		console.log("clicked 2016 button");
		var map = loadMap(model);
		model.setPlace("austin");
		loadData(map, model, "trafficFatalities2016");
		return false;
	});

	$("#trafficSignalsOnFlash-button").on("click", function() {
		console.log("clicked trafficSignalsOnFlash button");
		var map = loadMap(model);
		model.setPlace("austin");
		loadData(map, model, "trafficSignalsOnFlash");
		return false;
	});

	$("#austinDangerousDogs-button").on("click", function() {
		console.log("clicked austinDangerousDogs button");
		var map = loadMap(model);
		model.setPlace("austin");
		loadData(map, model, "austinDangerousDogs");
		return false;
	});

	$("#austinFoundPets-button").on("click", function() {
		console.log("clicked austinFoundPets button");
		var map = loadMap(model);
		model.setPlace("austin");
		loadData(map, model, "austinFoundPets");
		return false;
	});

	$(document).on("click", "#reset-button", function(){
		console.log("reset-button callback called");
		model.resetMap();
	});
}

// Function: loadData
// Usage: loadData(map, model, "trafficData");
// ------------------------------------------------
// Loads data from the data source into the model.

function loadData(map, model, dataSource) {
	console.log("loadData");
	var place = model.getPlace();
	var dataSourceUrl = model.getEndpointUrl(place, dataSource);
	if (!dataSourceUrl) {
		console.log("loadData: endpoint url is null for place: " + place + " and dataSource: " + dataSource);
		return false;
	}

	// Update the map caption with description of the data therein.
	vMapCaption(model.getDataSourceDescription(dataSource));

	var position;
	switch (dataSource) {
		case "schoolDistricts":
		case "austinDangerousDogs":
		case "austinFoundPets":
		case "trafficSignalsOnFlash":
		case "trafficFatalities2015":
		case "trafficFatalities2016": {
				$.getJSON(dataSourceUrl, function(response) {
					$.each(response, function(i, entry) {

						// Fetch lat/lng positon for the marker.

						var lat = model.getLat(entry, dataSource);
						var lng = model.getLng(entry, dataSource);
						console.log("(lat, lng)", "(" + lat + ", " + lng + ")");

						if (lat && lng) {

						    position = new google.maps.LatLng(lat, lng);

						    // Fetch some notes to display as 'hover-over' text for
						    // the marker.

							var title = model.getMarkerTitle(entry, dataSource);
							console.log(title);

							// Add a character label to our markers so if they share the
							// same map, we can differentiate them better
							//
							// e.g., dangerous dogs may have a "D" while fatality sites and "X"

							var label = model.getMarkerLabel(entry, dataSource);
							console.log(label);

							// Position a single marker on the map.

							placeMarker(map, model, dataSource, position, title, label);

						} else {

							// Don't expect all entries in the inbound json array to be structured
							// the same way.  Sometimes 'summary' records are added that have
							// entire different schema than the typical record.  For now, we
							// just ignore these.

							console.log("loadData: Unable to extract lat and lng from:", entry);
						}
					});
				});
			}
			break;

		default:
			console.log("loadData: That following data source is not currently supported:", place, dataSource);
			console.log("loadData: Want to help add it? The code is open source.");

			console.log("loadData: geocoder path needs rework due to bursty throttle by Google geocode api.");
			console.log("loadData: Anything beyond first 10 goecode calls in rapid succession trigger an");
			console.log("loadData: api QUERY_OVER_LIMIT error with no lat/lng returned for given street address.");

			// TODO: Do we need to throttle our geocode calls to avoid an OVER_QUERY_LIMIT error?
			//
			// http://stackoverflow.com/questions/2419219/how-do-i-geocode-20-addresses-without-receiving-an-over-query-limit-response
			// http://gis.stackexchange.com/questions/15052/how-to-avoid-google-map-geocode-limit
			// https://developers.google.com/maps/documentation/geocoding/geocoding-strategies
			// https://developers.google.com/maps/documentation/javascript/firebase
			// http://stackoverflow.com/questions/19640055/multiple-markers-google-map-api-v3-from-array-of-addresses-and-avoid-over-query
			// http://econym.org.uk/gmap/geomulti.htm

			// Retrieve raw JSON data from the endpoint and
			// display it on the screen for debug purposes.

			//geocoder = new google.maps.Geocoder();
			//$.getJSON(dataSourceUrl, function(response) {
			// 	for (var i = 0; i < response.length; i++) {
			// 		var rawAddress = response[i].location;
			// 		var address = model.getFullAddress(place, rawAddress);
			// 		if (address) {
			// 			console.log("loadData: truthy i hope? ", address);
			//			geocodeAddress(geocoder, address, map);
			//		} else {
			//			console.log("loadData: skipping undefined address: ", rawAddress);
			//		}
			// 	}
			//});
	}
}

function geocodeAddress(geocoder, address, resultsMap) {
	if (address) {
		console.log("geocodeAddress:", address);
		geocoder.geocode({'address': address}, function(results, status) {
			if (status === 'OK') {
				var marker = new google.maps.Marker({
				map: resultsMap,
				position: results[0].geometry.location
				});
			} else {
				console.log("Geocode was not successful for the following reason: " + status);
				console.log("Failed on this address: ", address);
				//alert('Geocode was not successful for the following reason: ' + status);
			}
		});
	} else {
		console.log("geocodeAddress: ignoring non-truthy address: ", address);
		console.log("otherwise we'll trigger google geocodes api limiter");
	}
}

function placeMarker(map, model, dataSource, positionLatLng, title, label) {
	var infoWindow = new google.maps.InfoWindow({content: title});

	var marker = new google.maps.Marker({
		map: map,
		position: positionLatLng,
		title: title,

		// At first I thought this was cool, but then decided it was gimmicky.
		// -------------------------------------------------------------------
		//animation: google.maps.Animation.DROP,

		// This will be a nice feature once we have new-style Google map markers.
		// With the retro markers we're using, the marker label ends up not 
		// not centered (lands just below center point of circular area).
		// This is a visual distraction, so I'm commenting this out for now.
		//
		// We're using the markers documented here for now:
		//
		// 	http://mabp.kiev.ua/2010/01/12/google-map-markers/
		//
		// Not sure if there is a more legit catalog of such things.
		// -------------------------------------------------------------------
		//label: label,

		icon: model.getMarkerUrl(dataSource)
	});
	
	marker.addListener('click', function() {
          infoWindow.open(map, marker);
    });
}

// Function: dumpJsonData
// Usage: $.getJSON(endpointUrl, showJsonObj);
// -------------------------------------------
// Takes the incoming JSON data from a web api call, turns it into a string
// and displays it in a div created on the fly and appened to the end of
// the container div.

function showJsonObj(jsonObj, textstatus) {
	var div = $("<div>");
	$(div).attr("id", "raw-data");
	$(div).css({
		"color": "white",
		"background-color": "gray",
		"overflow": "scroll",
		"width": "100%",
		"height": "200px"
	});
	$(".container").append(div);

	$(div).text(JSON.stringify(jsonObj));
}

// Function: loadPlace
// Usage: var map = loadPlace(model);
// ---------------------------------------------
// Fetch and render a google background map for the current place
// of interest known to the model.
//
// The map object is returned for subsequent map api calls
// for rendering markers, etc.

function loadMap(model) {
	console.log("loadMap");
	var place = model.getPlace();

	// Sanity check the place before we go any farther.

	if (!model.isKnownPlace(place)) {
		console.log("cLoadPlace: Error: Unknown place: ", place);
		return;
	}

	// Fetch the lat/lng of the center of the map.

	var geoCoord = model.getPlaceCoord(place);
	console.log("loadMap: geoCoord:", geoCoord);
	var center = new google.maps.LatLng(geoCoord.lat, geoCoord.lng);
	if (center === undefined) {
		console.log("loadMap: Error: Google maps api probably not getting loaded properly :-/");
		return;
	}

	// Dynamically generate a container for our map and anchor
	// it off a static html element already in the DOM.

	var mapDiv = vMakeMapDiv(place);
	var parentDiv = $(".map-container");
	$(parentDiv).empty();
	$(parentDiv).append(mapDiv);
	// For some reason, I'm having to resort to direct DOM methods
	// to get an element id that google maps is happy about.
	//
	// TODO: Fix this after higer priorities are resolved.
	var mapDomNode = document.getElementById(model.getMapHtmlId(place));

	// Load up some visualization settings for the map.
	// Zoom level comes from the model.

	var mapOptions = {
		zoom: model.getMapZoom(place),
		center: center
	};
	console.log(mapOptions);

	// Fetch and render the map with our div.

	var map = new google.maps.Map(mapDomNode, mapOptions);

	// Persist the map in the model so it can be easily referenced
	// from callbacks (e.g., that reset the zoom level).

	model.setMap(map);

	// Pass the map back to the caller.  It'll get used
	// by other parts of the app as a backdrop
	// (e.g., for location-specific marker data).

	return map;
}

function getCoordinates(address) {
	console.log("getCoordinates: address", address);
	var coordinates;
	geocoder.geocode({address: address}, function(results, stats) {
		console.log(typeof results);
		console.log(results);
		if (results) {
			coordinates = results[0].geometry.location;
		} else {
			console.log("getCoordinates: null results for this address: ", address);
		}
	});
	console.log(coordinates);
	return coordinates;
}

//---------------------------------------------------------------------------
// View Functions
//---------------------------------------------------------------------------

// Function: vInit
// Usage: vInit(model);
// --------------------
// Initializes the view / presentation layer with data from the model.
// Model data may include default settings in model.js as well as
// data from persistent storage.

function vInit(model) {
	console.log("vInit");
	vUpdateTitle(model.getAppName());
	vUpdateBackgroundImage(model.getBackgroundUrl(), model.getBackgroundImagePosition());
	$("#jumbotron-place").html(model.getAppName());
}

// Function: vMakeMapDiv
// Usage: var mapDiv = vMakeMapDiv(place);
// ---------------------------------------
// Constructs a div suitable for holding a map.  The div is given a unique
// id based upon the place string.
//
// e.g.  <div id="austin" class="map"></div>

function vMakeMapDiv(place) {
	var div = $("<div>");
	$(div).attr("id", model.getMapHtmlId(place));
	$(div).attr("class", model.getMapHtmlClass());
	return div;
}

// Function: vUpdateBackgroundImage
// Usage: vUpdateBackgroundImage(model.getBackgroundUrl(), model.getBackgroundImagePosition());
// --------------------------------------------------------------------------------------------
// Updats the background image from the specified url.

function vUpdateBackgroundImage(backgroundUrl, position) {
	$(".jumbotron").css("background-image", "url(" + backgroundUrl + ")");
	$(".jumbotron").css("background-position", position);
}

// Function: vUpdateTile
// Usage: vUpdateTitle(model.getAppName());
// ----------------------------------------
// Updates the view title from the model.

function vUpdateTitle(nameStr) {
	$("title").html(nameStr);
}

// Function: vMapSource
// Usage: vMapSources();
// ---------------------
// Provide provenance for data on display through the map's caption line.

function vMapSource(model, dataSource) {

	//Add content to text area.
	var place = model.getPlace();
	var url = model.getEndpointUrl(place, dataSource).replace(/$$app_toke*$/,'').replace(/&api_key*$/,'');
	vMapCaption(url);
}

// Function: vMapCaption
// Usage: vMapCaption("2015 Traffic Fatalities");
// ----------------------------------------------
// Populates the caption area below the map with a string.

function vMapCaption(str) {

	$("#map-status").remove();

	// Define text area.
	var textArea = $("<span>");
	$(textArea).attr("id", "map-status");

	// Make text area read-only. Add it to the div.
	$(textArea).attr('readonly','readonly');

	$(".map-container").append(textArea);

	//Add content to text area.
	$(textArea).html(str);
}

