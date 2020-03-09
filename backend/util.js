var timeformatter = d => {
    var date = d.toISOString().split('T')[0];
    var time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    return date + ' ' + time;
}

const promisifyQuery = (query, args) => new Promise((resolve, reject) => db.query(query, args,
    (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
}))

module.exports = { timeformatter, promisifyQuery };