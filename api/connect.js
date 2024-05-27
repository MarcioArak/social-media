import mysql from "mysql";
import "dotenv/config";

export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// export const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "m147596322",
//   database: "social",
// });