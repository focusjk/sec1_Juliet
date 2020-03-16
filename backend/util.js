var db = require("./dbconnection");
var moment = require('moment')

var timeformatter = d => {
  var date = d.toISOString().split('T')[0];
  var time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  return date + ' ' + time;
}

const groupByDate = log => {
  const log_with_date = log.map(({ created_at, ...data }) => {
    const temp = new moment(created_at)
    const created_date = temp.format('Do MMMM YYYY');
    const created_time = temp.format('h:mm a');
    return { created_date, created_time, ...data }
  })

  const group_log = log_with_date.reduce(
    (c, { created_date, ...data }) => ({
      ...c,
      [created_date]: (c[created_date] || []).concat([data])
    }),
    {}
  );
  return group_log;
}

const promisifyQuery = (query, args) => new Promise((resolve, reject) => db.query(query, args,
  (err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  }));


module.exports = { timeformatter, promisifyQuery, groupByDate }