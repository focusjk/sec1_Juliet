var db = require("../dbconnection");

const createReport = (created_at, { member_id, topic, comment },callback) => {
    return db.query(`INSERT INTO report (topic,comment,member_id,created_at,is_read) 
                    VALUES (?,?,?,?,False)`,[ topic, comment, member_id, created_at ],callback);
}

module.exports = { createReport };
