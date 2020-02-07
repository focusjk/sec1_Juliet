const register = (username, password,firstname,lastname,phone_number,email,photo) => {
    console.log('add all data for user = ',username);
    return db.query(
      `INSERT INTO members VALUES (?,?,?,?,?,?,?)`,username,password,firstname,lastname,phone_number,email,photo
    );
  };
  
  module.exports =  { register };