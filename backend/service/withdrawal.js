var db = require("../dbconnection");
var util = require("../util");
var memberService = require('./member')

const createWithdrawal = async (member_id, created_at, data, callback) => {
  const { amount, account_name, account_number, bank_name } = data;
  const status = "pending";
  memberService.getWallet(member_id, (err, result) => {
    if (err) callback(true);
    const { amount: current_wallet_amount } = result[0];
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
      callback(true);
    }
  })
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

const getWithdrawalRequest = callback => {
  return db.query(
    `SELECT withdrawal.id as id , 
            withdrawal.member_id as member_id, 
            withdrawal.amount as amount, 
            withdrawal.created_at as created_at, 
            withdrawal.account_name as account_name, 
            withdrawal.account_number as account_number, 
            withdrawal.bank_name as bank_name,
            members.username as username, 
            members.photo as photo, 
            members.amount as balance, 
            members.firstname as firstname, 
            members.lastname as lastname
    FROM withdrawal INNER JOIN members ON withdrawal.member_id = members.id where withdrawal.status = 'pending'`,
    callback
  );
};

const withdrawalAction = async (
  admin_name,
  time,
  withdrawal_id,
  action,
  callback
) => {
  if (!action) {
    const status = "approved";
    const member = await util.promisifyQuery(
      `SELECT withdrawal.member_id, withdrawal.amount FROM withdrawal WHERE withdrawal.id = ?`,
      [withdrawal_id]
    );
    const { member_id, amount } = member[0];
    transactionService.createTransaction(-amount, member_id, time, "withdraw");
    const wallet_amount = await util.promisifyQuery(
      `SELECT members.amount FROM members WHERE members.id = ?`,
      [member_id]
    );
    const { amount: balance } = wallet_amount[0];
    const updated_amount = balance - amount;
    memberService.updateWallet(updated_amount, member_id);
    return db.query(
      `UPDATE withdrawal SET approved_by = ?, approved_at = ?, status = ? WHERE id = ?`,
      [admin_name, time, status, withdrawal_id],
      callback
    );
  }
  if (action) {
    const status = "rejected";
    return db.query(
      `UPDATE withdrawal SET rejected_by = ?, rejected_at = ?, status = ? WHERE id = ?`,
      [admin_name, time, status, withdrawal_id],
      callback
    );
  }
};

module.exports = { createWithdrawal, getWithdrawal, getWithdrawalRequest, withdrawalAction };
