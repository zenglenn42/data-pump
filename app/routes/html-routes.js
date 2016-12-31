// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");


// Routes
// =============================================================
module.exports = function(app) {

  // Index route loads index.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + '../public/intro.html'));
  });

  app.get("/maps", function(req, res) {
    res.sendFile(path.join(__dirname + '/../maptests/remotedata_map.html'));
  });

  app.get("/display", function(req, res) {
  res.sendFile(path.join(__dirname + "/../public/display.html"));
  });

};
