var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config()

const { default: puppeteer } = require("puppeteer");

console.log("Using port : "+process.env.PORT);

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


puppeteer.launch({ debuggingPort: 9222 }).then((b) => {console.log("puppeteer on debugging port 9222")});

// app.use("/machines", require("./routes/machine"))
app.use("/admin/machines", require("./routes/admin/machines"));
app.use("/card", require("./routes/card"));
app.use("/admin", require("./routes/admin/admin"));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  if(err.errno == 1054) {
    res.statusMessage = "Wrong object key {brand: required, model: required, note}"
    res.status(400).end()
    return
  }
  if (err.errno == 1452) {
    res.statusMessage = "Brand is not registered in database";
    res.status(400).end();
    return;
  }
  if (err.errno == 1062) {
    res.statusMessage = "Brand is already in the database";
    res.status(400).end();
    console.log(res.statusMessage);
    return;
  }

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
