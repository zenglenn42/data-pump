//---------------------------------------------------------------------------
// File: connections.js
//
// This file initiates the connection to MySQL.
//---------------------------------------------------------------------------

// Require mysql
var mysql = require("mysql");

// Set up our connection information
var connection = mysql.createConnection({
  port: 3306,
  host: "rtzsaka6vivj2zp1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "fhfus38bddy7kmoa",
  password: "jp7vi1crkdfe09gl",
  database: "b7y2jf2u35vs3sh4"
});

// Connect to the database
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection
module.exports = connection;
