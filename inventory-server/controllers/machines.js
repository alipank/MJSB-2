const path = require('path');
const { rename } = require("fs");
const pool = require("../util/database");


exports.getMachine = async function (req, res, next) {
    const imageDest = "http://localhost:3002/images/"
    const id = req.params.id;
    const sqlQuery =
        "SELECT m.*, img.id as image_id, img.image_path FROM machines AS m RIGHT JOIN machine_images as img ON m.id = img.machine_id WHERE m.id=?;";

    const machine = await pool.query(sqlQuery, id)
        .then(json => {
            // transform duplicated, because of one to many rel

            const { image_id, image_path, ...rest } = json[0]

            let images = json.map((row) => {
                const { image_id, image_path } = row
                return { image_id,  image_path }
            })

            const machineDetails = { ...rest, images }

            return machineDetails
        }).catch(err => {
            next(err)
            // throw new Error(err)
            // console.log(err)
        })


    res.json(machine);
}

exports.getMachines = async function (req, res, next) {
    const sqlQuery = "SELECT * FROM machines;";
    await pool.query(sqlQuery).then((machines) => {
        res.json(machines);
    });
}

exports.postMachine = async function (req, res, next) {
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

    let sqAddImages = "INSERT INTO machine_images (machine_id, image_path) VALUES"

    // req.files.forEach((img, i) => {
    //     console.log(img)
    //     sqAddImages = sqAddImages.concat(`(${machineId}, `, `${img.filename})` + i+1 >= img.length ? "" : "," )
    //   })

    // console.log(sqAddImages)

    // console.log(req.body, req.files)
    await pool
        .query(sqAddMachine, [brand_id, model, bought_price, note])
        .then(async (success) => {
            //      console.log(Object.entries(success))
            const machineId = Number(success.insertId)

            //EHH SALAH COK HARUSNYA INSERT KE MACHINES IMAGES DULU BARU BUAT KAYAK GINI,, AH BODO LAH

            req.files.forEach((img, i) => {
                console.log(img)
                //   sqAddImages = sqAddImages  + `(${machineId},  ${img.filename})` + i+1 >= sqAddImages.length ? "" : "," 
                const comma = i + 1 < req.files.length ? "," : ""

                sqAddImages = `${sqAddImages} (${machineId}, "${img.filename}") ${comma}`
            })
            console.log("sqAddImages", sqAddImages)

            console.log(req.files)

            return await pool.query(sqAddImages)
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

            //response sementara

        })
        .then((success => {
            console.log(success)
            res.json({ message: "berhasil eaks" })

        }))
        .catch((err) => {
            console.log(err);
            next(err);
        });
}

exports.putMachine = function (req, res, next) {
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
}
exports.deleteMachine = function (req, res, next) {
    res.send("say hello, your item is not deleted rn");
}