var express = require("express");
var router = express.Router();
const QRCode = require("qrcode");
const puppeteer = require("puppeteer");
const pool = require("../util/database");


router.get("/generate", async (req, res, next) => {
  const sqlQuery = "SELECT id, model, timestamp FROM machines WHERE id=?;";

  const machine = await pool.query(sqlQuery, req.body.id);

  console.log(req.body.id);

  QRCode.toDataURL(req.body.id, { width: 400 }).then((data) => {
    res.render("genIdCard", {
      qrSrc: data,
      qrText: req.body.id,
      model: machine[0].model,
    });
  });
});

router.get("/print-cards", async function (req, res, next) {
  const browserURL = "http://localhost:9222";
  const browser = await puppeteer.connect({ browserURL });
  const page = await browser.newPage();

  await page.setRequestInterception(true);

  page.on("request", (interceptedRequest) => {
    interceptedRequest.continue({
      headers: { "Content-Type": "application/json" },
      method: "GET",
      postData: '{"id":"1"}',
    });
  });
  await page.setViewport({ width: 1348, height: 458 });

  await page.goto(`http://localhost:${process.env.PORT}/card/generate`, {
    waitUntil: "networkidle2",
  })
  const image = await page.screenshot();

  await page
    .close()
    .then(() => {
      return browser.disconnect();
    })
    .then(() => console.log("Page closed and Browser has been disconnected"));

  const base64image = image.toString("base64");

  

  res.render("index", { title: "Express", imageSrc: base64image });
});




module.exports = router;
