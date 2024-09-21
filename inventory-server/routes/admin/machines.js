var express = require("express");
const pool = require("../../util/database");
var router = express.Router();

router.get("/brands", async function (req, res, next) {
  const sqlQuery = "SELECT id, brand_name FROM machine_brands"

  const brands = await pool.query(sqlQuery)

  res.json(brands)
})

router.post("/brand", async function (req, res, next) {
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
    "SELECT brand_id, model, note FROM machines WHERE machine_id=?;";

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
      sqlQuery += `${key}="${req.body[key]}"`
      if (i + 1 < Object.keys(req.body).length) sqlQuery += ","
    })

  sqlQuery += ` WHERE machine_id=${req.params.id}`


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

router.get("/", async function (req, res, next) {
  const sqlQuery = "SELECT * FROM machines;"
  await pool
    .query(sqlQuery)
    .then((machines) => {
      res.json(machines)
    })
})

router.post("/", async function (req, res, next) {
  const { brand_id, model, bought_price, note } = req.body;

  if (!req.body || !brand_id || !model || !bought_price) {
    res.status(400);
    res.json({ error: "Error required data is not sufficed" });
    return
  }

  const sqlQuery = "INSERT INTO machines (brand_id, model, bought_price, note) VALUES (?, ?, ?, ?)";

  await pool
    .query(sqlQuery, [brand_id, model, bought_price, note ])
    .then((success) => {
      console.log(success);
      res.status(201);
      res.json({
        brand_id: brand_id,
        model: model,
        bought_price: bought_price,
        note: note,
      });
    })
    .catch((err) => {
      console.log(err)
      next(err)
    });
});

module.exports = router;
