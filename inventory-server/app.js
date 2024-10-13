var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors")

require("dotenv").config()

const multer = require('multer')

const processedFilenames = new Set()

const diskStorageOptions = {

  destination: (req, file, cb) => {
    cb(null, './public/images')
  },
  filename: (req, file, cb) => {
    console.log(file)


    const date = new Date().toLocaleDateString('en-CA')
    const random = randomInt(1, 3)
    const ext = path.extname(file.originalname) || mime.extension(file.mimetype)

   
    let customName = date + '-' + random + ext
    //redundant if the name is duplicated
    //const customNameDuplicate = customName + '-' + '2' + ext

    console.log(customName)

    if (
      processedFilenames.has(customName) ||
      existsSync(path.join(__dirname, 'public', 'path', customName))
    ) {
      console.log('duplicate with: ', customName)
      return diskStorageOptions.filename(req, file, cb)
    } else {
      processedFilenames.add(customName)
      cb(null, customName)
    }

  }
}

const storage = multer.diskStorage(
  diskStorageOptions
)

const upload = multer({
  storage
}, 10)

const { default: puppeteer } = require("puppeteer");
const { existsSync } = require("fs");
const { randomInt } = require("crypto");

console.log("Using port : " + process.env.PORT);

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use(cors())
app.use('/', upload.array('new_images', 10), function (req, res, next) {
  next()
})

puppeteer.launch({ debuggingPort: 9222 }).then((b) => { console.log("puppeteer on debugging port 9222") });
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['http://localhost:3000']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
// app.use("/machines", require("./routes/machine"))
app.use("/admin", require("./routes/admin/admin"));
app.use("/admin/machines", require("./routes/admin/machines"));
app.use("/card", require("./routes/card"));
app.use("/machines", require("./routes/machines"))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  if (err.errno == 1054) {
    res.statusMessage = "Wrong object key {brand_id: required, model: required, note}"
    res.status(400).end()
    return
  }
  if (err.errno == 1452) {
    res.statusMessage = "Brand is not registered in database";
    res.status(400).end();
    return;
  }
  if (err.errno == 1062) {
    res.statusMessage = "Brand already in the database";
    res.status(400).end();
    console.log(res.statusMessage);
    return;
  }

  // render the error page
  res.status(err.status || 500);
  // res.render("error", {error : err});
  console.log(err)
  res.json(err)
});

module.exports = app;
