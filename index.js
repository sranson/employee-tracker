
require(`dotenv`).config();
const mysql = require('mysql');


// create the connection information for the sql database
const connection = mysql.createConnection({
    host: 'localhost',
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: process.env.DB_USERNAME,
  
    // Your password
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  // console.log(connection);