var express = require("express");
var router = express.Router();
var transactionService = require("../service/transaction");
var util = require("../util");

router.get("/log", (req, res, next) => {
  const { member_id } = req.query;
  transactionService.getTransaction(member_id, (err, result) => {
    if (err) {
      res.json({
        success: false,
        error: err.sqlMessage,
        message: "Cannot access database"
      });
    } else {
      res.json({ success: true, transaction: result });
    }
  });
});

module.exports = router;
