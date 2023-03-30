/**
 * Database Config & Connection
 * @author Joseph Liao
 */

const mysql = require("mysql");

// MySQL Database Configuration
let con = mysql.createConnection({
  // host: "localhost",
  host: "myrds.cym2r8bxxstg.us-east-1.rds.amazonaws.com",
  user: "ljx02263",
  port: 3306,
  password: "qq1298508511",
  database: "mealpal_db",
});

// Connect
con.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }
  console.log("Connected to the MySQL server: " + con.config.host);
});

module.exports = con;
