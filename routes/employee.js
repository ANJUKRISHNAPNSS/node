var express = require('express');
const connection = require('../config/db');
var router = express.Router();
var db=require('../config/db')
/* GET users listing. */
// router.get('/', function(req, res, next) {
//     db.query("select e.emp_id_no,e.first_name,e.last_name,e.mobile,e.email,e.password,s.emp_site_name,c.city,e.dob,w.work_hours,w.from_date,w.to_date,w.monthly_salary from((employee_details e inner join emp_site_table s on e.emp_site=s.emp_site_no) inner join city_table c on e.city=c.city_no) inner join emp_work_table w on e.emp_id_no=w.emp_id_no;",(err,result)=>{
//         res.send(result)
//     })
// });
router.get('/:id', function(req, res, next) {
    db.query("select e.emp_id_no,e.first_name,e.last_name,e.mobile,e.email,e.password,s.emp_site_name,c.city,e.dob,w.work_hours,w.from_date,w.to_date,w.monthly_salary from((employee_details e inner join emp_site_table s on e.emp_site=s.emp_site_no) inner join city_table c on e.city=c.city_no) inner join emp_work_table w on e.emp_id_no=w.emp_id_no and e.emp_id_no=?",[req.params.id],(err,result)=>{
        res.send(result)
    })
});
router.get('/site/:id', function(req, res, next) {
    db.query("select * from employee_details where emp_site=?",[req.params.id],(err,result)=>{
        res.send(result)
    })
});
router.get('/', function(req, res, next) {
    db.query("SELECT * FROM employee_details;",(err,result)=>{
        res.send(result)
    })
});


router.post("/empdet",(req,res)=>{
    var data=req.body
    db.query("insert into employee_details values(?,?,?,?,?,?,?,?,?)",[data.emp_id_no,data.first_name,data.last_name,data.mobile,data.email,data.password,data.emp_site,data.dob,data.city],function(err,result){
       
        if(err){
            throw err
        }
        res.send({messege:"data saved successfully"})
    })
})
// router.post("/data2",(req,res)=>{
//     var data=req.body
//     db.query("insert into emp_site_table values(?,?)",[data.emp_site_no,data.emp_site_name],function(err,result){
        
//         if(err){
//             throw err
//         }
//         res.send("data saved successfully")
//     })
// })

// router.post("/data3",(req,res)=>{
//     var data=req.body
//     db.query("insert into city_table values(?,?)",[data.city_no,data.city],function(err,result){
//         if(err){
//             throw err
//         }
//         res.send("data saved successfully")
//     })
// })



router.delete('/delete/:id', function(req, res, next) {
    db.query("DELETE FROM employee_details WHERE emp_id_no=?",[req.params.id],(err,result)=>{
        if(err) throw err
        res.send("DELETED SUCCESSFULY")
    })
});


// router.put('/update/:id',function(req,res){
//     var data=req.body
//     db.query("update employee_details  set first_name=?,last_name=?, mobile=?,email=?,password=?,emp_site=?,dob=?,city=? where emp_id_no=?",[data.first_name,data.last_name,data.mobile,data.email,data.password,data.emp_site,data.dob,data.city,req.params.id],(err,result)=>{
//         if(err) throw err
        
//         res.send("data updated")
//     })
// })
router.put('/update/:id',function(req,res){
    var data=req.body
    db.query("update employee_details  set first_name=?,last_name=?, mobile=?,email=?,password=?,emp_site=?,dob=?,city=? where emp_id_no=?",[data.first_name,data.last_name,data.mobile,data.email,data.password,data.emp_site,data.dob,data.city,req.params.id],(err,result)=>{
        try{if(err) throw err
        
        res.send({messege:"data updated"})}
        catch{
            res.status(500).send({messege:"failure"})
        }
    })
})


module.exports = router;
