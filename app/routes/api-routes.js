// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var connection = require("../config/connection.js");


// Routes
// =============================================================
module.exports = function(app) {

  // Get all chirps
  app.get("/api/all", function(req, res) {

    var dbQuery = 'SELECT * FROM dummydata';

    connection.query(dbQuery, function(err, result) {
      res.json(result);
    });

  });

/*
  app.post("/api/new", function(req, res) {

      console.log("Data:");
      console.log(req.body);
      var dbQuery = "INSERT INTO dummydata (case_number, case_status, charge, date, day, dl_status_incident, fatal_crash, hour, impaired_type, killed_driver_pass, location, location1_latitude, location1_longitude, month, of_fatalities, ran_red_light, related, restraint_helmet, sector, speeding, time, type, type_of_road) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

      var dbSchema = [
          req.case_number, 
          req.case_status, 
          req.charge,
          req.date,
          req.day,
          req.dl_status_incident,
          req.fatal_crash,
          req.hour,
          req.impaired_type,
          req.killed_driver_pass,
          req.location,
          req.location1_latitude,
          req.location1_longitude,
          req.month,
          req.of_fatalities,
          req.ran_red_light,
          req.related,
          req.restraint_helmet,
          req.sector,
          req.speeding,
          req.time,
          req.type,
          req.type_of_road
          ];

      connection.query(dbQuery, dbSchema, function(err, result) {
        console.log("Ok!");
        res.end();
      });
  });
*/

};
