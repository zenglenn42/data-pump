
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

function plotLayout(dataset, variable){

    switch(variable) {
        case "weekday" : 
            var xAxis = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
            var yAxis = plotCountsV2(dataset, xAxis, "day");
            return [{x: xAxis, y: yAxis[0], type: "bar", marker: {color: "#202662", opacity: 0.6}, text: yAxis[1] }];
            break;

        case "month"   : 
            var xAxis = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var yAxis = plotCountsV2(dataset, xAxis, "month");
            return [{x: xAxis, y: yAxis[0], type: "bar", marker: {color: "#202662", opacity: 0.6}, text: yAxis[1] }];
            break;
        case "timeOfDay" : getTimeAxes(); break;
        case "type"      : 
            var xAxis = ["Pedestrian", "Motorcycle", "Motor Vehicle"];
            var yAxis = plotCountsV2(dataset, xAxis, "name");
            return [{x: xAxis, y: yAxis[0], type: "bar", marker: {color: "#202662", opacity: 0.6}, text: yAxis[1] }];
            break;
        case "numFatalities" : 
            var xAxis = ["1", "2", "3", "4", "5"];
            var yAxis = plotCountsV2(dataset, xAxis, "of_fatalities");
            return [{x: xAxis, y: yAxis[0], type: "bar", marker: {color: "#202662", opacity: 0.6}, text: yAxis[1] }];
            break;
        case "speeding" : 
            var xAxis = ["Y", "N", "suspected"];
            var yAxis = plotCountsV2(dataset, xAxis, "speeding");
            return [{x: xAxis, y: yAxis[0], type: "bar", marker: {color: "#202662", opacity: 0.6}, text: yAxis[1] }];
            break;
        case "impaired_type" : 
            var xAxis = ["DRIVER", "MC DRIVER", "PED", "PED and DRIVER", "DRIVER (pending)", "none"];
            var yAxis = plotCountsV2(dataset, xAxis, "impaired_type");
            return [{x: xAxis, y: yAxis[0], type: "bar", marker: {color: "#202662", opacity: 0.6}, text: yAxis[1] }];
            break;    
    }
   
}

function plotCounts(dataset, key){

    var sorted = {};
    var index = "";
    //console.log(dataset.length);
        for( var i = 0; i < dataset.length; i++) {
            index=String(dataset[i].properties[key]);
            if(sorted[index]!=null)
                sorted[index]+=1;
            else
                sorted[index]=0;
        }
    console.log(sorted);
    return sorted;

}

function plotCountsV2(dataset, xAxis, key){
    dataSize = dataset.length;
    var counts = new Array(xAxis.length).fill(0);
    var totalCount = 0;
    var percentages = new Array(xAxis.length).fill("");
    for(var i = 0; i < dataSize; i++){
        //console.log(dataset[i].properties[key]);
        
        if(dataset[i].properties[key]=="none" || dataset[i].properties[key]=="None" || dataset[i].properties[key]=="NONE")
            foundIndex = xAxis.indexOf("none");
        else
            foundIndex = xAxis.indexOf(dataset[i].properties[key]);
        if(foundIndex !== -1){
            counts[foundIndex]++;
            totalCount++;
        }
        //console.log(foundIndex);
    }

    for(var i = 0; i < counts.length; i++){
        percentages[i]=(counts[i]/totalCount*100.0).toFixed(1) + " %";
        //console.log(percentages[i]);
    }
    //console.log(counts);
    return [counts, percentages];
}