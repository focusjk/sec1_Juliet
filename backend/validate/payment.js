var Joi = require('joi');

module.exports = {
    body: {
        card_holder_name: Joi.string().min(1).max(100).required(),
        card_number: Joi.string().creditCard().required(),
        card_code: Joi.string().length(3).regex(/[0-9]+/).required(),
        card_expiry_date: Joi.string().length(7).regex(/[0-1][0-9][/][0-9]{4}/).required()
    }
}