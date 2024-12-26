const pool = require("../util/database")

exports.getQrBatch = (req, res, next) => {
    const sqlQuery = `
       SELECT 
        m.id,
        m.brand_id,
        m.model,
        img.id AS image_id, 
        img.image_path
    FROM 
        qr_batch
    JOIN
        machines as m ON m.id = qr_batch.machine_id
    JOIN 
        machine_images AS img ON m.id = img.machine_id
    WHERE 
        img.id = (
            SELECT MIN(sub_img.id)
            FROM machine_images AS sub_img
            WHERE sub_img.machine_id = m.id
        );
        `
    pool
        .query(sqlQuery)
        .then((qrBatch) => {
            const json = qrBatch.map((machine) => {
                const { image_id, image_path, ...rest } = machine;
                const images = [
                    { image_id, image_path }
                ]
                return { ...rest, images: images }
            })
            res.json(json)
        })
        .catch((err) => {
            console.log(err);
            next({
                status: 500,
                message: "Failed to get machine(s). // " + err.message
            });
        });
}

exports.putQrBatch = (req, res, next) => {
    const idArr = req.body.id
    if (idArr.length === 0) {
        throw {
            status: "400",
            message: "Error required data is insufficient"
        }
    }

    if (!Array.isArray(idArr) || idArr.length === 0) {
        throw {
            status: "400",
            message: "Wrong data value"
        }
    }

    const sqlQueryGet = "SELECT machine_id from qr_batch;"

    pool
        .query(sqlQueryGet)
        .then((mId) => {
            const existingId = mId.map(e => e.machine_id)

            // filteredIdArr = idArr.filter((e) => !(existingId.find(Number(e))))
            // console.log(idArr, mId, existingId,)
            // console.log(idArr.filter(e1 => {
            //     console.log("dasadsad", existingId, typeof e)
            //     return existingId.find((e2 => e2.toString() === e1))
            // }))

            return idArr.filter(e1 => {
                console.log("dasadsad", existingId, typeof e)
                return !existingId.find((e2 => (e2.toString() === e1)))
            })
        })
        .then((filteredIdArr) => {
            let sqlQuery = `INSERT INTO qr_batch (machine_id) VALUES `

            filteredIdArr.forEach((id, i) => {
                sqlQuery += `(${id}) ${i + 1 >= filteredIdArr.length ? ';' : ','}`
            });
            if (filteredIdArr.length === 0) {
                throw {
                    status: 400,
                    message: "Bad request: Item(s) is already in the batch"
                }
            }
            return pool
                .query(sqlQuery)

        })
        .then(() => {
            res.status(201).json({
                status: 201,
                message: "berhasil eaks"
            })
        })
        .catch((err) => {
            console.log(err);
            next({
                status: 500,
                message: "Failed to create new machine. // " + err.message
            });
        });


}

exports.deleteQrBatch = (req, res, next) => {
    const idArr = req.body.id

    if (idArr.length === 0) {
        throw {
            status: "400",
            message: "Error required data is insufficient"
        }
    }

    if (!Array.isArray(idArr) || idArr.length === 0) {
        throw {
            status: "400",
            message: "Wrong data value"
        }
    }

    let sqlQuery = `DELETE FROM qr_batch WHERE `

    idArr.forEach((id, i) => {
        sqlQuery += `machine_id=(${id}) ${i + 1 >= idArr.length ? ';' : 'OR '}`
    });

    console.log(idArr)
    console.log(sqlQuery)

    pool
        .query(sqlQuery)
        .then(() => {
            res.status(201).json({
                status: 201,
                message: "Machine(s) deleted"
            })
        })
        .catch((err) => {
            console.log(err);
            next({
                status: 500,
                message: "Failed to delete machine(s). // " + err.message
            });
        });
}
