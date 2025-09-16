const express=require("express")
const app=express()
const session=require("express-session")
const nocache=require("nocache")


//session handling
app.use(session({
    secret:"cat",
    resave:false,
    saveUnintialized:true
}))


//Middleware add public folder
app.use(express.static("public"))


//Middleware parsing data
app.use(express.urlencoded({extended:false}))


//Set View Eninge
app.set("view engine","ejs")


//credintial
const Name="Anshif"
const pass="369"


app.get("/",(req,res)=>{
    if(req.session.user){
        res.render("Home",{user:req.session.name})
    }else{
    res.render("Login",{message:""})    
    }
})



app.post("/Login",(req,res)=>{

    const {userName,id,password}=req.body;

    const user=userName.toUpperCase();

    req.session.user=user;

    if(id==Name &&password==pass){
    
    req.session.name=req.body.id
        
    res.render("Home",{user})
    }else{
    res.render("Login",{message:"Invalid Credintial"})
    }

})



app.get("/Login",(req,res)=>{
    res.render("index",Name)    
})



















const PORT=process.env.PORT || 3333

app.listen(PORT,()=>{
    console.log("Server Listen on 3333...")
})