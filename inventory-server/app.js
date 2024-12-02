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
    const random = randomInt(10000, 99999)
    const ext = path.extname(file.originalname) || mime.extension(file.mimetype)


    let customName = date + '-' + random + ext
    //redundant if the name is duplicated
    //const customNameDuplicate = customName + '-' + '2' + ext

    //TODO: use front end compression 

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
app.use('/', upload.array('new_images[]', 10), function (req, res, next) {
  next()
})

// app.use('/', (req,res,next) => {
//   console.log(req.method, req.path)
//   next()
// })

// temporarely not launching puppeteer, it's a memory hogger beast, so use <canvas> quickly or look for how to kill puppeteer when node killed

// puppeteer.launch({ debuggingPort: 9222 }).then((b) => { console.log("puppeteer on debugging port 9222") });
// app.use((req, res, next) => {
//   res.append('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.append('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });
app.use(cors({origin:['http://192.168.100.112:3000', 'http://localhost:3000', 'http://172.20.10.14:3000']}))

app.use('/customers', require("./routes/customers"))
app.use("/machines", require("./routes/machines"))
app.use("/brands", require("./routes/brands"))
app.use("/card", require("./routes/card"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  let json = {}

  if (err.errno == 1054) {
    json = {
      status: 400,
      message: "Wrong object key {brand_id: required, model: required, note}"
    }

  }
  if (err.errno == 1452) {
    json = {
      status: 400,
      message:"Brand is not registered in database"
    }
  }
  if (err.errno == 1062) {
    json ={ 
      status: 400,
      message:"Brand is already registered in the database"}
    }

  console.log(err)

  // render the error page
  res.status(json.status || (err.status || 500));
  // res.render("error", {error : err});
  // console.log(err)
  res.json(json || err) //returns the err if the error is unhandled
});



module.exports = app;
