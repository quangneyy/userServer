import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";

const salt = bcrypt.genSaltSync(10);

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

const getUserList = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwtUser",
    Promise: bluebird,
  });

  let users = [];
  // connection.query(`select * from users`, function (err, results, fields) {
  //   if (err) {
  //     console.error(err);
  //     return users;
  //   }
  //   users = results;
  //   console.log(">>> run get user list: ", users);
  //   return users;
  // });

  try {
    const [rows, fields] = await connection.execute("select * from users");
    return rows;
  } catch (error) {
    console.log(">>> check error: ", error);
  }
};

module.exports = {
  createNewUser,
  getUserList,
};
