var express = require("express");
var router = express.Router();
const QRCode = require("qrcode");
const puppeteer = require("puppeteer");
const pool = require("../util/database");
const PDFDocument = require('pdfkit');



router.get("/generate", async (req, res, next) => {
  const sqlQuery = "SELECT * FROM machines WHERE id=?;";

  const machine = await pool.query(sqlQuery, req.body.id);

  console.log("current id ", req.body.id);

  QRCode.toDataURL(String(req.body.id), { width: 400 }).then((data) => {
    res.render("genIdCard", {
      qrSrc: data,
      qrText: req.body.id,
      model: machine[0].model,
    });
  });
});

router.get("/print-cards", async function (req, res, next) {
  //Process request bentar gess
  const { machine_ids } = req.body
  if (!Array.isArray(machine_ids)) {
    err.message = "machine_ids must be an array of number"
    err.status = 422
    next(err)
  }

  // const base64CardImages = []

  console.log(machine_ids)

  const browserURL = "http://localhost:9222";
  const browser = await puppeteer.connect({ browserURL });


  const base64CardImages = machine_ids.map(async (mId, i) => {//mId -> machine id

    const page = await browser.newPage();

    await page.setRequestInterception(true);
    await page.setViewport({ width: 1348, height: 458 });

     page.on("request", (interceptedRequest) => {
      interceptedRequest.continue({
        headers: { "Content-Type": "application/json" },
        method: "GET",
        postData: JSON.stringify({
          id: mId
        }),
      });
    });

    await page.goto(`http://localhost:${process.env.PORT}/card/generate`, {

      waitUntil: "networkidle2",
    })
    const image = await page.screenshot();

    // (await page).close().then(() => {console.log("done", i, mId)})

    return image.toString("base64");
  });

  console.log(await base64CardImages)

  res.json(await base64CardImages)


  // await page
  //   .close()
  //   .then(() => {
  //     return browser.disconnect();
  //   })
  //   .then(() => console.log("Page closed and Browser has been disconnected"));



  // const WIDTH = 280 // each image width
  // const X_START = 10 // think about it like left margin
  // const Y_START = 10 // think about it as top margin
  // const GAP = 20 // gap X and Y 

  // const multipleMachineIdsToPrint = new PDFDocument({
  //   size:"A4",
  //   compress: false
  // });


  // multipleMachineIdsToPrint.pipe(res)

  // multipleMachineIdsToPrint.image("data:image/png;base64, "+base64image, 10, 300, {
  //   width: 280
  // })
  // multipleMachineIdsToPrint.image("data:image/png;base64, "+base64image, 300, 300, {
  //   width: 280
  // })
  // multipleMachineIdsToPrint.end()
  // res.render("index", { title: "Express", imageSrc: base64image });
});




module.exports = router;
