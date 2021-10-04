var express = require('express');
const connection = require('../config/db');
var router = express.Router();
var db=require('../config/db')
/* GET users listing. */
router.get('/', function(req, res, next) {
    db.query("select * from work_history",(err,result)=>{
        res.send(result)
    })
});
router.get('/:id', function(req, res, next) {
    db.query("select h.emp_id_no,h.from_date,h.to_date,s.emp_site_name from work_history h inner join emp_site_table s on h.emp_site_no= s.emp_site_no and h.emp_id_no=?",[req.params.id],(err,result)=>{
        res.send(result)
    })
});
router.get('/work_history/:id/:from_date/:to_date', function (req, res, next) {
    db.query("select * from work_history where from_date between ? and ? and emp_id_no=?",[req.params.from_date,req.params.to_date,req.params.id],(err, result) => {
        res.send(result)
    })
});
// router.get('/work_history/:id/:from_date/:to_date', function (req, res, next) {
//     db.query("select h.no,h.emp_id_no,h.from_date,h.to_date,s.emp_site_name from work_history h innerjoin emp_site_table s on h.emp_site_no=s.emp_site_no where from_date between ? and ? and emp_id_no=?",[req.params.from_date,req.params.to_date,req.params.id],(err, result) => {
//         res.send(result)
//     })
// });

router.post('/workhistory',(req,res)=>{
    data=req.body
    db.query("insert into work_history values (?,?,?,?,?)",[data.no,data.emp_id_no,data.from_date,data.to_date,data.emp_site_no],function(err,result){
        if(err){
            throw err
        }
    res.send("inserted successfully")
    })
})
router.delete('/delete/:id', function(req, res, next) {
    db.query("DELETE FROM work_history WHERE no=?",[req.params.id],(err,result)=>{
        res.send("DELETED SUCCESSFULY")
    })
});

module.exports = router