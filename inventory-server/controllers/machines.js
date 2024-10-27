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
            if (!json.length) {
                throw { status: 404 }
            }

            const { image_id, image_path, ...rest } = json[0]

            let images = json.map((row) => {
                const { image_id, image_path } = row
                return { image_id, image_path }
            })

            const machineDetails = { ...rest, images }

            return machineDetails
        }).catch(err => {
            next(err)
            // throw new Error(err)
            console.log(err)
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
        throw {
            status: 400,
            message: "Error required data is not sufficed"
        }
    }

    const sqAddMachine =
        "INSERT INTO machines (brand_id, model, bought_price, note) VALUES (?, ?, ?, ?);"

    let sqAddImages = "INSERT INTO machine_images (machine_id, image_path) VALUES"

    // console.log(sqAddImages)

    // console.log(req.body, req.files)
    pool
        .query(sqAddMachine, [brand_id, model, bought_price, note])
        .then((success) => {
            //      console.log(Object.entries(success))
            const machineId = Number(success.insertId)

            //EHH SALAH COK HARUSNYA INSERT KE MACHINES IMAGES DULU BARU BUAT KAYAK GINI,, AH BODO LAH

            req.files.forEach((file, i) => {
                // console.log(file)
                sqAddImages += `(${machineId}, "${file.filename}") ${i + 1 >= req.files.length ? ';' : ','}`
            })

            console.log("sqAddImages", sqAddImages)

            console.log(req.files)

            return pool.query(sqAddImages)
        })
        .then((success => {
            console.log(success)
            res.status(201).json({ 
                status: 201,
                message: "berhasil eaks" 
            })
        }))
        .catch((err) => {
            console.log(err);
            next({
                status:500,
                message: "Failed to create new machine."
            });
        });
}

exports.putMachine = function (req, res, next) {
    if (!req.body) {
        throw {
            status: 400,
            message: "atleast edit a thing bruh"
        }
    }

    const { delete_images_id, brand_id, model, bought_price, note } = req.body;

    let sqlQuery = "UPDATE machines SET brand_id=?, model=?, bought_price=?, note=? WHERE id=?;";

    console.log('1', sqlQuery)
    
    pool
        .query(sqlQuery, [brand_id, model, bought_price, note, req.params.id])
        .then((success) => {
            console.log('1.', success)
            if (req.files.length) {
                let sqlQuery = "INSERT INTO machine_images (machine_id, image_path) VALUES "
                req.files.forEach((file, i) => {
                    sqlQuery += `(${req.params.id}, "${file.filename}") ${i + 1 >= req.files.length ? ';' : ','}`
                })
                return pool.query(sqlQuery)
            }
            return
        })
        .then((success) => {
            console.log('2.', success)
            if (delete_images_id) {
                let sqlQuery = `DELETE FROM machine_images WHERE`
                delete_images_id.forEach((id, i) => {
                    sqlQuery += ` id=${id} ${i + 1 >= delete_images_id.length ? ';' : 'OR'}`
                })
                return pool.query(sqlQuery)
            }
        
            return
        })
        .then((success) => {
            console.log('3.', success)
            console.log('done')
            res.status(201).json({
                status: 201,
                message: "Succesfully Edit the Machine"
            })
        })
        .catch((err) => {
            console.log(err)
            throw {
                status: 500,
                message: "Database error"
            }
        });
}
exports.deleteMachine = function (req, res, next) {
    const sqlQuery = "DELETE FROM"
}