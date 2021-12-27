const mysql2 = require('mysql2');

var connection = mysql2.createConnection({
    host     : 'db-mysql-blr1-77276-do-user-10515190-0.b.db.ondigitalocean.com',
    user     : 'doadmin',
    password : 'IzAuJnoqnKcC7cRV',
    database : 'defaultdb',
    port:25060
  });

  // var connection = mysql2.createConnection({
  //   host     : 'localhost',
  //   user     : 'root',
  //   password : 'Abubakr@7086',
  //   database : 'my_db',
  //   port:3306
  // });

  connection.connect(function(err){
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });

  module.exports={
      connection
  }