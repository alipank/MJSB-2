
exports.postCustomer = (req, res, next) => {

    const { machine_id, name, sold_price, phone } = req.body

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

    const sqlQuery = 'INSERT INTO customers (machineId, name, sold_price, phone) VALUES (?, ?, ?);'

    pool.query(sqlQuery, [machined_id, name, sold_price, phone])
}