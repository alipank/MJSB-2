var express = require("express");
var router = express.Router();
const QRCode = require("qrcode");
const puppeteer = require("puppeteer")

router.get("/gen-id-card", (req, res, next) => {
  const hcModel = "Singer <3";
  const hcId = "machine-123";

  QRCode.toDataURL(hcId, { width: 400 }).then((data) => {
    res.render("genIdCard", { qrSrc: data, qrText: hcId, model: hcModel });
  });
});

/* GET home page. */
router.get("/", async function (req, res, next) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto("http://localhost:3000/gen-id-card", {
    waitUntil: "networkidle2",
  });
  await page.setViewport({width:1348, height: 458})
  const image = await page.screenshot({});

  const base64image = image.toString("base64")
  await browser.close();
  res.render("index", { title: "Express", imageSrc: base64image });
});

module.exports = router;
