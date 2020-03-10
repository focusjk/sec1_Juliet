var db = require("../dbconnection");
var util = require('../util')

const createTransaction = (amount,member_id,created_at,type,callback) => {
    return db.query(`INSERT INTO transaction (amount,member_id,created_at,type) VALUES (?,?,?,?)`, [amount, member_id, created_at, type],callback);
}

const refundTransaction = async (request_id,trip_id,created_at,callback) => {
    var price = await util.promisifyQuery(`SELECT trip.price FROM trip WHERE id = ?`, [trip_id]);
    var member = await util.promisifyQuery(`SELECT request.member_id FROM request where id = ?`, [request_id]);
    var {price:amount} = price[0];
    var {member_id} = member[0];
    const type = 3;
    return createTransaction(amount,member_id,created_at,type,callback);
}

module.exports = {createTransaction,refundTransaction}; 
  