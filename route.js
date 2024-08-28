const express=require('express')
const router=express.Router()
const mysql_connect=require('./mysql_connector')
const connection=require('./mysql_connector')
router.get("/",(req,res)=>
{
    res.render("index")
    res.end()
})
router.use("/signup",(req,res)=>{
    if(req.method==='GET'){
        res.render("signup")
        res.end()
    }
    else
    {
    mysql_connect.getConnection((err,connection)=>
        {
        if(err){
            connection.release()
            res.send(err)
            res.end()
        }
        else{
            var firstname=req.body.firstname
            var lastname=req.body.lastname
            var email=req.body.email
            var password=req.body.password
            var confirmpassword=req.body.confirmpassword
            var phoneno=req.body.phoneno
            var gender=req.body.gender
            const q=`insert into signup(firstname,lastname,email,password,phoneno,gender,confirmpassword)values('${firstname}','${lastname}','${email}','${password}','${confirmpassword}''${phoneno}','${gender}',)`
            connection.query(q,(err)=>
            {
                if(err){
                    connection.release()
                    res.render()
                    res.end()
                }
                else{
                    res.render('index',{message:email+"added successfully"})
                    res.end()
                }
            })
        }
    })
    }
})
module.exports=router
