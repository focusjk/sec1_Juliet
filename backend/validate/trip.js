var Joi = require('joi');

module.exports = {
    body: {
        departure_latitude: Joi.number().required(),
        departure_longitude: Joi.number().required(),
        departure_detail: Joi.string().max(50).required(),
        departure_province: Joi.string().required(),
        destination_latitude: Joi.number().required(),
        destination_longitude: Joi.number().required(),
        destination_detail: Joi.string().max(50).required(),
        destination_province: Joi.string().required(),
        start_datetime: Joi.string().isoDate().required(),
        owner: Joi.number().required(),
        car_brand: Joi.string().max(50).required(),
        plate_license: Joi.string().max(7).required(),
        capacity: Joi.number().positive().integer().required(),
        price: Joi.number().precision(2).positive().required(),
    }
}