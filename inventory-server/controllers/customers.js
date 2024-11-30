const pool = require("../util/database")

exports.postCustomer = (req, res, next) => {

    const { machine_id, name, sold_price, phone } = req.body

    console.log(req.body, machine_id.match(/\D+/), sold_price.match(/\D+/), phone.match(/\D+/) )

    if (!machine_id || !name || !sold_price || !phone) {
        throw {
            status: 400,
            message: "Error required data is not sufficed"
        }
    }
    // TODO DKJFHAKDJF SDFSKJFSDFKJSLKFJ LSDKFJSLKFJ
    if (machine_id.match(/\D+/) || sold_price.match(/\D+/) || phone.match(/\D+/)) {
        throw {
            status: 400,
            message: "Wrong data type"
        }
    }

    const sqlQuery = 'INSERT INTO customers (machine_id, name, sold_price, phone) VALUES (?, ?, ?, ?);'

    pool.query(sqlQuery, [machine_id, name, sold_price, phone])
        .then((success => {
            console.log(success.insertId)
            res.status(201).json({
                status: 201,
                message: "berhasil eaks",
                body: {
                    id: Number(success.insertId)
                }
            })
        }))
        .catch(

        )
}