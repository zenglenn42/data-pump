//---------------------------------------------------------------------------
// File: model.js
//
// This file contains the model for the application.  It defines
// attributes that reflect the current state of the app plus
// exports methods for changing that state in an orderly way.
//---------------------------------------------------------------------------

var model = {
	// model attributes
	mapAPI: {
		geocode: {
			description: 'Google Geocoding API', // Turns street address -> lat/lng.
			queryUrl: "https://maps.googleapis.com/maps/api/geocode/json?",
			apiKeyName: "&key",
			apiKey: "AIzaSyD4-iShS_FXpTaYoz6LjgU7Yosbu_cxjsU"
		}
	},
	defaultMarkerUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
	defaultAppName: "data-pump",
	places: {
		austin: {
			//appName: "data-pump",
			backgroundUrl: "./img/data-rig-900x338.jpg",
			backgroundImagePosition: "top center",
			location: {
          		lat: 30.27504,
          		lng: -97.73855469999999,
				city: "austin",
				state: "texas",
				stateAbbrev: "tx"
			},
			mapOptions: {
				zoom: 10 // Good for city-level visualization.
				         // Typically a number between 0 and 18
				         // https://developers.google.com/maps/documentation/javascript/maxzoom
			},
			dataSources: {
				// For a directory of open data portals for the City of Austin,
				// see: https://data.austintexas.gov/browse

				trafficFatalities2015: {
					description: "2015 Austin Traffic Fatalities",
					queryUrl: "https://data.austintexas.gov/resource/i3kd-c47g.json?",
					apiKeyName: "$$app_token",
					apiKey: "g9GkfcLndwliKunxNyYve0Nnv",
					// Normalize the fetching of lat/lng from schemas that vary across dataSources.
					getLat: function(entry) {return (entry.location_1) ? entry.location_1.coordinates[0] : undefined;},
					getLng: function(entry) {return (entry.location_1) ? entry.location_1.coordinates[1] : undefined;},
					getMarkerTitle: getMarkerTitleFatalAustin,
					getMarkerLabel: function() {return "";},

					// Strangely, I'm finding Google map marker documentation scarce for their
					// predefined symbols.  Found these resources using, um, Google:
					//
					// See: http://mabp.kiev.ua/2010/01/12/google-map-markers/
					// See: http://stackoverflow.com/questions/19142242/what-are-the-filenames-of-new-colored-google-maps-markers

					//markerUrl: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
					markerUrl: "http://maps.google.com/mapfiles/marker_white.png"
				},
				trafficFatalities2016: {
					description: "2016 Austin Traffic Fatalities",
					queryUrl: "https://data.austintexas.gov/resource/vn6k-4eq5.json?",
					apiKeyName: "$$app_token",
					apiKey: "g9GkfcLndwliKunxNyYve0Nnv",
					// Normalize the fetching of lat/lng from schemas that vary across dataSources.
					getLat: function(entry) {return (entry.y_coord) ? entry.y_coord : undefined;},
					getLng: function(entry) {return (entry.x_coord) ? entry.x_coord : undefined;},
					getMarkerTitle: getMarkerTitleFatalAustin,
					getMarkerLabel: function() {return "";},
					//markerUrl: "http://maps.google.com/mapfiles/marker_white.png"
					markerUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
				},
				trafficSignalsOnFlash: {
					description: "Traffic Signals on Flash",
					queryUrl: "https://data.austintexas.gov/resource/utgi-umz5.json?",
					apiKeyName: "$$app_token",
					apiKey: "g9GkfcLndwliKunxNyYve0Nnv",
					// Normalize the fetching of lat/lng from schemas that vary across dataSources.
					getLat: function(entry) {return (entry.location) ? entry.location.coordinates[1] : undefined;},
					getLng: function(entry) {return (entry.location) ? entry.location.coordinates[0] : undefined;},
					getMarkerTitle: getMarkerTitleAustinLightsOnFlash,
					getMarkerLabel: function() {return "F";},
					//markerUrl: "https://maps.google.com/mapfiles/ms/icons/orange.png"
					markerUrl: "http://maps.google.com/mapfiles/marker_orangeF.png"
				},
				austinDangerousDogs: {
					// See: https://dev.socrata.com/foundry/data.austintexas.gov/h8x4-nvyi
					description: "Austin Dangerous Dogs",
					queryUrl: "https://data.austintexas.gov/resource/h8x4-nvyi.json?",
					apiKeyName: "$$app_token",
					apiKey: "g9GkfcLndwliKunxNyYve0Nnv",
					// Normalize the fetching of lat/lng from schemas that vary across dataSources.
					getLat: function(entry) {return (entry.location) ? entry.location.coordinates[1] : undefined;},
					getLng: function(entry) {return (entry.location) ? entry.location.coordinates[0] : undefined;},
					getMarkerTitle: getMarkerTitleAustinDangerousDogs,
					getMarkerLabel: function() {return "D";},
					//markerUrl: "https://maps.google.com/mapfiles/ms/icons/blue.png"
					markerUrl: "http://maps.google.com/mapfiles/marker_brownD.png"
				},
				austinFoundPets: {
					// See: https://data.austintexas.gov/Government/Austin-Animal-Center-Found-Pets-Map/hye6-gvq2
					description: "Austin Found Pets",
					queryUrl: "https://data.austintexas.gov/resource/hye6-gvq2.json?",
					apiKeyName: "$$app_token",
					apiKey: "g9GkfcLndwliKunxNyYve0Nnv",
					// Normalize the fetching of lat/lng from schemas that vary across dataSources.
					getLat: function(entry) {return (entry.location) ? entry.location.latitude : undefined;},
					getLng: function(entry) {return (entry.location) ? entry.location.longitude : undefined;},
					getMarkerTitle: getMarkerTitleAustinFoundPets,
					getMarkerLabel: function() {return "";},
					markerUrl: "http://maps.google.com/mapfiles/marker_purple.png"
				}

				// Requires geocoding of street address.  See version 2.0 :-)
				//crimeData: {
				//	description: "APD Incident Data",
				//	queryUrl: "https://data.austintexas.gov/resource/rkrg-9tez.json",
				//	apiKeyName: "",
				//	apiKey: "",
				//	getLat: function(entry) {console.log("model.places.austin.dataSources.crimeData.getLat: FIX ME")},
				//	getLng: function(entry) {console.log("model.places.austin.dataSources.crimeData.getLng: FIX ME")},
				//	getMarkerTitle: function(entry) {
				//		return "model.places.austin.dataSources.crimeData: FIXME";
				//	},
				//	markerUrl: "https://maps.google.com/mapfiles/ms/icons/black-dot.png"
				//}
			}
		},
        connecticut: { // Connecticut school districts: http://jsfiddle.net/chrismetcalf/8m2Cs/
			//appName: "Connected Connecticut",
			backgroundUrl: "http://img.ev.mu/images/attractions/6917/960x384/780276.jpg",
			//backgroundUrl: "http://media.istockphoto.com/photos/hartford-connecticut-skyline-picture-id478718780?k=6&m=478718780&s=170667a&w=0&h=Xbc1o9FiTBHr_IzEc0pfez94qgX3mC54RH5-x0g7SbI=",
			backgroundImagePosition: "center",
			location: {
				lat: 41.7656874, 
				lng: -72.680087,
				city: "",
				state: "connecticut",
				stateAbbrev: "ct"
			},
			mapOptions: {
				zoom: 8		// Good state-level visualization.
			},
			dataSources: {
				schoolDistricts: {
					description: "School Districs of Connecticut",
					queryUrl: "https://data.ct.gov/resource/9k2y-kqxn.json?organization_type=Public%20School%20Districts&$$app_token=CGxaHQoQlgQSev4zyUh5aR5J3",
					apiKeyName: "",
					apiKey: "",
					getLat: function(entry) {return (entry.location_1) ? entry.location_1.latitude : undefined;},
					getLng: function(entry) {return (entry.location_1) ? entry.location_1.longitude : undefined;},
					getMarkerTitle: function(entry) {
						var title = entry.name; // This corresponds to the School District name.
						return title;
					},
					markerUrl: "https://maps.google.com/mapfiles/ms/icons/purple-dot.png"
				}
			}
		}
	},
	dynamic: {
		place: "",		// currently selected place
		dataSource: "",		// currently selected data source
		map: undefined,		// current canvas map
		knownDataSources: [],	// dataSources known to the mode of a given place
		knownPlaces: []		// places known to the model
	},

	// model methods
	filterAddress: filterAddress,
	getAppName: getAppName,
	getCity: getCity,
	getBackgroundUrl: getBackgroundUrl,
	getBackgroundImagePosition: getBackgroundImagePosition,
	getDataSourceDescription: getDataSourceDescription,
	getDataSourceFromDescription: getDataSourceFromDescription,
	getDataSource: getDataSource,
	getDataSources: getDataSources,
	getEndpointUrl: getEndpointUrl,
	getEndpointUrlFromSelector: getEndpointUrlFromSelector,
	getFullAddress: getFullAddress,
	getGeocodeEndpoint: getGeocodeEndpoint,
	getKnownDataSources: getKnownDataSources,
	getKnownPlaces: getKnownPlaces,
	getLat: getLat,
	getLng: getLng,
	getMapHtmlClass: getMapHtmlClass,
	getMapHtmlId: getMapHtmlId,
	getMarkerLabel: getMarkerLabel,
	getMarkerTitle: getMarkerTitle,
	getMarkerTitleFatalAustin: getMarkerTitleFatalAustin,
	getMapZoom: getMapZoom,
	getMarkerUrl: getMarkerUrl,
	getMap: getMap,
	getPlace: getPlace,
	getPlaceCoord: getPlaceCoord,
	getState: getState,
	getStateAbbrev: getStateAbbrev,
	init: init,
	isKnownDataSource: isKnownDataSource,
	isKnownPlace: isKnownPlace,
	resetMap: resetMap,
	setDataSource: setDataSource,
	setKnownDataSources: setKnownDataSources,
	setKnownPlaces: setKnownPlaces,
	setMap: setMap,
	setPlace: setPlace,
	unitTests: unitTests
};

// Function: filterAddress
// Usage: var betterAddress = filterAddress(rawStreeAddress);
// ----------------------------------------------------------
// Returns a street addressed which has been stripped of unhelpful
// (to Google Maps Geocode API) strings, like "NB" for north bound.
// This is terminology that law enforcement understands, but
// confuses the geocode API to the point that it aliases the
// street address to simply the city in which the street resides.
//
// TODO: We may want to configure this as a callback for a particular
//       data source rather than applying it to all addresses.

function filterAddress(rawAddress) {
	console.log("model.filterAddress");
	var result;
	if (rawAddress) {
		// filter out _NB_
		// filter out _NB<end-of-string>
		// filter out Svrd (service rd).
		result = rawAddress.replace(/\s[NSEW]B[\s$]/, ' ').replace(/\s[NSEW]B$/, '').replace(/\sSvrd/, '');
	} else {
		console.log("model.rawAddress: Warning: Encountered empty input parameter. :-/");
	}
	return result;
}

// Function: getAppName
// Usage: var name = getAppName();
// -------------------------------
// Returns the appName attribute associated with the model.
//
// If this isn't returning something meaningful, then it's likely
// model.init(place) or model.setPlace(place) were never called
// successfully.

function getAppName() {
	console.log("model.getAppName");

	var result = this.defaultAppName;
	var place = this.getPlace();
	if (place) {
		if (this.places[place].appName) {
			result = this.places[place].appName;
		}
	}
	return result;
}

// Function: getBackgroundUrl
// Usage: var url = model.getBackgroundUrl();
// ------------------------------------------
// Returns the background image url associated with the current
// place of interest known to the model.
//
// Requires that model.init(place) or model.setPlace(place) has been
// called previously.

function getBackgroundUrl() {
	console.log("model.getBackgroundUrl");

	var place = this.getPlace();
	var result;
	if (place) {
		result = this.places[place].backgroundUrl;
	} else {
		console.log("model.getBackgroundUrl: Error.  Unknown place.");
		console.log("Can't return the background image url for a place I don't know about.");
	}
	return result;
}

// Function: getBackgroundImagePosition
// Usage: var positionVal = model.getBackgroundImagePosition();
// ------------------------------------------------------------
// Returns the background image positioning hint for the current
// place of interest known to the model.
//
// Requires that model.init(place) or model.setPlace(place) has been
// called previously.

function getBackgroundImagePosition() {
	console.log("model.getBackgroundImagePosition");

	var place = this.getPlace();
	var result;
	if (place) {
		result = this.places[place].backgroundImagePosition;
	} else {
		console.log("model.getBackgroundImagePosition: Error.  Unknown place.");
		console.log("Can't return the background image position for a place I don't know about.");
	}
	return result;
}

// Function: getCity
// Usage: var place = "austin"; // This may or may not be a city
//                              // It's basically a key under model.places
//        var cityStr = model.getCity(place);
// ---------------------------------------------------------------------
// Returns the city as a string associated with a given place.
//
// This might be a useful token to then combine with a street address that
// is missing city information.

function getCity(place) {
	console.log("model.getCity");
	var result;

	if (!this.places[place]) {
		console.log("model.getCity: Invalid place: ", place);
	}
	else {
		result = this.places[place].location.city;
		if (!result) {
			console.log("model.getCity: WARNING: No city value currently defined for place: ", place);
		}
	}
	return result;
}

// Function: getDataSourceDescription
// Usage: var str = getDataSourceDescription("trafficFatalities2016");
// -------------------------------------------------------------------
// Returns a nice human-relatable description of the data source.

function getDataSourceDescription(dataSource) {
	console.log("getDataSourceDescription");
	var result = this.places[this.getPlace()].dataSources[dataSource].description;	
	if (!result) {
		result = "No description for data source  " + dataSource;
		console.log("model.getDataSourceDescription: Error missing description for dataSource: ", dataSource);
	}
	return result;
}

// Function: getDataSourceFromDescription
// Usage: var desc = "2016 Austin Traffic Fatalities";
//        var dataSource = getDataSourceFromDescription(desc, "austin");
//        and dataSource == "trafficFatalities2016"
// -------------------------------------------------------------------
// This method performs a reverse lookup of a dataSource based upon its description
// and place.  This will be handy for our dropdown-selection button which is
// programmed with descriptive text, but needs to map to a specific data source.
//
// TODO: Would be better to have proper error handling than all these console logs.
//       Will be learning about try/catch soon.

function getDataSourceFromDescription(desc, aPlace) {
	console.log("getDataSourceFromDescription");
	var result;
	var place = aPlace;

	// Validate input.
	if (!place) {
		place = this.getPlace();
	}
	if (!desc || !place) {
		console.log("model.getDataSourceFromDescription: Error: input desc and/or input place are not defined.  Punting.");
		return result;
	}
	if (!this.isKnownPlace(place)) {
		console.log("model.getDataSourceFromDescription: Error: Unable to lookup data sources for unknown place:", place);
		return result;
	}
	if (typeof desc !== "string") {
		console.log("model.getDataSourceFromDescription: Error: Expecting typeof 'string' for desc argument:", desc, "Got ", typeof desc);
		return result;
	}

	// Locate the dataSources in the model for this place.
	var dataSources = this.places[place].dataSources;
	if (!dataSources) {
		console.log("model.getDataSourceFromDescription: Warning: dataSources is undefined for place:", place);
		return result;
	}

	// Iterate over the dataSources looking for one matching the description string we passed in.
	for (var dataSource in dataSources) {
		console.log("dataSource", dataSource);
		console.log("desc", desc);
		console.log("dataSource.description", dataSources[dataSource].description);
		if (desc === dataSources[dataSource].description) {
			result = dataSource;
			console.log("model.getDataSourceFromDescription: Found match:", place, result);
			break;
		}
	} 
	if (!result) {
		console.log("model.getDataSourceFromDescription: Warning: No mataching dataSource with description:" + desc + " for place", place);
	} else {
		console.log("model.getDataSourceFromDescription: dataSource:", result);
	}
	return result;
}

// Function: getDataSource
// Usage: var currDataSource = getDataSource();
// --------------------------------------------
// Returns currently selected data source.
//
// TODO: In the fullness of time, this will evolve to support multiple
//       active data sources so map markers from different endpoints
//       may occupy the same map.

function getDataSource() {
	console.log("model.getDataSource");
	var result;

	if (this.dynamic.dataSource) {
		result = this.dynamic.dataSource;
	} else {
		console.log("model.getDataSource: Warning, returning undefined dataSource");
	}
	return result;
}

// Function: getDataSources
// Usage var arrayDataSources = model.getDataSources("austin");
// ------------------------------------------------------------
// Returns an array of data source names for a given given location
// known to the model.  Different cities may have differnt queryable endpoints.
// This method tells you what those endpoints are.
//
// You can iterate over the list of data sources, passing each to 
// model.getEndpointUrl() to fetch the corresponding endpoint url for
// that data source.  Then you're just an ajax call away from getting data.

function getDataSources(place) {
	var result = [];
	console.log("model.getDataSources");

	if (!this.places[place]) {
		console.log("model.getDataSources: Invalid place: ", place);
	}
	else {

		// Iterate over the list of known data sources for this place
		// and push them to the results array.

		for (var dataSource in this.places[place].dataSources) {
			result.push(dataSource);
		}
	}
	return result;
}

// Function: getEndpointUrl
// Usage: var url = getEndpointUrl("austin", "crimeData");
// -------------------------------------------------------
// This method retuns an endpoint url suitable for an AJAX call to a server
// to fetch data.  An optional 3rd parameter may be passed in if
// additional query parameters need to be wedged in between the
// query url and the key.

function getEndpointUrl(place, dataSource, paramStr) {
	console.log("model.getEndpointUrl");
	var result;

	if (!this.places[place]) {
		console.log("model.getEndpointUrl: Invalid place: ", place);
	}
	else {
		var selector = this.places[place].dataSources[dataSource];
		result = this.getEndpointUrlFromSelector(selector, paramStr);
	}
	return result;
}

// Function: getEndpointUrlFromSelector
// Usage: var url = getEndpointUrlFromSelector(model.places["austin"].dataSources["crimeData"]);
// ------------------------------------------------------------------------------------------
// The data for building an endpoint url from our model can come from multiple
// places.  So this methods provides a generic way to address into a given
// part of the object model and construct and url from the data it finds at that
// node in the model.

function getEndpointUrlFromSelector(selector, paramStr) {
	console.log("model.getEndpointUrlFromSelector");
	var result;

	if (!selector) {
		console.log("model.getEndpointUrlFromSelector: Invalid selector: ", selector);
	} else {
		var queryUrl = selector.queryUrl;
		var apiKeyName = selector.apiKeyName;
		var apiKey = selector.apiKey;
		var apiToken = "";

		// Build a non-null apiToken to append to the query url if one is required for this
		// data source.

		if (apiKeyName && apiKey) {
			apiToken = apiKeyName + "=" + apiKey;
		}
		if (paramStr) {
			paramStr = paramStr.replace(/ /g, "+");
			result = queryUrl + paramStr + apiToken;
		} else {
			result = queryUrl + apiToken;
		}
	}
	console.log("model.getEndpointUrlFromSelector: result: ", result);
	return result;
}

// Function: getGetFullAddress
// Usage: var address = getFullAddress("austin", "2400 BLOCK E RIVERSIDE DR");
// Returns: "2400 BLOCK E RIVERSIDE DR, austin, tx"
//
// TODO: Would be nice to have zipcode, but google gecoding is probably smart
//       enough to resolve without.
// --------------------------------------------------------------------------------
// Returns the full(-ish) street address associated with a known place in
// our object model.
//
// This could become input to a geocoding method that returns lat/lng for that address.

function getFullAddress(place, streetAddress) {
	console.log("model.getFullAddress");
	var result;

	if (!this.places[place]) {
		console.log("model.getFullAddress: Invalid place: ", place);
	} else {
		// Strip off north bound (NB) tokens that confuse geocode api.
		result = filterAddress(streetAddress);

		// Only append city and state if filtered street address
		// is sane.  Generally it is better to return an undefined
		// address in this case as opposed to:
		//
		//    "undefined,austin,tx"
		//
		// The caller is confused into think he has something non-trivial
		// to pass to the geocoding API.

		if (result) {
			var city = this.getCity(place);
			if (city) {
				result += "," + city;
			}
			var state = this.getState(place);
			if (state) {
				result += "," + state;
			}
		}
	}
	return result;
}

// Function: getGeocodeEndpoint
// Usage: var geocodeEndpoint = model.getGeocodeEndpoint("austin", "7500 BLOCK DELAFIELD LN");
// --------------------------------------------------------------------------------------
// Returns a queryUrl loaded up with encoded street address and apikey,
// ready for an AJAX call to Google's geocoding service.
//
// This is useful when we want to call the Google webapi to transform
// a street address into a latitude and longitude pair.

function getGeocodeEndpoint(place, streetAddress) {
	var result;
	console.log("model.getGeocodeEndpoint");
	var fullStreetAddress = this.getFullAddress(place, streetAddress);
	result = this.getEndpointUrlFromSelector(this.mapAPI.geocode, "address=" + fullStreetAddress);
	console.log("model.getGeocodeEndpoint:", result);

	return result;
}

// Function: getKnownDataSources
// Usage: var arrayDataSources = model.getKnownDataSources();
// ----------------------------------------------------------
// Returns a sorted array of places known to the model.

function getKnownDataSources(aPlace) {
	console.log("model.getKnownDataSources");
	var place = aPlace;
	console.log("model.getKnownDataSources place:", place);
	if (!place) {
		place = this.getPlace();
		if (!place) {
			console.log("model.getKnownDataSources: Error: Can't find data source when place is unset.");
			return undefined;
		}
	} 
	if (!isKnownPlace(place)) {
		console.log("model.getKnownDataSources: Don't know about any data sources for place:", place);
		console.log("Guessing model.init(place) or model.setPlace(place) didn't get called.");
	}
	return this.dynamic.knownDataSources;
}

// Function: getKnownPlaces
// Usage: var arrayPlaces = model.getKnownPlaces();
// ------------------------------------------------
// Returns an sorted array of places known to the model.

function getKnownPlaces() {
	console.log("model.getKnownPlaces");
	if (!this.dynamic.knownPlaces) {
		console.log("model.getKnownPlaces: Don't know about any places :-/");
		console.log("Guessing model.init(place) didn't get called.");
	}
	return this.dynamic.knownPlaces;
}

// Function: getLat
// Usage: var latitude = getLat(jsonEntry, "trafficFatalities2016");
// -----------------------------------------------------------------
// For a given object, return the latitude value therein according 
// to data source schema.

function getLat(entry, dataSource) {
	console.log("model.getLat");
	var place = this.getPlace();
	return this.places[place].dataSources[dataSource].getLat(entry);
}

// Function: getLng
// Usage: var longitude = getLng(jsonEntry, "trafficFatalities2016");
// -----------------------------------------------------------------
// For a given object, return the longitude value therein according 
// to data source schema.

function getLng(entry, dataSource) {
	console.log("model.getLng");
	var place = this.getPlace();
	return this.places[place].dataSources[dataSource].getLng(entry);
}

// Function: getMapHtmlClass
// Usage: var htmlClass = getMapHtmlClass();
// ---------------------------------------------------------------------
// Returns the html class for all of our map divs.

function getMapHtmlClass() {
	console.log("model.getMapHtmlClass");

	var result = "map";
	return result;
}

// Function: getMapHtmlId
// Usage: var htmlID = getMapHtmlId(place [, dataSource]);
// ---------------------------------------------------------------------
// Returns the html map id corresponding to the place of interest
// and an optional data source.  Specifying the data source
// would allow you to have separate div ids for a map of crime data
// versus a map of traffic data.
//
// Excluding the dataSource would mean two or more data sources could
// be sharing the same map div (i.e., data from both sources on the
// same map).

function getMapHtmlId(place, dataSource) {
	console.log("model.getMapHtmlId");

	// e.g., <div id="map-austin">
	//                ----------
	var result = "map" + "-" + place;

	// Append optional dataSource if it is truthy. :-)
	if (dataSource) {
		// e.g., <div id="map-austin-crimeData">
		//                --------------------
		result += "-" + dataSource;
	}
	return result;
}

// Function: getMarkerLabel
// Usage: var label = getMarkerLabel(jsonEntry, "trafficFatalities2016");
// -------------------------------------------------------------------------
// For a given object, return the marker character label to render on
// the Google map marker.
//
// For example, if someone is viewing the Austin Dangerous Dogs data
// then the pin marker will have a "D" on it.  At some point, we'll be
// have pin markers from different data sources on the same map and it would
// be good to have an easy way to distinguish on marker from another
// beyond having a good map legend.

function getMarkerLabel(entry, dataSource) {
	console.log("model.getMarkerLabel");
	var place = this.getPlace();
	// NB: I'm leaving entry as a parameter because some day, we may
	//     want entry-specific markers to distinguish pitbull from poodle
	//     for example.
	return this.places[place].dataSources[dataSource].getMarkerLabel(entry);
}

// Function: getMarkerTitle
// Usage: var latitude = getMarkerTitle(jsonEntry, "trafficFatalities2016");
// -------------------------------------------------------------------------
// For a given object, return the hover-over 'title' text to associate with
// the Google map marker.
//
// For example, if someone is viewing the Austin Traffic Fatalities data
// and they hover over a marker on the map, some salient details about
// that fatality will momentarily appear.
//
// This routine returns the text that one would see when hovering over a 
// marker.  
//
// TODO:
// Huh, i'm just realizing this is not really a mobile friendly
// play since the notion of hover doesn't not apply there.

function getMarkerTitle(entry, dataSource) {
	console.log("model.getMarkerTitle");
	var place = this.getPlace();
	return this.places[place].dataSources[dataSource].getMarkerTitle(entry);
}

// Function: getMarkerTitleFatalAustin
// Usage: var markerText = getMarkerTitleFatalAustin(jsonEntry);
// -------------------------------------------------------------
// Returns hover-over 'title' text to associate with the Google map marker
// for Austin Traffic Fatality endpoints.
//
// Typical marker text might look like:
//
// "6800 Blk Southwest Pkwy, MV/MC, Motorcycle, Pending, 2016-09-19, Mon, 17:45"
//
// ... meaning a fatal accident involving a car and motorcycle happened on
//     September 19th at 5:45pm.  Charges are pending.
//
// Sometimes the 'charges' field is empty and is therefore removed from the
// hover text.

function getMarkerTitleFatalAustin(entry) {
	console.log("model.getMarkerTitleFataAustin");
	var date = entry.date.replace(/T00:00:00.000/, '');
	var title;
	if (entry.charge.toLowerCase() == "n/a") {
		title = [ entry.location, entry.related, entry.type, date, entry.day, entry.time].join(", ");
	} else {
		title = [ entry.location, entry.related, entry.type, entry.charge, date, entry.day, entry.time].join(", ");
	}
	return title;
}

// Function: getMarkerTitleAustinLightsOnFlash
// Usage: var markerText = getMarkerTitleAustinLightsOnFlash(jsonEntry);
// ---------------------------------------------------------------------
// Returns hover-over 'title' text to associate with the Google map marker
// for Austin Traffic Lights On Flash endpoint.
//
// Typical marker text might look like:
//
// "E 15TH ST / BRAZOS ST, 2016-11-24 07:15:09"
//
// ... meaning signal light is flashing on E 15th at the cross street
//     of Brazos as of 7:15am on November 24, 2016.

function getMarkerTitleAustinLightsOnFlash(entry) {
	console.log("model.getMarkerTitleAustinLightsOnFlash");
	var date = entry.processed_datetime.replace(/T/, ' ');
	var location = entry.location_name;
	var title = [location, date].join(", ");
	return title;
}

// Function: getMarkerTitleAustinDangerousDogs
// Usage: var markerText = getMarkerTitleAustinDangerousDogs(jsonEntry);
// ---------------------------------------------------------------------
// Returns hover-over 'title' text to associate with the Google map marker
// for Austin Dangerous Dogs endpoint.
//
// Typical marker text might look like:
//
// "E 15TH ST / BRAZOS ST, 2016-11-24 07:15:09"
//
// ... meaning signal light is flashing on E 15th at the cross street
//     of Brazos as of 7:15am on November 24, 2016.

function getMarkerTitleAustinDangerousDogs(entry) {
	console.log("model.getMarkerTitleAustinDangerousDogs");
	var address = entry.address;
	var ownerName = "Owner: " + entry.first_name + " " + entry.last_name;
	var dogDesc = entry.description_of_dog;
	var title = [address, ownerName, dogDesc].join(", ");
	return title;
}

// Function: getMarkerTitleAustinFoundPets
// Usage: var markerText = getMarkerTitleAustinFoundPets(jsonEntry);
// ---------------------------------------------------------------------
// Returns hover-over 'title' text to associate with the Google map marker
// for Austin Found Pets endpoint.
//
// Typical marker text might look like:
//
// "A738864, Dog, German Shepard Mix, Intake date: 11/22/2016, Image link ..."

function getMarkerTitleAustinFoundPets(entry) {
	console.log("model.getMarkerTitleAustinFoundPets");
	var animalId = entry.animal_id;
	var animalType = entry.type;
	var looksLike = entry.looks_like;
	var intakeDate = entry.intake_date.replace(/T00:00:00/, '');
	var imageUrl = "<a href=" + entry.image.url + " target=" + '"_blank"' + "><h3>Image</h3></a>";
	//var imageUrl = entry.image.url;
	var sex = entry.sex;
	var age = entry.age;
	var title = [animalId, animalType, looksLike, intakeDate].join(", ");
	title += " " + imageUrl;
	return title;
}

// Function: getMapZoom
// Usage: var mapZoom = getMapZoom(place);
// ---------------------------------------------------------------------
// Returns the google map options associated with a place known to
// the model.

function getMapZoom(place) {
	console.log("model.getMapZoom");

	var result = this.places[place].mapOptions.zoom;
	if (!result) {
		console.log("model.getMapZoom: Unknown place:", place);
	}
	return result;
}

// Function: getMarkerUrl
// Usage: var markerUrl = getMarkerUrl("trafficFatalities2016");
// -------------------------------------------------------------------
// Returns the Google maps marker icon url to use for a given data source.
//
// e.g., http://maps.google.com/mapfiles/ms/icons/blue-dot.png

function getMarkerUrl(dataSource) {
	console.log("getMarkerUrl");
	var result = this.places[this.getPlace()].dataSources[dataSource].markerUrl;	
	if (!result) {
		console.log("No marker url for this data source  " + dataSource);
		console.log("Will use default marker:", this.defaultMarkerUrl);
		result = this.defaultMarkerUrl;
	}
	return result;
}

// Function: getMap
// Usage: var map = getMap();
// ---------------------------------
// Returns the map currently on display.
//
// This is typically configured at the beginning of the app with a call to
// model.setMap(someGoogleMap).

function getMap() {
	console.log("model.getMap");

	var result = this.dynamic.map;
	if (!result) {
		console.log("model.getMap: Warning: Returning null/undefined map.");
		console.log("Do you need to run model.setMap(map) first?");
	}
	return result;
}

// Function: getPlace
// Usage: var placeKey = getPlace();
// ---------------------------------
// Returns the key for the current place of interested known to the model.
//
// This is typically configured at the beginning of the app with a call to
// model.init(place) or during the application with model.setPlace(place).

function getPlace() {
	console.log("model.getPlace");

	var result = this.dynamic.place;
	if (!result) {
		console.log("model.getPlace: Warning: Returning null/undefined place.");
		console.log("Do you need to run model.init(place) or model.setPlace(place)?");
	}
	return result;
}

// Function: getPlaceCoord
// Usage: var coord = getPlaceCoord(place);
// ---------------------------------------------------------------------
// Returns an object containing the latitude and longitude of
// the named place.  Othewise returns undefined if the place is unknown
// to the model.

function getPlaceCoord(place) {
	console.log("model.getPlaceCoord");

	var result = this.places[place].location;
	if (!result) {
		console.log("model.getPlaceCoord: Unknown place:", place);
	}
	return result;
}

// Function: getState
// Usage: var stateStr = model.getState("austin"); // returns "texas"
//        var stateAbbrevStr = model.getState("austin", true); // returns "tx"
// ---------------------------------------------------------------------------
// Returns the state as a string associated with a given place.
// Place must be a valid key within model.places, otherwise undefined is
// returned and an error is console logged.
//
// User may specify the string to be optionally abbreviated down to a
// two-character string through a second boolean parameter.
//
// This might be a useful token to then combine with a street address that
// is missing state information.

function getState(place, abbreviate) {
	console.log("model.getState");
	var result;

	if (!this.places[place]) {
		console.log("model.getState: Invalid place: ", place);
	}
	else {
		if (abbreviate) {
			result = this.places[place].location.stateAbbrev;
			if (!result) {
				console.log("model.getState: WARNING: no stateAbbrev value currently defined for place: ", place);
			}
		} else {
			result = this.places[place].location.state;
			if (!result) {
				console.log("model.getState: WARNING: no state value currently defined for place: ", place);
			}
		}
	}
	return result;
}

// Function: getStateAbbrev
// Usage: var stateAbbrevStr = getStateAbbrev("austin"); // returns tx
// -------------------------------------------------------------------
// Returns a two-letter string abbreviation of the state associated with
// the place parameter.

function getStateAbbrev(place) {
	console.log("model.getStateAbbrev");
	var abbreviate = true;
	return this.getState(place, abbreviate);
}

// Function: init
// Usage: model.init(place);
// -------------------------
// Initializes the model to a known application state.  
// This includes specifying the default place of interest.
// Returns true if default place is set successfully, false otherwise.
//
// NB: Guessing that once I know more about javascript object 
//     patterns, this would just get morphed into the constructor.

function init(place) {
	console.log("model.init");
	this.setKnownPlaces();
	this.setPlace(place);
	this.setKnownDataSources(place);
	return this.setPlace(place);
}

// Function: isKnownDataSource
// Usage: if (model.isKnownDataSource("trafficFatalities2016")) ...
// --------------------------------------------------------------------
// Returns true if the input parameter corresponds to a known data source
// for the current location.

function isKnownDataSource(dataSource) {
	console.log("model.isKnownDataSource");
	console.log("model.isKnownDataSource dataSource:", dataSource);
	var knownDataSource = this.getKnownDataSources();
	var result = (knownDataSource.indexOf(dataSource) !== -1);
	if (!result) {
		console.log("model.isKnownDataSource: Warning: Don't know about:", dataSource);
	}
	return result;
}

// Function: isKnownPlace
// Usage: if (model.isKnownPlace("timbuktu")) ...
// --------------------------------------------------
// Returns true if the given string (normalized to lower case)
// matches one of the place keys known by the model.

function isKnownPlace(placeStr) {
	console.log("model.isKnownPlace placeStr:", placeStr);
	var nrmlPlaceStr = placeStr.toLowerCase();
	var knownPlaces = model.getKnownPlaces();
	console.log("model.isKnownPlace knownPlaces:", knownPlaces);
	var result = (knownPlaces.indexOf(nrmlPlaceStr) !== -1);
	if (!result) {
		console.log("model.isKnownPlace: Warning: Don't know about:", placeStr);
	}
	console.log("isKnownPlace returns", result);
	return result;
}

// Function: resetMap()
// Usage: model.resetMap();
// ----------------------------
// Centers and restores map to default zoom level.

function resetMap() {
	console.log("model.resetMap");
	var map = this.getMap();
	var place = this.getPlace();
	console.log("model.resetMap: place = ", place);

	// Reset the zoom level to the original.

	var defaultZoom = this.places[place].mapOptions.zoom;
	console.log("model.resetMap: zoom level = ", defaultZoom);
	
	// Reset the center of the map.

	map.setZoom(defaultZoom);
	var geoCoord = this.getPlaceCoord(place);
	map.panTo({lat: geoCoord.lat, lng: geoCoord.lng});
}

// Function: setDataSource
// Usage: setDataSource("trafficFatalities2016");
// ----------------------------------------------
// Uses the input argument to set the currently selected dataSource,
// provided it is a valid data source.
//
// TODO: In the fullness of time, this will evolve to support multiple
//       active data sources so map markers from different endpoints
//       may occupy the same map.

function setDataSource(dataSource) {
	console.log("model.setDataSource");

	if (isKnownDataSource(dataSource)) {
		this.dynamic.dataSource = dataSource;
	} else {
		console.log("model.setDataSource: Error, rejecting unknown dataSource argument:", dataSource);
	}
}

// Function: setKnownDataSources
// Usage: var arrayDataSources = model.setKnownDataSources();
// ----------------------------------------------------------
// Have the model introspect itself to build a convenience array of valid
// (sorted) data sources known to the model.  This could be iterated over by a
// controller to dynamically affect what the view knows how to display.
//
// e.g., create data source selection buttons on the fly, based upon place.

function setKnownDataSources(aPlace) {
	var result = [];
	var place = aPlace;

	if (!place) {
		place = this.getPlace();
	}
	if (this.isKnownPlace(place)) {
		for (var dataSource in model.places[place].dataSources) {
			result.push(dataSource);
		}
	}
	result.sort();

	// TODO: Will this leak memory if the existing array of data
	//       sources is not somehow marked for garabace collection?

	this.dynamic.knownDataSources = result;
	return result;
}

// Function: setKnownPlaces
// Usage: var arrayPlaces = model.setKnownPlaces();
// ---------------------------------------------------------------------
// Have the model introspect itself to build a convenience array of valid
// (sorted) places the model knows about.  This could be iterated over by a
// controller to dynamically affect what the view knows how to display.

function setKnownPlaces() {
	var result = [];
	for (var placeKey in model.places) {
		result.push(placeKey);
	}
	result.sort();
	this.dynamic.knownPlaces = result;
	return result;
}

// Function: setMap
// Usage: model.setMap(googleMap);
// ---------------------------------------------------------------------
// Attempts to update the model with the current google map of interest.
// This will allow references from within callbacks so things like zoom
// level can be mutated.

function setMap(googleMap) {
	console.log("model.setMap");
	this.dynamic.map = googleMap;
}

// Function: setPlace
// Usage: model.setPlace("austin");
// ---------------------------------------------------------------------
// Attempts to update the model with the current place of interest.
// Returns true if successful, false otherwise.
//
// This will dictate which data sources and application options are valid.

function setPlace(requestedPlaceStr) {
	console.log("model.setPlace");
	var result = false;

	var nrmlPlaceStr = requestedPlaceStr.toLowerCase();
	if (this.isKnownPlace(nrmlPlaceStr)) {
		this.dynamic.place = nrmlPlaceStr;

		// Update the known data sources for a given place whenever
		// place is set.

		this.setKnownDataSources(nrmlPlaceStr);

		result = true;
	} else {
		console.log("model.setPlace: Invalid place: ", requestedPlaceStr);
	}
	return result;
}

// Function: unitTests
// Usage: if (model.unitTests()) console.log("model unit tests passed");
// ---------------------------------------------------------------------
// Run unit tests for model methods.

function unitTests() {
	console.log("model.unitTests");
	var result = true;
	
	// 1.
	var coord = this.getPlaceCoord("austin");
	if (coord.lat !== 30.27504 || coord.lng !== -97.73855469999999) {
		result = false;
		console.log("model.unitTests: failed model.getPlaceCoord :-/");
	}

	// 2.
	var dataSources = this.getDataSources("austin");
	if (dataSources.length !== 4) {
		result = false;
		console.log("model.unitTests: failed model.getDataSources");
	} else {
		console.log("model.unitTests: dataSources for austin:", dataSources);
	}

	// 3.
	var url = this.getEndpointUrlFromSelector(this.mapAPI.geocode);
	if (url !== "https://maps.googleapis.com/maps/api/geocode/json?&key=AIzaSyD4-iShS_FXpTaYoz6LjgU7Yosbu_cxjsU") {
		result = false;
		console.log("model.unitTests: failed model.getEndpointUrlFromSelector: ", url);
	}

	// 4.
	url = this.getEndpointUrl("austin", "trafficFatalities2015");
	if (url !== "https://data.austintexas.gov/resource/i3kd-c47g.json?$$app_token=g9GkfcLndwliKunxNyYve0Nnv") {
		result = false;
		console.log("model.unitTests: failed getEndpointUrl: ", url);
	}

	// 5.
	var endpoint = model.getGeocodeEndpoint("austin", "7500 BLOCK DELAFIELD LN");
	if (endpoint !== "https://maps.googleapis.com/maps/api/geocode/json?address=7500+BLOCK+DELAFIELD+LN,austin,texas&key=AIzaSyD4-iShS_FXpTaYoz6LjgU7Yosbu_cxjsU") {
		result = false;
		console.log("model.unitTests: failed model.getGeocodeEndpoint: ", endpoint);
	}

	// 6.
	this.setKnownPlaces();
	var expectedPlaces = ["austin", "connecticut"];
	var actualPlaces = this.getKnownPlaces();
	if (actualPlaces.sort().join(',') !== expectedPlaces.sort().join(',')) {
		result = false;
		console.log("model.unitTests: failed setKnownPlaces");
		console.log("   expected:", expectedPlaces);
		console.log("   actual:", actualPlaces);
	}

	// 7.
	if (!this.isKnownPlace("austin") || !this.isKnownPlace("Austin")) {
		result = false;
		console.log("model.unitTests: failed isKnownPlace on Austin!");
		console.log("model.unitTests: I should totally know about Austin, yo.  Fix me.");
	}
	if (this.isKnownPlace("timbuktu")) {
		result = false;
		console.log("model.unitTests: failed isKnownPlace");
		console.log("model.unitTests: I really shouldn't know about timbuktu and yet I say I do.");
	}

	// 8.
	if (this.filterAddress("5700 blk S Mopac NB") !== "5700 blk S Mopac"       ||
		this.filterAddress("W US 290 EB to S Mopac") !== "W US 290 to S Mopac" ||
		this.filterAddress("123 EBBandFlow Drive") !== "123 EBBandFlow Drive") {
		result = false;
		console.log("model.unitTests: failed filterAddress");
	}

	// 9.
	if (this.setPlace("Austin")) {
		if (this.getPlace() !== "austin") {
			result = false;
			console.log("model.unitTests: failed setPlace/getPlace with known place.");
		}
	}
	if (this.setPlace("bogusPlace")) {
		if (this.getPlace() !== undefined || this.getPlace() !== "") {
			result = false;
			console.log("model.unitTests: failed setPlace/getPlace with bogus place.");
		}
	}

	// 10.
	this.setPlace("austin");
	if (this.getBackgroundUrl() != "http://www.alteredperspectives.us/wp-content/uploads/2011/12/DW_Austin_Skyline_Panorama-11.jpg") {
		result = false;
		console.log("model.unitTests: failed getBackgroundUrl");
	}

	// 11.
	this.setPlace("austin");
	if (this.getBackgroundImagePosition() !== "top center") {
		result = false;
		console.log("model.unitTests: failed getBackgroundImagePosition");
	}

	// 12.
	var actualDS = this.getDataSourceFromDescription("2015 Austin Traffic Fatalities", "austin");
	var expectDS = "trafficFatalities2015";
	if (actualDS !== expectDS) {
		result = false;
		console.log("model.unitTests: failed to find valid dataSource via getDataSourceFromDescription");
	} else {
		actualDS = this.getDataSourceFromDescription("Bogus Description Should Fail", "austin");
		if (actualDS) {
			result = false;
			console.log("model.unitTests: actualDS", actualDS);
			console.log("model.unitTests: failed by finding a dataSource for a bogus description via getDataSourceFromDescription");
		} else {
			result = true;
		}
	}

	// 13.
	this.setPlace("connecticut");
	this.setKnownDataSources("connecticut");
	var expectedSources = ["schoolDistricts"];
	var actualSources = this.getKnownDataSources("connecticut");
	if (actualSources.sort().join(',') !== expectedSources.sort().join(',')) {
		result = false;
		console.log("model.unitTests: failed setKnownDataSources");
		console.log("   expected:", expectedSources);
		console.log("   actual:", actualSources);
	}

	// 14.
	this.setPlace("connecticut");
	if (!this.isKnownDataSource("schoolDistricts")) {
		result = false;
		console.log("model.unitTests: failed isKnownDataSource on schoolDistricts!");
		console.log("model.unitTests: I should totally know about Connecticut schoolDistricts, yo. Fix me.");
	}
	if (this.isKnownDataSource("unicornBirths")) {
		result = false;
		console.log("model.unitTests: failed isKnownDataSource");
		console.log("model.unitTests: I really shouldn't know about unicornBirths and yet I say I do.");
	}

	return result;
}

// Uncomment this when bench-testing the model off to the side.
// console.log("Did unit tests pass?", model.unitTests());
