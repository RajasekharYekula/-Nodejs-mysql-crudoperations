const express = require('express');
const mysql = require ('mysql');
const bodyParser = require ('body-parser');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// database connection
var mysqlconnetion = mysql.createConnection({
    host: 'localhost',
    database : 'mypractice',
    user : 'root',
    password :'password',
    //insecureAuth : true,
    multipleStatements: true
});


mysqlconnetion.connect((err)=>{

if (!err){
    console.log('connection established successfully');
}
else{
    console.log('connection falied');
}
})

//display  all  data //

 app.post('/persons',(req,res)=>{
 
 //table colomn names, here 'persons' is table name 
        const  PersonID =  req.body.PersonID;
        const  LastName = req.body.LastName;
        const  FirstName = req.body.FirstName;
        const  Address = req.body.Address;
        const  City = req.body.City;
        
        mysqlconnetion.query('insert into persons values (?,?,?,?,?)',[PersonID,LastName,FirstName,Address,City],(err,results)=>{
            if(err){
                console.log(err)
            }
            else{
                console.log("connected..");
                res.send(apiResponse(results));
            }
        });
 })

//get items based id's  

app.post('/editPerson',(req,res)=>{
    mysqlconnetion.query('select * from persons where PersonID = ?'[req.body.id],(err,row)=>{
        if(!err){
            console.log("get row id")
            res.send(row);
            res.send (apiResponse(results));
        }
        else
        {
            //throw err;
            console.log('error error')
           
        }
    })
}) 


//delete  records


app.post('/deletepersons',(req,res)=>{
    
    mysqlconnetion.query('Delete from persons where PersonID = ?',[req.body.id],(err,rows)=>{
        if (!err){
            console.log("rows")
            // res.send(rows)
            res.send (apiResponse(rows));
        }
        else{
            console.log("data is disconnected...",err);
            
            
        }
    })
})

function apiResponse(results){
    return JSON.stringify({"status": 200, "error": null, "response": results});
}

app.listen(3000,()=>{
    console.log("express is running 3000");
});
