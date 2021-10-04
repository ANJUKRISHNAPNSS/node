var express = require('express');
const connection = require('../config/db');
var router = express.Router();
var db=require('../config/db')


router.get('/', function(req, res, next) {
    db.query("select e.emp_id_no,e.first_name,e.last_name,e.mobile,e.email,e.password,s.emp_site_name,c.city,e.dob,w.work_hours,w.from_date,w.to_date,w.monthly_salary from((employee_details e inner join emp_site_table s on e.emp_site=s.emp_site_no) inner join city_table c on e.city=c.city_no) inner join emp_work_table w on e.emp_id_no=w.emp_id_no;",(err,result)=>{
        res.send(result)
    })
});
module.exports = router