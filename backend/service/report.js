var db = require("../dbconnection");

const createReport = (created_at, { member_id, topic, comment }, callback) => {
    return db.query(`INSERT INTO report (topic,comment,member_id,created_at,is_read) 
                    VALUES (?,?,?,?,False)`, [topic, comment, member_id, created_at], callback);
}

const getAll = callback => {
    return db.query(
        `SELECT report.id as id, 
                    report.topic as topic, 
                    report.comment as comment , 
                    report.created_at as created_at,
                    report.is_read as is_read, 
                    report.member_id as member_id, 
                    members.firstName as firstname, 
                    members.lastname as lastname, 
                    members.photo as photo , 
                    members.username as username
                    FROM report INNER JOIN members ON report.member_id = members.id`,
        callback
    );
};

const setRead = ({ id, is_read }, callback) => {
    return db.query(
        `UPDATE report 
                    SET is_read = ?
                    WHERE id = ?`,
        [is_read, id],
        callback
    );
};


module.exports = { createReport, getAll, setRead };
