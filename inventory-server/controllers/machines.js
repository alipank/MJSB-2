const path = require('path');
const pool = require("../util/database");
const { unlink } = require('fs/promises');


exports.getMachine = async function (req, res, next) {
    const id = req.params.id;
    const sqlQuery =
        "SELECT m.*, img.id as image_id, img.image_path FROM machines AS m LEFT JOIN machine_images as img ON m.id = img.machine_id WHERE m.id=?;";

    const machine = await pool.query(sqlQuery, id)
        .then(json => {
            // transform duplicated, because of one to many rel
            console.log(json)
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
            next({
                message: "Database failure, the machine probably didn't exist"
            })
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
    const { brand_id, model, bought_price, note, is_ready } = req.body;



    console.log(req.body)

    if (!brand_id || !model || !bought_price || !req.files.length) {
        throw {
            status: 400,
            message: "Error required data is not sufficed"
        }
    }

    if (brand_id.match(/\D+/) || bought_price.match(/\D+/)) {
        throw {
            status: 400,
            message: "Wrong data type"
        }
    }

    const sqAddMachine =
        "INSERT INTO machines (brand_id, model, bought_price, note, is_ready) VALUES (?, ?, ?, ?, ?);"

    let sqAddImages = "INSERT INTO machine_images (machine_id, image_path) VALUES"

    // console.log(sqAddImages)

    // console.log(req.body, req.files)
    pool
        .query(sqAddMachine, [brand_id, model, bought_price, note, is_ready])
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
                status: err.status || 500,
                message: "Failed to create new machine. // " + err.message
            });
        });
}

exports.putMachine = function (req, res, next) {

    const { delete_images_id, brand_id, model, bought_price, note, is_ready } = req.body;

    const MAX_IMAGES = 10

    if (!brand_id || !model || !bought_price) {
        throw {
            status: 400,
            message: "Error required data is not sufficed"
        }
    }

    if (brand_id.match(/\D+/) || bought_price.match(/\D+/)) {
        throw {
            status: 400,
            message: "Wrong data type"
        }
    }
    const currentImages = pool.query(`SELECT * FROM machine_images WHERE machine_id=${req.params.id}`)

    currentImages
        .then((images) => {
            //check if images will be insert and delete are exceeding limit (10) or not 
            // console.log(images.length,
            //      req.files.length,
            //      delete_images_id,
            //      delete_images_id?.length,
            //      images.length + req.files.length - (delete_images_id?.length || 0),
            //      images.length + req.files.length - delete_images_id?.length || 0> MAX_IMAGES)

            if (images.length + req.files.length - (delete_images_id?.length || 0) > MAX_IMAGES && req.files.length) { // allow req.files.length to delete the overloaded image (for somehow)
                throw {
                    status: 400,
                    message: "Maximum image is exceeded"
                }
            }
            const sqlQuery = "UPDATE machines SET brand_id=?, model=?, bought_price=?, note=?, is_ready=? WHERE id=?;";

            return pool.query(sqlQuery, [brand_id, model, bought_price, note, is_ready, req.params.id])

        })
        .then(async (success) => {
            console.log("0.", success)
            if (!delete_images_id) {
                return
            }
            let sqlQuery = `SELECT image_path FROM machine_images WHERE`
            delete_images_id.forEach((id, i) => {
                sqlQuery += ` id=${id} ${i + 1 >= delete_images_id.length ? ';' : 'OR'}`
            })
            const paths = await pool.query(sqlQuery)
            console.log(sqlQuery, paths)

            paths.forEach((p) => {
                unlink(path.join(__dirname, '..', 'public', 'images', p.image_path)).catch((err) => {
                    throw {
                        status: 500,
                        message: "Failed to delete Photo(s)"
                    }
                })
            })
        })
        .then((success) => {
            console.log('1.', success)
            if (!delete_images_id) {
                return
            }

            let sqlQuery = `DELETE FROM machine_images WHERE`
            delete_images_id.forEach((id, i) => {
                sqlQuery += ` id=${id} ${i + 1 >= delete_images_id.length ? ';' : 'OR'}`
            })

            return pool.query(sqlQuery).catch(err => console.log(err))
        })
        .then((success) => {
            console.log('2.', success)
            if (!req.files.length) {
                return
            }
            let sqlQuery = "INSERT INTO machine_images (machine_id, image_path) VALUES "
            req.files.forEach((file, i) => {
                sqlQuery += `(${req.params.id}, "${file.filename}") ${i + 1 >= req.files.length ? ';' : ','}`
            })

            return pool.query(sqlQuery).catch(err => { console.log(err) })
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
            next(err)
        });
}
exports.deleteMachine = function (req, res, next) {
    const sqlQuery = `DELETE FROM machines WHERE id=${req.params.id}`
    pool.query(sqlQuery)
        .then((res) => {
            console.log(res)
            res.status(200).json({
                status: 200,
                message: 'Remove machine successfully'
            })
        })
        .catch((err) => {
            console.log(err)
            next({
                status: 500,
                message: "Failed to Remove"
            })
        })
}