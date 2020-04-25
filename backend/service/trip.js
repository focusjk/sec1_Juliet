var db = require('../dbconnection');
var transactionService = require('../service/transaction');
var util = require('../util');

const createTrip = (
	created_at,
	{
		departure_latitude,
		departure_longitude,
		departure_detail,
		destination_latitude,
		destination_longitude,
		destination_detail,
		start_datetime,
		owner,
		car_brand,
		plate_license,
		capacity,
		departure_province,
		destination_province,
		price,
	},
	callback
) => {
	return db.query(
		`INSERT INTO trip ` +
			`(departure_latitude,departure_longitude,departure_detail,
                                        destination_latitude,destination_longitude,destination_detail,
                                        start_datetime,owner,car_brand,plate_license,capacity,created_at,
                                        departure_province,destination_province,price)` +
			`VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
		[
			departure_latitude,
			departure_longitude,
			departure_detail,
			destination_latitude,
			destination_longitude,
			destination_detail,
			start_datetime,
			owner,
			car_brand,
			plate_license,
			capacity,
			created_at,
			departure_province,
			destination_province,
			price,
		],
		callback
	);
};

const searchTrip = ({ departure, destination, selectedDate }, callback) => {
	return db.query(
		`SELECT
        trip.id,
        trip.departure_detail,
        trip.departure_province,
        trip.destination_detail,
        trip.destination_province,
        trip.start_datetime,
        capacity,
        Count(Distinct request.id) AS request,
        status,
        trip.price
        FROM trip left join request on trip.id = request.trip_id AND request_status = "approved"
        WHERE trip.start_datetime LIKE '%` +
			selectedDate +
			`%' AND (
        trip.departure_province ="` +
			departure +
			`"OR
        ( trip.departure_province LIKE '%` +
			departure +
			`%' AND
        trip.destination_province LIKE '%` +
			destination +
			`%' ) OR
        trip.destination_province ="` +
			destination +
			`")AND
        trip.status = "scheduled"
        GROUP BY trip.id
        ORDER BY trip.start_datetime`,
		callback
	);
};

const getTripDetail = (trip_id, callback) => {
	return db.query(
		`SELECT
                          id,
                          departure_latitude,
                          departure_longitude,
                          departure_province,
                          departure_detail,
                          destination_latitude,
                          destination_longitude,
                          destination_province,
                          destination_detail,
                          start_datetime,
                          car_brand,
                          plate_license,
                          capacity,
                          status,
                          price,
                          owner as owner_id FROM trip WHERE id = ` + trip_id,
		callback
	);
};

const updateTripStatus = async (trip_id, status, callback) => {
	// status : 0 - pick up , 1 - drop off , 2 - cancel
	const que = await util.promisifyQuery(`SELECT trip.status FROM trip WHERE id = ? `, [trip_id]);
	const recent_status = que[0].status;
	const passenger_left = await util.promisifyQuery(
		`SELECT count(*) as amount FROM  request WHERE trip_id = ? and request_status in ('on going','paid')`,
		[trip_id]
	);
	const { amount: amount_passenger_left } = passenger_left[0];
	var trip_status;
	if (recent_status == 'scheduled' && status == 0) {
		//pick up
		trip_status = 2;
	} else if (recent_status == 'on going' && status == 1 && amount_passenger_left == 0) {
		//drop-off
		trip_status = 4;
		const left_requests = await util.promisifyQuery(
			`SELECT request.id FROM request WHERE request.trip_id = ? and request.request_status IN ('approved','pending')`,
			[trip_id]
		);
		const id_left_request = left_requests.map((i) => i.id);
		if (id_left_request.length > 0) {
			await util.promisifyQuery(
				`UPDATE request SET request.request_status = 3 WHERE request.id in (?)`,
				[id_left_request]
			);
		}
	} else {
		trip_status = recent_status;
	}
	return await db.query(
		`UPDATE trip SET status = ? WHERE id = ?`,
		[trip_status, trip_id],
		callback
	);
};

// XXXXXXXXX
const cancelTrip = async ({ trip_id, cancel_time }, callback) => {
	const request = await util.promisifyQuery(
		`SELECT request.id, request.request_status 
    FROM trip LEFT JOIN request ON trip.id = request.trip_id
    WHERE trip.id = ? AND trip.status = 'scheduled'
    AND request.request_status IN ('pending','approved','paid')`,
		[trip_id]
	);

	const request_id = request.map((data) => data.id);

	if (request_id.length > 0) {
		await util.promisifyQuery(`UPDATE request SET request_status = 'canceled' WHERE id IN (?)`, [
			request_id,
		]);
	}
	request.map(({ id, request_status }) => {
		if (request_status === 'paid') {
			transactionService.refundTransaction(id, trip_id, cancel_time);
		}
	});

	return db.query(
		`UPDATE trip SET status = 'canceled' WHERE id = ? AND status = 'scheduled'`,
		[trip_id],
		callback
	);
};

// const getPrice = (trip_id, callback) => {
// 	console.log(trip_id);
// 	return db.query(`SELECT trip.price,trip.owner FROM trip WHERE trip.id = ?`, [trip_id], callback);
// };
const getPrice = async (trip_id) =>
	await util.promisifyQuery(`SELECT trip.price,trip.owner FROM trip WHERE trip.id = ?`, [trip_id]);

const getPriceByRequestId = (request_id, callback) => {
	return db.query(
		`SELECT trip.price FROM request LEFT JOIN trip ON request.trip_id = trip.id WHERE request.id = ?`,
		[request_id],
		callback
	);
};

const getOwner = async (trip_id) => {
	const driver = await util.promisifyQuery(`SELECT owner FROM trip WHERE id = ?`, [trip_id]);
	const { owner } = driver[0];
	return owner;
};

const getTripByMemberID = (member_id, callback) => {
	return db.query(
		`SELECT id as trip_id,
                  departure_latitude,
                  departure_longitude,
                  departure_province,
                  departure_detail,
                  destination_latitude,
                  destination_longitude,
                  destination_province,
                  destination_detail,
                  start_datetime,
                  car_brand,
                  plate_license,
                  capacity,
                  status,
                  price FROM trip 
                  WHERE owner =?`,
		[member_id],
		callback
	);
};

const getAll = (callback) => {
	return db.query(
		`SELECT trip.id as trip_id,
                  trip.owner as driver_id,
                  trip.start_datetime,
                  trip.status,
                  trip.car_brand, 
                  trip.plate_license, 
                  trip.price,
                  trip.created_at,
                  trip.departure_latitude,
                  trip.departure_longitude ,
                  trip.departure_detail,
                  trip.destination_latitude,
                  trip.destination_longitude ,
                  trip.destination_detail,
                  members.username,
                  members.firstname,
                  members.lastname,
                  members.photo
                  FROM trip INNER JOIN members ON trip.owner = members.id`,
		callback
	);
};

module.exports = {
	createTrip,
	searchTrip,
	getTripDetail,
	updateTripStatus,
	cancelTrip,
	getPrice,
	getPriceByRequestId,
	getOwner,
	getTripByMemberID,
	getAll,
};
