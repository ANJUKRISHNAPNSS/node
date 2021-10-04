
var express = require('express');
const connection = require('../config/db');
var router = express.Router();
var db=require('../config/db')
router.get('/', function(req, res, next) {
    db.query("SELECT * FROM emp_work_table;;",(err,result)=>{
        res.send(result)
    })
});
router.post("/workdata",(req,res)=>{
    var data=req.body
    db.query("insert into emp_work_table values(?,?,?,?,?,?)",[data.work_id,data.emp_id_no,data.work_hours,data.from_date,data.to_date,data.monthly_salary],function(err,result){
        if(err){
            throw err
        }
        
        res.send("data saved successfully")
    })
})

router.put('/update/:work_id', function (req, res) {
   
    var data=req.body
    db.query("update emp_work_table set emp_id_no=?,work_hours=?,from_date=?,to_date=?,monthly_salary=? where work_id=?", [data.emp_id_no,data.work_hours,data.from_date,data.to_date,data.monthly_salary,req.params.work_id],function(err,result){
        if(err){
            throw err
        }
        db.query("insert into work_history values (?,?,?,?,?)",[data.no,data.emp_id_no,data.from_date,data.to_date,data.emp_site_no],function(err,result){
            if(err){
                throw err
            }
        
        })
        res.send("data updated sucessfully")
    })
});

router.delete('/delete/:id', function(req, res, next) {
    db.query("DELETE FROM emp_work_table WHERE work_id=?",[req.params.id],(err,result)=>{
        res.send("DELETED SUCCESSFULY")
    })
});
// router.post('/data5',(req,res)=>{
//     data=req.body
//     db.query("insert into work_history values (?,?,?,?,?)",[data.no,data.emp_id_no,data.from_date,data.to_date,data.emp_site_no],function(err,result){
//         if(err){
//             throw err
//         }
//     res.send("inserted successfully")
//     })
// })

// router.put('/:id', function (req, res) {
   
//     var data=req.body
//     db.query("update emp_work_table set to_date=? where emp_id_no=?", [data.to_date,req.params.id],function(err,result){
//         if(err){
//             throw err
//         }
//         res.send("data updated sucessfully")
//     })
// });

module.exports = router;