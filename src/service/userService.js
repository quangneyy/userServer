import bcrypt from "bcryptjs";
import mysql from "mysql2";

const salt = bcrypt.genSaltSync(10);

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "jwtUser",
});

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const createNewUser = (email, password, username) => {
  let hashPass = hashUserPassword(password);

  connection.query(
    `INSERT INTO users (email, password, username) VALUES (?,?,?)`,
    [email, hashPass, username],
    function (err, results, fields) {
      if (err) {
        console.error(err);
      }
      console.log(results); // results contains rows returned by server
    }
  );
};

const getUserList = () => {
  let users = [];
  connection.query(`select * from users`, function (err, results, fields) {
    if (err) {
      console.error(err);
    }
    console.log("check results: ", results); // results contains rows returned by server
  });
};

module.exports = {
  createNewUser,
  getUserList,
};
