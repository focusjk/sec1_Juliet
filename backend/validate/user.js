var Joi = require('joi');

module.exports = {
    body: {
        username: Joi.string().min(5).max(20).optional(), //should it be required?
        password: Joi.string().min(5).max(20).optional(), //should it be required?
        firstname: Joi.string().min(1).max(50).required(), 
        lastname: Joi.string().min(1).max(50).required(),
        phone_number: Joi.string().length(10).regex(/[0-9]+/).required(),
        email: Joi.string().min(5).max(200).email().required(),
        //card_holder_name: Joi.string().min(1).max(100).optional(),
        //card_number: Joi.string().creditCard().optional(),
        //card_code: Joi.string().length(3).regex(/[0-9]+/).allow(null).optional(),
        //card_expiry_date: Joi.string().length(8).regex(/[0-1][0-9][/][0-9]{4}/).allow(null).optional(),
        driving_license: Joi.string().length(25).allow(null).optional(),
    }
}