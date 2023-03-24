/**
 * Sub-router for User Input Verification
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

/**
 * Post Information Endpoint:
 *
 * Description:
 * Adding the information into the database if valid.
 * Request Body Params
 * @param FullName Both first name and last name (length = 2)
 * @param Phone Should a only 10 digits number (e.x. 1231234567)
 */

router.post("/", async function (req, res) {
  console.log("POST /api/users - Adding new full name and phone");
  console.log(req.body);

  // Generate a unique digit id
  // (user name may be duplicate and could not be the PK in DB)
  var id = Date.now();

  // Splitting the name by spaces using regex.
  var nameLen = req.body.username.match(/\w+/g);

  try {
    // Invalid input
    if (!nameLen.length === 2) {
      res.status(400);
      res.json("Numbers only (e.x. 1231231234)!");

      // Recommend to place a return statement after the res.send call
      // to make your function stop executing further.
      return;
    } else if (!req.body.phone.match(/\d/g).length === 10) {
      res.status(400);
      res.json("Must be your first name last name!");

      // Recommend to place a return statement after the res.send call
      // to make your function stop executing further.
      return;
    }

    // Valid information: insert into the database
    var sql = `INSERT INTO User
        (id, username, phone)
        VALUES
        (${id}, '${req.body.username}', '${req.body.phone}');`;

    con.query(sql, function (err, result) {
      if (err) {
        console.log("Error: " + err.message);
      }

      // Exhibit the full URL in Express + id
      // https://stackoverflow.com/questions/10183291/how-to-get-the-full-url-in-express
      console.log(
        `${req.protocol}://${req.get("host")}${req.originalUrl}${id}`
      );

      // Successfully created.
      // Assign the id for exhibition
      res.status(201).json("Successfully inserted in the DB!");
    });
  } catch (e) {
    res.status(404);
    res.json("request failed!");
  }
});

module.exports = router;
