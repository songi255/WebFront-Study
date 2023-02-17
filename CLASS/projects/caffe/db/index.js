const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "43.200.177.18",
    user: "user",
    password: "1234",
    database: "order_system",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = { pool };