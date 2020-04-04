var db = require("../dbconnection");
var util = require("../util");
var memberService = require('./member')

const createTransaction = (amount, member_id, created_at, type, callback) => {
  return db.query(
    `INSERT INTO transaction (amount,member_id,created_at,type) VALUES (?,?,?,?)`,
    [amount, member_id, created_at, type],
    callback
  );
};

const refundTransaction = async (request_id, trip_id, created_at, callback) => {
  const price = await util.promisifyQuery(
    `SELECT trip.price FROM trip WHERE id = ?`,
    [trip_id]
  );
  const member = await util.promisifyQuery(
    `SELECT request.member_id FROM request where id = ?`,
    [request_id]
  );
  const { price: trip_price } = price[0];
  const { member_id } = member[0];
  const type = 3;
  createTransaction(trip_price, member_id, created_at, type, callback);
  const wallet_amount = await util.promisifyQuery(
    `SELECT members.amount FROM members WHERE members.id = ?`,
    [member_id]
  );
  const { amount: member_wallet_amount } = wallet_amount[0];
  const updated_amount = trip_price + member_wallet_amount;
  memberService.updateWallet(updated_amount, member_id, callback);
};

const getTransaction = (member_id, callback) => {
  return db.query(
    `SELECT id as transaction_id, amount, withdrawal_id, created_at, type, note
    FROM transaction
    WHERE transaction.member_id = ?`,
    [member_id],
    callback
  );
};

module.exports = {
  createTransaction,
  refundTransaction,
  getTransaction
};
