var mysql = require('mysql');
var connection = mysql.createConnection({
host:'localhost',
user:'root',
password:'',
database:'nodejs_task'
});
connection.connect(function(error){
if(!!error) {
console.log(error);
} else {
console.log('Database Connected Successfully..!!');
}
});
module.exports = connection;