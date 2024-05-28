import mysql from "mysql";
import "dotenv/config";

// Connect through railway
const urlDB = `mysql://root:IldzwUSHqwXCkQzpYMyVMqxQiPxpSmeL@roundhouse.proxy.rlwy.net:37515/railway`;
export const db = mysql.createConnection(urlDB);

// Connect locally

// export const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// });
