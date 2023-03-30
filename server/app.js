/**
 * Express App Configuration
 * @author Joseph Liao
 */

const express = require("express");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const cors = require("cors");
const path = require("path");

// Main express router
const app = express();

// Import relevant routers
const userRouter = require("./routes/UserAPI");

// Default setting of express specify the static resources
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// Apply routers
app.use("/api/users", userRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
