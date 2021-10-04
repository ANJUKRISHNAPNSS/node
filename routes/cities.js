var express = require('express');
const connection = require('../config/db');
var router = express.Router();
var db=require('../config/db')

router.get('/', function(req, res, next) {
    db.query("SELECT * FROM city_table;",(err,result)=>{
        res.send(result)
    })
});
router.post("/city",(req,res)=>{
    var data=req.body
    db.query("insert into city_table values(?,?)",[data.city_no,data.city],function(err,result){
        if(err){
            throw err
        }
        res.send("data saved successfully")
    })
})
module.exports = router;