/**
 * Sub-router for Customers
 */

const express = require("express");
const router = express.Router();
const con = require("../dbCon");
const bodyParser = require("body-parser");

// Make sure that each router is using a middleware.
// The middleware enable the usage of json define.

router.use(express.json());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// Regex for validating email format
var regex_1 = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// State string for validating an U.S. state
var stateString =
  "|AL|AK|AS|AZ|AR|CA|CO|CT|DE|DC|FM|FL|GA|GU|HI|ID|IL|IN|IA|KS|KY|LA|ME|MH|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|MP|OH|OK|OR|PW|PA|PR|RI|SC|SD|TN|TX|UT|VT|VI|VA|WA|WV|WI|WY|";

/**
 * Add Customer endpoint:
 *
 * Description:  Add a customer to the system (the system will allow self-registration).
 * This endpoint is called to create the newly registered customer in the system.
 * A unique numeric ID is generated for the new customer, and the customer is added to the Customer data table on MySql (the numeric ID is the primary key).
 */

router.post("/", async function (req, res) {
  console.log("POST /api/customers - Creating a new customer");
  console.log(req.body);

  // Generate a unique digit id
  var id = Date.now();

  try {
    // Address 2 is optional, others are mandatory
    if (
      req.body.userId == undefined ||
      req.body.name == undefined ||
      req.body.phone == undefined ||
      req.body.address == undefined ||
      req.body.city == undefined ||
      req.body.state == undefined ||
      req.body.zipcode == undefined ||
      !regex_1.test(req.body.userId) ||
      stateString.indexOf(req.body.state) <= 0
    ) {
      res.status(400);
      res.json("Bad Request! Attribute lost or format unmatched!");

      // Recommend to place a return statement after the res.send call
      // to make your function stop executing further.
      return;
    }

    // Check whether this user-ID (not ID) already exist
    var sql_1 = `SELECT * FROM Customer WHERE userId = '${req.body.userId}'`;
    con.query(sql_1, function (err, result) {
      if (err) {
        console.log("Error: " + err.message);
      }
      // accessing the Result = [RawDataPacket]
      // Using result[0], result[1]...
      // https://stackoverflow.com/questions/38133084/how-to-access-rowdatapacket-mysql-node-js

      // Accessing the length of the result.
      // Check ISBN already exist in the database
      let existNum = Object.keys(result).length;

      // If ISBN already exist
      if (existNum > 0) {
        res
          .status(422)
          .json({ message: "This user ID already exists in the system." });
        return;
      } else {
        // Insert into Database
        var sql_2 = `INSERT INTO Customer
        (id, userId, name, phone, address, address2, city, state, zipcode)
        VALUES
        (${id}, '${req.body.userId}', '${req.body.name}', '${req.body.phone}', '${req.body.address}',
        '${req.body.address2}', '${req.body.city}', '${req.body.state}', '${req.body.zipcode}');
        `;
        con.query(sql_2, function (err) {
          if (err) {
            console.log("Error: " + err.message);
          }
        });

        // Get the full URL in Express + id
        // https://stackoverflow.com/questions/10183291/how-to-get-the-full-url-in-express
        console.log(
          `${req.protocol}://${req.get("host")}${req.originalUrl}${id}`
        );

        // Successfully created.
        // Assign the id for exhibition
        req.body.id = id;
        res.status(201).json(req.body);
      }
    });
  } catch (e) {
    res.status(404);
    res.json("request failed!");
  }
});

/**
 * Retrieve Customer by ID endpoint:
 *
 * Description:  obtain the data for a customer given its numeric ID.
 * This endpoint will retrieve the customer data on MySql and send the data in the response in JSON format.
 * Note that ID is the  numeric ID, not the user-ID.
 */

router.get("/:id", async function (req, res) {
  console.log("GET /api/customers/id - Get a customer by ID");

  const id = req.params["id"];
  try {
    // Generate SQL and run the script
    var sql = `SELECT * FROM Customer WHERE id = ${id}`;
    con.query(sql, function (err, result) {
      if (err) {
        // ISBN Not found
        throw err;
      }

      // Accessing the length of the result.
      // Check id exist in the database
      let existNum = Object.keys(result).length;

      // Customer Found
      if (existNum > 0) {
        // Stringify the result value -> string
        console.log(`Customer found: ${JSON.stringify(result, null, 4)}`);

        // Return 200, string -> json response
        res.status(200).json(result);
        return;
      } else {
        res.status(404).json("ID does not exist in the system");
        return;
      }
    });
  } catch (e) {
    res.status(400);
    res.json("Illegal, missing, or malformed input");
  }
});

/**
 * Retrieve Customer by USER ID endpoint:
 *
 * Description:  obtain the data for a customer given its user ID,which is the email address.
 * This endpoint will retrieve the customer data on MySql and send the data in the response in JSON format.
 * Note that the ‘@’ character should be encoded in the query string parameter value
 * (ex.: userId=starlord2002%40gmail.com).
 *
 * How to access the GET parameters after "?" in Express
 * https://stackoverflow.com/questions/17007997/how-to-access-the-get-parameters-after-in-express
 */

router.get("", async function (req, res) {
  console.log("GET /api/customers/uid - Get a customer by user ID");

  const userId = req.query.userId;
  console.log(userId);
  try {
    // Generate SQL and run the script
    var sql = `SELECT * FROM Customer WHERE userId = '${userId}'`;
    console.log(sql);
    con.query(sql, function (err, result) {
      if (err) {
        // ISBN Not found
        throw err;
      }

      // Accessing the length of the result.
      // Check id exist in the database
      let existNum = Object.keys(result).length;

      // Customer Found
      if (existNum > 0) {
        // Stringify the result value -> string
        console.log(`Customer found: ${JSON.stringify(result, null, 4)}`);

        // Return 200, string -> json response
        res.status(200).json(result);
        return;
      } else {
        res.status(404).json("User ID does not exist in the system");
        return;
      }
    });
  } catch (e) {
    res.status(400);
    res.json("Illegal, missing, or malformed input");
  }
});

module.exports = router;
