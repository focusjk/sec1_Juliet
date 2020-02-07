const login = (username, password) => {
  console.log('get all product with keyword = ', keyword);
  return db.query(
    `SELECT * FROM Admin WHERE username = ` + keyword + ` AND password = ` + keyword + ``
  );
};
module.exports = { login };

