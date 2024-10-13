var express = require("express");
const pool = require("../../util/database");
var router = express.Router();
const path = require('path');
const { rename } = require("fs");

router.get("/:id", async function (req, res, next) {
  const id = req.params.id;
  const sqlQuery =
    "SELECT brand_id, model, note FROM machines WHERE machine_id=?;";

  const machine = await pool.query(sqlQuery, id);

  res.json(machine);
});

router.put("/:id", function (req, res, next) {
  if (!req.body) {
    res.statusMessage = "atleast edit a thing bruh";
    res.status(400).end();
    return;
  }

  const { brand, model, note } = req.body;
  let sqlQuery = "UPDATE machines SET ";

  Object.keys(req.body).forEach((key, i) => {
    sqlQuery += `${key}="${req.body[key]}"`;
    if (i + 1 < Object.keys(req.body).length) sqlQuery += ",";
  });

  sqlQuery += ` WHERE machine_id=${req.params.id}`;

  pool
    .query(sqlQuery)
    .then((success) => {
      console.log(success);
      res.json({
        brand,
        model,
        note,
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.delete("/:id", function (req, res, next) {
  res.send("say hello, your item is not deleted rn");
});

router.get("/", async function (req, res, next) {
  const sqlQuery = "SELECT * FROM machines;";
  await pool.query(sqlQuery).then((machines) => {
    res.json(machines);
  });
});

router.post("/", async function (req, res, next) {
  const { brand_id, model, bought_price, note } = req.body;

  console.log(req.body)

  if (!req.body || !brand_id || !model || !bought_price) {
    res.status(400);
    console.log(req.body);
    res.json({ error: "Error required data is not sufficed" });
    return;
  }

  const sqAddMachine =
    "INSERT INTO machines (brand_id, model, bought_price, note) VALUES (?, ?, ?, ?)"

  let sqAddImages = "INSERT INTO machine_images (machine_id, image_path) VALUES "

  // console.log(req.body, req.files)
  await pool
    .query(sqAddMachine, [brand_id, model, bought_price, note])
    .then(async (success) => {
      //      console.log(Object.entries(success))
      const machineId = Number(success.insertId)

      //EHH SALAH COK HARUSNYA INSERT KE MACHINES IMAGES DULU BARU BUAT KAYAK GINI,, AH BODO LAH
      
      // req.files.forEach((img, i) => {
      //   console.log(img)
      //   sqAddImages = sqAddImages.concat(`(${machineId}, `, `${img.filename})` + i+1 >= sqAddImages.length ? "" : "," )
      // })
      // console.log(sqAddImages)
      
      // return await pool.query(sqAddImages)
      // Promise.all(
      //   req.files.forEach((file) => {
      //     const oldPath = path.join(__dirname, '..', '..', 'public', 'images', file.filename)
      //     const newPath = path.join(__dirname, '..', '..', 'public', 'images', `${id}-file.filename`)

      //     rename(oldPath, newPath,)
      //   })
      // ).then(
      //   () => {
      //     res.status(201);
      //     res.json({
      //       id: id,
      //       brand_id: brand_id,
      //       model: model,
      //       bought_price: bought_price,
      //       note: note,
      //       images: req.files
      //     });
      // }
      // ).catch(err => { throw err }) //TODO BUAT error handling, kalo gagal, yang di db hapus, dan return gagal ke client 


    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

module.exports = router;
