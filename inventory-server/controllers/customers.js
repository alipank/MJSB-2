const pool = require("../util/database")

exports.postCustomer = (req, res, next) => {

    const { machine_id, name, sold_price, phone } = req.body

    console.log(req.body, machine_id.match(/\D+/), sold_price.match(/\D+/), phone.match(/\D+/))

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

exports.deleteCustomer = (req, res, next) => {

    console.log('id', req.body.id)

    if (!req.body.id) {
        throw {
            status: 400,
            message: "Error required data is not sufficed"
        }
    }
    // .id.match(/\D+/)
    if (res.body) {
        throw {
            status: 400,
            message: "Wrong Data Type"
        }
    }

    const sqlQuery = `DELETE FROM customers WHERE id=${req.body.id}`
    pool.query(sqlQuery)
        .then((success) => {
            console.log(success)
            res.json({
                status: 200,
                message: 'Customer/Buyer Removed successfully'
            })
        })
        .catch((err) => {
            console.log(err)
            next({
                status: 500,
                message: "Failed to Remove Customer/Buyer"
            })
        })
}