//---------------------------------------------------------------------------
// File: normalizeData2File.js
//
// Usage: node normalizeData2File.js output.json austin trafficFatalities2015
//
// Description:
//
// This file accepts as arguments an output file, a location known to the
// model, and a data source known to the location and produces a file of
// normalized and stringified json records for the associated data endpoint.
// The output file should be suitable for bulk-loading a relational database.
//---------------------------------------------------------------------------

var fs = require('fs');
var model = require('../model.js');
var request = require('request');
var util = require('util');

var outputFile = process.argv[2];
var baseUtilName = process.argv[1].split('/').pop();

if (!outputFile) {
	console.log("Usage:   node ", baseUtilName, "filename   ", "place ", "data-source");
	console.log("Example: node ", baseUtilName, "output.json", "austin", "trafficFatalities2015");
} else {
	var place = process.argv[3];
	var dataSource = process.argv[4];

	initModel(model, place, dataSource);
	writeNormalizedJSON(model, outputFile);
}

// Function: normalizeData
// Usage: var normalizedData = normalizeData(rawData, model, "trafficFatalities2015");
// -----------------------------------------------------------------------------------
// Normalizes one record of input data from a given data source into a flat
// structure that can be directly injected into a relational database.

function normalizeData(rawData, model, dataSource) {
	var result = rawData;

	// For starters, just normalize 2015 traffic data.
	// We'll generalize later.
	//
	// All fields will pass through from raw to normalized except 
	// those involving nested objects in the input schema.
	// These will be unnested for easier population in a relational
	// database.
	//
	// Basically we're gonna flatten this part of the input schema:
	//
	// 		"location_1": {             
	//			"type": "Point",
	//			"coordinates": [
	//				30.32067,
	//				-97.715944
	//			]
	//		}
	//
	// into this:
	//
	// 		"location_lat": 30.32067,
	// 		"location_lng": -97.715944
	//
	// plus add a couple presentation properties relating to pin marker text.
	//
	//		"marker_title" = "9700 blk E Hwy 290 WB Svrd, MV/ROR, Motor Vehicle, 2015-11-03, Tues, 0:04"
	//		"marker_label" = "";  // Might be "F" for fatality, for example.

	if (dataSource === "trafficFatalities2015" || dataSource === "trafficFatalities2016") {
		var normalizedSchema = {
		    "case_number": "",
		    "case_status": "",
		    "charge": "",
		    "date": "",
		    "day": "",
		    "dl_status_incident": "",
		    "fatal_crash": "",
		    "hour": "",
		    "impaired_type": "",
		    "killed_driver_pass": "",
		    "location": "",
		    "month": "",
		    "of_fatalities": "",
		    "ran_red_light": "",
		    "related": "",
		    "restraint_helmet": "",
		    "sector": "",
		    "speeding": "",
		    "time": "",
		    "type": "",
		    "type_of_road": ""
		};
		var normalizedData = {};
		for (var key in normalizedSchema) {
			normalizedData[key] = rawData[key];
		}
		normalizedData.location_lat = model.getLat(rawData, dataSource);
		normalizedData.location_lng = model.getLng(rawData, dataSource);
		normalizedData.marker_title = model.getMarkerTitle(rawData, dataSource);
		normalizedData.marker_label = model.getMarkerLabel(rawData, dataSource);

		// If we hit an atypical record, flush it rather than attempt
		// to wedge it into the output stream.

		result = (normalizedData.location_lat) ? normalizedData : undefined;
	}
	return result;
}

function initModel(model, place, dataSource) {
	model.init(place);
	model.setDataSource(dataSource);
}

// Function: writeNormalizedJSON
// Usage: var rawJSON = writeNormalizedJSON(model);
// ------------------------------------------------
// Reads json data from a the current data source in the model
// into an object.

function writeNormalizedJSON(model, outputFile) {
	console.log("writeNormalizedJSON");
	var place = model.getPlace();
	var dataSource = model.getDataSource();
	var dataSourceUrl = model.getEndpointUrl(place, dataSource);
	if (!dataSourceUrl) {
		console.log("writeNormalizedJSON: endpoint url is null for place: " + place + " and dataSource: " + dataSource);
		return false;
	}

	request(dataSourceUrl, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var bodyObj = JSON.parse(body); // string -> array of objects
			fs.writeFile(outputFile, '', function(){});
			fs.appendFileSync(outputFile, "[");

			var normalizedObj;
			var wroteOne = false;
			for (var i = 0; i < bodyObj.length; i++) {
				// Normalize and append json to output file, object by object.
				normalizedObj = normalizeData(bodyObj[i], model, dataSource);
				if (normalizedObj) {

						// Avoid appending trailing comma to last record in file
						// otherwise strignified json will not be well-formed and
						// bulk import into relational db will likely fail.

						if (wroteOne) {
							fs.appendFileSync(outputFile, ",");
						}
						fs.appendFileSync(outputFile, JSON.stringify(normalizedObj));
						wroteOne = true;
				}
			}
			fs.appendFileSync(outputFile, "]");
			console.log("Done: ", process.cwd() + "/" + outputFile)
		} else {
			console.log("writeNormalizedJSON: Error: Bad status (" + response.statusCode + ") from ", dataSourceUrl);
		}
	});
}


