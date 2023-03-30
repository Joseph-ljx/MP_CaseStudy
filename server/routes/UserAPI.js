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
 * @param req http request (username, phone)
 * @param res http response
 */

router.post("/", async function (req, res) {
  console.log("POST /api/users - Adding new full name and phone");
  console.log(req.body);

  const { username, phone } = req.body;
  console.log("user: " + username + " phone: " + phone);

  try {
    // If info is lost
    if (!username || !phone) {
      res.status(400);
      res.json({ errMessage: "Mandatory Information Lost!" });
      return;
    }

    // Generate a unique digit id
    // (user name may be duplicate and could not be the PK in DB)
    var id = Date.now();

    // Splitting the name by spaces using regex.
    var nameSet = username.trim().split(/\s+/);

    // Valid phone regex for 10 or 11 digits
    var phoneRegex = /^\d{10,11}$/;

    // Invalid input
    if (nameSet.length < 2) {
      res.status(400);
      res.json({ errMessage: "UserName must be your first name last name!" });

      // Recommend to place a return statement after the res.send call
      // to make your function stop executing further.
      return;
    } else if (!phoneRegex.test(phone)) {
      res.status(400);
      res.json({
        errMessage: "Phone should only has 10 or 11 digits! (e.x. 1231231234)!",
      });

      // Recommend to place a return statement after the res.send call
      // to make your function stop executing further.
      return;
    }

    // Valid information: insert into the database
    var sql = `INSERT INTO User
        (id, username, phone)
        VALUES
        (${id}, '${username}', '${phone}');`;

    // Execute the SQL script
    con.query(sql, function (err, result) {
      if (err) {
        console.log("Error: " + err.message);
        res.status(500).json({ errMessage: "Internal DB error!" });
        return;
      }

      // Exhibit the full URL in Express + id
      // https://stackoverflow.com/questions/10183291/how-to-get-the-full-url-in-express
      console.log(
        `${req.protocol}://${req.get("host")}${req.originalUrl}${id}`
      );

      // Successfully created.
      // Assign the id for exhibition
      res.status(201).json({ message: "Successfully inserted in the DB!" });
      return;
    });
  } catch (e) {
    res.status(404);
    res.json({ errMessage: "request failed!" });
  }
});

module.exports = router;
