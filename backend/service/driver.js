var db = require('../dbconnection'); //reference of dbconnection.js

const getByID = (ID, callback) => {
    console.log('get driver profile with id = ', ID)
    return db.query(`SELECT * FROM driver WHERE id=?`, [ID], callback);
}

const updateProfileByID = (ID, data, callback) => {
    console.log('update driver profile by id = ', ID);
    console.log('data', data)
    return db.query(`UPDATE User SET ? WHERE id = ?`, [data, ID], callback);
}

const driverRequest = (member_id,license,carbrand,plate,capacity,callback) => {
    console.log('add new req')
    return db.query("INSERT INTO request VALUES (" + member_id + ',"' + license + '","' + carbrand + '","' + plate + '","' + capacity + '")', callback);
}

module.exports = { getByID, updateProfileByID , driverRequest,};