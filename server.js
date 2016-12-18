//---------------------------------------------------------------------------
// File: servers.js
//
// Establish a nodejs/express web server.
//---------------------------------------------------------------------------

//---------------------------------------------------------------------------
// Dependencies
//---------------------------------------------------------------------------
var express = require("express");
var bodyParser = require("body-parser");

//---------------------------------------------------------------------------
// Establish express server instance.
//---------------------------------------------------------------------------
var app = express();
var PORT = process.env.PORT || 8080;

// Configure body parsing middleware for incoming posts.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory

app.use(express.static(__dirname + "/app/public"));

// Define the routes known to the server.

require("./app/routes/api-routes.js")(app);
require("./app/routes/html-routes.js")(app);

// Start web server on the specified port so it
// can respond to incoming requests from the client.

app.listen(PORT, function() {
	console.log("data-pump server listening on port:", PORT);
});
