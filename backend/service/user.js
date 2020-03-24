var db = require("../dbconnection");

const register = (username, data, created_at, amount, callback) => {
  const { password, firstname, lastname, phone_number, email, photo } = data;
  return db.query(
    `INSERT INTO members (username,password,firstname,lastname,phone_number,email,photo,created_at,amount) VALUES (?,?,?,?,?,?,?,?,?)`,
    [
      username,
      password,
      firstname,
      lastname,
      phone_number,
      email,
      photo,
      created_at,
      amount
    ],
    callback
  );
};

const getMemberInfo = (username, callback) => {
  return db.query(
    `SELECT id,username,firstname,lastname,phone_number,email,photo,driver_status,
    amount,driving_license,approved_at,approved_by,rejected_at,rejected_by,edited_at,banned_at,banned_by FROM members WHERE username = ?`,
    [username],
    callback
  ); //credit-card-related fields are removed from this line
};

function login(username, password, callback) {
  return db.query(
    `SELECT id,username,firstname,lastname,phone_number,email,photo,driver_status,
    amount,driving_license,approved_at,approved_by,rejected_at,rejected_by,edited_at,banned_at,banned_by FROM members WHERE username = ? AND password = ?`,
    [username, password],
    callback
  ); //credit-card-related fields are removed from this line
}

const editMemberInfo = (id, body, callback) => {
  const { firstname, lastname, phone_number, email, photo } = body; //credit-card-related fields are removed from this line
  return db.query(
    `UPDATE members SET firstname = ?,lastname = ? ,phone_number = ?,email = ?,photo = ?
      WHERE id = ?;`, //credit-card-related fields are removed from this line
    [firstname, lastname, phone_number, email, photo, id],
    callback
  ); //credit-card-related fields are removed from this line
};

const payment = (ID, body, callback) => {
  const {
    card_number,
    card_holder_name,
    card_expiry_date,
    card_code,
    paid_at
  } = body;
  return db.query(
    `UPDATE request SET request_status = 'paid', paid_at = ? WHERE id = ? `,
    [paid_at, ID],
    callback
  );
};

const getTripHistory = (member_id, callback) => {
  return db.query(
    `SELECT request.id as id,
                  request.departure_latitude,
                  request.departure_longitude,
                  request.departure_detail,
                  request.destination_latitude,
                  request.destination_longitude,
                  request.destination_detail,
                  request.departed_at,
                  request.driver_departed_at,
                  request.driver_arrived_at,
                  trip.id as trip_id,
                  trip.start_datetime,
                  trip.car_brand,
                  trip.plate_license,
                  trip.price,
                  request.request_status,
                  request.created_at,
                  request.paid_at,
                  request.review_id, 
                  members.id as owner_id,
                  members.username as owner_username,
                  members.firstName as owner_firstname,
                  members.lastName as owner_lastname
                  FROM trip INNER JOIN members ON trip.owner = members.id INNER JOIN request ON request.trip_id = trip.id
                  WHERE request.member_id = ?`,
    [member_id],
    callback
  );
};

const getWallet = (member_id, callback) => {
  return db.query(
    `SELECT members.amount
    FROM members
    WHERE id = ?`,
    [member_id],
    callback
  );
};

module.exports = {
  register,
  getMemberInfo,
  login,
  editMemberInfo,
  payment,
  getTripHistory,
  getWallet
};
