//amit
const mysql = require('mysql');
//create a connection with the database

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'khanakhajana'
    });

  
function getConnection() { //amit
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL!');
  });
  return connection;
}

// connection.query('SELECT * FROM user', (err, results) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       return;
//     }
//     console.log('Results:', results);
//   });
  
//   // Close the connection
//   connection.end();


module.exports = getConnection; //amit