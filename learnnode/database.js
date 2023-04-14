const mysql = require('mysql');


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    
    password: "#Molijain7",
    database: "testing"
});

connection.connect(function(error)
{
    if(error) 
    {
        throw error;
    }
    else console.log("Connected successfully!");
});
 
module.exports = connection;
