const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // 
const mysql = require ('mysql');
var mysqlconnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sparity@123',
    database: 'node_react'
});
mysqlconnection.connect((err)=>{
    if(!err)
    {
        console.log('success');
    }
    else
    {
        console.log('error');
    }
})
const app = express();
 
app.use(cors())
// create express app
 
// setup the server port
const port = process.env.PORT || 5000;
 
// parse request data content type application/x-www-form-rulencoded
app.use(bodyParser.urlencoded({extended: false}));
 
// parse request data content type application/json
app.use(bodyParser.json());
 
// define root route
app.get('/', (req, res)=>{
    res.send('Hello World');
});
// import employee routes
const employeeRoutes = require('./src/routes/employee.route');
 
// create employee routes
app.use('/api/v1/employee', employeeRoutes);
app.get('/employees',(req,res)=>{
    var sql='select * from employees;'
    mysqlconnection.query(sql,(err,rows,fields)=>{
    if(!err)
    {
      success_json={
          data:rows,
          message:'success',
          status:true
      }
      res.send(success_json);
    }
    else
    {
        error_json={
            data:'',
            message:'fail',
            status:false
        }
        res.send(error_json.toString());
    }
    })
});
app.post('/employees-insert',(req,res)=>{
    var emp=req.body;
    var sql='insert into employees(id,first_name,last_name,email,phone,salary) values(?,?,?,?,?,?);';
    mysqlconnection.query(sql,[emp.id,emp.first_name,emp.last_name,emp.email,emp.phone,emp.salary],(err,rows,fields)=>{
    if(!err)
    {
        success_json={
            data:rows,
            message:'success',
            status:true
        }
        res.send(success_json);
      }
      else
      {
          error_json={
              data:'',
              message:'fail',
              status:false
          }
          res.send(error_json.toString());
      }
    });
})



 
// listen to the port
app.listen(port, ()=>{
    console.log(`Express is running at port ${port}`);
}); 