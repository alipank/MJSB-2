var express = require("express");
const pool = require("../util/database");
var router = express.Router();

router.get("/new-brand", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/:id", async function (req, res, next) {
  const id = req.params.id;
  const sqlQuery =
    "SELECT brand, model, note FROM machines WHERE machines_id=?;";

  const machine = await pool.query(sqlQuery, id);

  res.json(machine);
});

router.post("/:id", function (req, res, next) {
  res.send("respond with a resource");
});

router.put("/:id", function (req, res, next) {
  res.send("respond with a resource");
});

router.delete("/:id", function (req, res, next) {
  res.send("say hello");
});

module.exports = router;
