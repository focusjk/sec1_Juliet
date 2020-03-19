var Joi = require('joi');

module.exports = {
    body: {
        account_name: Joi.string().min(1).max(100).required(),
        account_number: Joi.string().length(10).required(),
        bank_name: Joi.string().max(20).required(),
        amount: Joi.number().positive().required()
    }
}