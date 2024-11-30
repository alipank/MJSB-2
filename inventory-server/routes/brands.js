const express = require('express')
const pool = require("../util/database");
var router = express.Router();


router.get("/", function (req, res, next) {
    const sqlQuery = "SELECT id, brand_name FROM machine_brands";

    pool.query(sqlQuery).then((data) => {
        res.json(data);

    })

});

router.post("/", function (req, res, next) {
    const { brand_name } = req.body;


    if (!brand_name) {
        throw {
            status: 400,
            message: "Error data is not sufficed"
        }
    }

    const sqlQuery = "INSERT INTO machine_brands (brand_name) VALUES (?)";

    console.log(req.body);

    pool
        .query(sqlQuery, brand_name.toUpperCase())
        .then((resp) => {
            console.log(resp);
            res.json({
                id: Number(resp.insertId),
                brand_name: brand_name.toUpperCase()
            });
        })
        .catch((err) => {
            console.log(err)
            next(err);
        });
});

module.exports = router;
