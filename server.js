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


//nocache
app.use(nocache())

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
    res.render("Login",{message:req.session.error||""})    
    }
})



app.post("/Login",(req,res)=>{

    const {id,password}=req.body;

    if(id==Name && password==pass){

    req.session.user=id;
    
    req.session.name=req.body.userName.toUpperCase()
        
    res.redirect("/")
    }else{
        req.session.error="Invalid Credintial"
    res.redirect("/")
    }

})


app.post("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/")
})


















const PORT=process.env.PORT || 3333

app.listen(PORT,()=>{
    console.log("Server Listen on 3333...")
})