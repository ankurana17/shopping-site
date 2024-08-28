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
            var phoneno=req.body.phoneno
            var password=req.body.password
            var confirmpassword=req.body.confirmpassword
            const q=`insert into signup(firstname,lastname,email,password,confirmpassword,phoneno,)values('${firstname}','${lastname}','${email}','${password}','${confirmpassword}','${phoneno}')`
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
