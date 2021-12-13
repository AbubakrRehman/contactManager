const express=require('express');
const session=require('express-session');
const bodyParser=require('body-parser');
const exphbs=require('exphbs');
const cookieParser=require('cookie-parser');
//const userController=require('../controllers/userController');
const store=new session.MemoryStore();
const app=express();
app.engine('hbs', exphbs);
app.set('view engine', 'hbs');
app.set('view options', { layout: 'main' });

app.use(cookieParser());
app.use(session({
    secret:"abu",
    cookie:{maxAge:900000},
    saveUninitialized:false,
    store,
    resave:false

}));
app.use(bodyParser.urlencoded({extended:false}));


const port=process.env.PORT || 2001;



var mysql2      = require('mysql2');
var connection = mysql2.createConnection({
  host     : 'db-mysql-blr1-49817-do-user-10215911-0.b.db.ondigitalocean.com',
  user     : 'doadmin',
  password : 'GtCoH30d4BBgng7g',
  database : 'defaultdb',
  port:25060
});

connection.connect(function(err){
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });

const redirectLogin=(req,res,next)=>{
    if(!req.session.isAuthenticated)
        res.redirect("/");
    else
        next();
}

const redirectHome=(req,res,next)=>{
    console.log(req.session.isAuthenticated);
    if(req.session.isAuthenticated)
        res.redirect('/home');
    else
        next();
}

app.get("/",redirectHome,(req,res)=>{
     
    // console.log(req.session.id);
    // req.session.authenticated1=true;
    // res.send("hello bro!!!!");
    let error_msg=req.query.error_msg;
   // let login_error=JSON.parse(store.sessions[req.sessionID]).login_error;
   //let login_error=req.session.login_error;
    return res.render('login',{error_msg:error_msg});
});


app.post("/",redirectHome,(req,res)=>{
    let {username,password}=req.body;
    const query='SELECT * FROM users WHERE username=? AND password=? ';
    connection.query(query,[username,password] ,function (error, results) {
        if (error) throw error;
        if(results.length===0){
            res.redirect(`/?error_msg=no such user`);
           // req.session.error="User doesn't exist";
            //res.redirect("/");
        }
        else{
            req.session.userdata=results[0];
            req.session.isAuthenticated=true;
            //res.redirect(`/home?email=${req.session.userdata.email}`);
            res.redirect('/home');
            console.log(JSON.parse(store.sessions[req.session.id]).userdata.email);
            
        }
         
    
      });

    //res.render('login');
});

// app.get("/register",(req,res)=>{
//     res.render('register');
// });

app.get("/register",redirectHome,(req,res)=>{
        let error_msg=req.query.error_msg;
        res.render('register',{error_msg:error_msg});
});

app.post("/register",redirectHome,(req,res)=>{
    let {username,email,password}=req.body;
    const query='SELECT * FROM users WHERE username=?';
    connection.query(query,[username] ,function (error, results) {
        if (error) throw error;
        if(results.length!==0){
            res.redirect(`/register?error_msg=There's already a user with this name.`);
           // req.session.error="User doesn't exist";
            //res.redirect("/");
        }
        else{
            //req.session.userdata=results[0];
            //req.session.isAuthenticated=true;
            //res.redirect(`/home?email=${req.session.userdata.email}`);
            const query1='INSERT INTO users(username,email,password) VALUES(?,?,?)';
            const query2='CREATE TABLE ?? (id INT PRIMARY KEY AUTO_INCREMENT,first_name TEXT,last_name TEXT,email TEXT,phone BIGINT,comments TEXT,status TEXT)';
        

              connection.query(query1,[username,email,password], function (error, results, fields) {
                if (error) throw error;
                console.log('user added!!!');
              });

              connection.query(query2,[username], function (error, results, fields) {
                if (error) throw error;
                console.log('contact table corresponding to user created!!!');
              });

            res.redirect(`/register?error_msg=Signup successful.`);
            //console.log(JSON.parse(store.sessions[req.session.id]).userdata.email);
            
        }
         
    
      });
});


app.get("/home",redirectLogin,(req,res)=>{
    //let email=req.query.email;
    let userdata=JSON.parse(store.sessions[req.sessionID]).userdata;
    //res.render('home',{userdata});
    let username=userdata.username;
        connection.query('SELECT * FROM ??', [username],(err, rows) => {
            if (!err)
                res.render('home', { rows });
            else
                console.log(err);
        });
    
});

//search bar
app.post("/home",redirectLogin,(req,res)=>{
    let userdata=JSON.parse(store.sessions[req.sessionID]).userdata;
    let username=userdata.username;
    connection.query('SELECT * FROM ?? WHERE first_name LIKE ?',[username,'%'+req.body.search+'%'], (err, rows) => {
        if (!err)
            res.render('home', { rows });
        else
            console.log(err);
    });
});

app.get("/add_user",redirectLogin,(req,res)=>{
    res.render('add_user');
});
app.post("/add_user",redirectLogin,(req,res)=>{
    const {first_name,last_name,email,phone,comments}=req.body;
    let userdata=JSON.parse(store.sessions[req.sessionID]).userdata;
    let username=userdata.username;
    connection.query('INSERT INTO ?? SET first_name=?,last_name=?,email=?,phone=?,comments=?',[username,first_name,last_name,email,phone,comments], (err, rows) => {
        if (!err)
            res.render('add_user',{alert:'User added successfully!!!'});
        else
            console.log(err);
    });
});

app.get("/view_user/:id",redirectLogin,(req,res)=>{
    let userdata=JSON.parse(store.sessions[req.sessionID]).userdata;
    let username=userdata.username;
    connection.query('SELECT * FROM ?? WHERE id=?', [username,req.params.id],(err, rows) => {
        if (!err)
            res.render('view_user',{rows});
        else
            console.log(err);
    });
});


app.get("/edit_user/:id",redirectLogin,(req,res)=>{
    let userdata=JSON.parse(store.sessions[req.sessionID]).userdata;
    let username=userdata.username;
    connection.query('SELECT * FROM ?? WHERE id=?',[username,req.params.id], (err, rows) => {
        if (!err)
            res.render('edit_user', { rows });
        else
            console.log(err);
    });
});

app.post("/edit_user/:id",redirectLogin,(req,res)=>{
    let userdata=JSON.parse(store.sessions[req.sessionID]).userdata;
    let username=userdata.username;
    const {first_name,last_name,email,phone,comments} = req.body;
    connection.query('UPDATE ?? SET first_name=?,last_name=?,email=?,phone=?,comments=? WHERE id=?',[username,first_name,last_name,email,phone,comments,
        req.params.id], (err, rows) => {
        if (!err){
            connection.query('SELECT * FROM ?? WHERE id=?',[username,req.params.id], (err, rows) => {
                if (!err)
                    res.render('edit_user', { rows ,alert:'Updated Succesfully!!'});
                else
                    console.log(err);
            });
        }
        else
            console.log(err);
    });
});

app.get("/delete_user/:id",redirectLogin,(req,res)=>{
    let userdata=JSON.parse(store.sessions[req.sessionID]).userdata;
    let username=userdata.username;
    connection.query('DELETE FROM ?? WHERE id=?',[username,req.params.id], (err, rows) => {
        if (!err)
            res.redirect('/home');
        else
            console.log(err);
    });
});

app.get("/logout",redirectLogin,(req,res)=>{
    console.log(store);
    req.session.destroy((err)=>{
        console.log(store);
        res.clearCookie("connect.sid");
        res.redirect("/");
    });
    
});

app.get("/profile",redirectLogin,(req,res)=>{
    let userdata=JSON.parse(store.sessions[req.sessionID]).userdata;
    res.render('profile',{userdata});
});



app.get("*",(req,res)=>{
    //let userdata=JSON.parse(store.sessions[req.sessionID]).userdata;
    res.render('404');
});


// app.get("/home",redirectLogin,(req,res)=>{
//     let name=req.query.name;
//     res.render('home',{name:name});
// });







app.get("/delete",(req,res)=>{
    res.clearCookie('connect.sid');
    res.send("deleted");
});




//router.get("/",userController.view);



app.listen(port,()=>console.log(`listening to ${port}`));