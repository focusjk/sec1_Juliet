var db = require('../dbconnection');

const payment = (ID, body, callback) => {
    const {
        card_number,
        card_holder_name,
        card_expiry_date,
        card_code,
        paid_at
    } = body;
    // call external service
    return db.query(
        `UPDATE request SET request_status = 'paid', paid_at = ? WHERE id = ? `,
        [paid_at, ID],
        callback
    );
};

module.exports = { payment };