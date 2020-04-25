var Joi = require('joi');

module.exports = {
	body: {
		departure_latitude: Joi.required(),
		departure_longitude: Joi.required(),
		departure_detail: Joi.string().max(100).min(0).allow(''),
		destination_detail: Joi.string().max(100).min(0).allow(''),
		destination_latitude: Joi.required(),
		destination_longitude: Joi.required(),
		member_id: Joi.number().required(),
		trip_id: Joi.number().required(),
	},
};
