var db = require("../dbconnection");

const createTransaction = (amount,member_id,created_at,type,callback) => {
    return db.query(`INSERT INTO transaction (amount,member_id,created_at,type) VALUES (?,?,?,?)`, [amount, member_id, created_at, type],callback);
}

const refundTransaction = async (request_id,trip_id,created_at,callback) => {
    var amount = await promisifyQuery(`SELECT trip.price FROM trip WHERE trip_id = ?`, [trip_id]);
    var member_id = await promisifyQuery(`SELECT request.member_id FROM request where request_id = ?`, [request_id]);
    const type = 3;
    return createTransaction(amount,member_id,created_at,type,callback);
}

module.exports = {createTransaction,refundTransaction};
  