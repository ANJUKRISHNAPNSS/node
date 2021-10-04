var express = require('express');
const connection = require('../config/db');
var router = express.Router();
var db=require('../config/db')

router.get('/', function(req, res, next) {
    db.query("SELECT * FROM emp_site_table;",(err,result)=>{
        res.send(result)
    })
});
router.post("/sites",(req,res)=>{
    var data=req.body
    db.query("insert into emp_site_table values(?,?)",[data.emp_site_no,data.emp_site_name],function(err,result){
        
        if(err){
            throw err
        }
        res.send("data saved successfully")
    })
})
router.delete('/delete/:id', function(req, res, next) {
    db.query("DELETE FROM emp_site_table WHERE emp_site_no=?",[req.params.id],(err,result)=>{
        if(err) throw err
        res.send("DELETED SUCCESSFULY")
    })
});
module.exports = router;