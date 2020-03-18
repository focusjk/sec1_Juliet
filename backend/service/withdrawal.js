var db = require("../dbconnection");
var util = require("../util");

const createWithdrawal = async (member_id, created_at, data, callback) => {
  const { amount, account_name, account_number, bank_name } = data;
  const status = "pending";
  const current_wallet_amount = await util.promisifyQuery(
    `SELECT members.amount FROM members WHERE id = ?`,
    [member_id]
  );
  if (amount <= current_wallet_amount) {
    return db.query(
      `INSERT INTO withdrawal (member_id,amount,created_at,status,account_name,account_number,bank_name) VALUES (?,?,?,?,?,?,?)`,
      [
        member_id,
        amount,
        created_at,
        status,
        account_name,
        account_number,
        bank_name
      ],
      callback
    );
  } else {
    callback(false);
  }
};

const getWithdrawal = (member_id, callback) => {
  return db.query(
    `SELECT id as withdrawal_id, amount, created_at, status,
      account_number, account_name, bank_name
      FROM withdrawal
      WHERE member_id = ?`,
    [member_id],
    callback
  );
};

module.exports = { createWithdrawal, getWithdrawal };
