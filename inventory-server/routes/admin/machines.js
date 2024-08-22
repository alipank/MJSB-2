var express = require("express");
const pool = require("../../util/database");
var router = express.Router();

router.post("/new-brand", async function (req, res, next) {
  const { name } = req.body;

  const sqlQuery = "INSERT INTO brands (name) VALUES (?)";

  await pool
    .query(sqlQuery, name)
    .then((success) => {
      console.log(success);
      res.json({
        name: name.toUpperCase(),
      });
    })
    .catch((err) => {
      next(err)
    });
});

router.get("/:id", async function (req, res, next) {
  const id = req.params.id;
  const sqlQuery =
    "SELECT brand, model, note FROM machines WHERE machines_id=?;";

  const machine = await pool.query(sqlQuery, id);

  res.json(machine);
});

router.put("/:id", function (req, res, next) {
  if (!req.body) {
    res.statusMessage = "atleast edit a thing bruh"
    res.status(400).end()
    return
  }

  const { brand, model, note } = req.body;
  let sqlQuery = "UPDATE machines SET ";

  Object.keys(req.body).forEach(
    (key, i) => {
      sqlQuery+=`${key}="${req.body[key]}"`
      if(i+1 < Object.keys(req.body).length) sqlQuery+="," 
    })

  sqlQuery += ` WHERE machines_id=${req.params.id}`


  pool.query(sqlQuery).then((success) => {
    console.log(success);
    res.json({
      brand, model, note
    });
  }).catch((err) => {
    next(err)
  })

});

router.delete("/:id", function (req, res, next) {
  res.send("say hello, your item is not deleted rn");
});

router.post("/", async function (req, res, next) {
  const { brand, model, note } = req.body;

  if (!req.body || !brand || !model) {
    res.status(400);
    res.json({error: "Error required data is not sufficed"});
    return
  }

  const sqlQuery = "INSERT INTO machines (brand, model, note) VALUES (?, ?, ?)";

  await pool
    .query(sqlQuery, [brand, model, note])
    .then((success) => {
      console.log(success);
      res.status(201);
      res.json({
        brand: req.body.brand.toUpperCase(),
        model: req.body.model,
        note: req.body.note,
      });
    })
    .catch((err) => {
      next(err)
    });
});

module.exports = router;
