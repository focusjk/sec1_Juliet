var Joi = require('joi');

module.exports = {
    body: {
        departure_latitude: Joi.number().required(),
        departure_longitude: Joi.number().required(),
        departure_detail: Joi.string().max(100).allow(''),
        destination_latitude: Joi.number().required(),
        destination_longitude: Joi.number().required(),
        destination_detail: Joi.string().max(100).allow('')
    }
}