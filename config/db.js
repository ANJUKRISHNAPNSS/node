var mysql=require('mysql')
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Welcome@123',
    database:'employee_project',
    multipleStatements:true
})
connection.connect(function(err){
    if(err) throw err
    console.log("connection success")
})
module.exports=connection;