
const {connection}=require('./mysqlConnection.js');
const {store}=require('./sessionStore.js');


exports.getLoginPage=(req,res)=>{
    // console.log(req.session.id);
    // req.session.authenticated1=true;
    // res.send("hello bro!!!!");
    let error_msg=req.query.error_msg;
   // let login_error=JSON.parse(store.sessions[req.sessionID]).login_error;
   //let login_error=req.session.login_error;
    return res.render('login',{error_msg:error_msg,layout:'loginn'});
}

exports.setSession=(req,res)=>{
    let {username,password}=req.body;
    const query="SELECT * FROM users WHERE username=? AND password=? ";
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
}

exports.getRegistrationPage=(req,res)=>{
    let error_msg=req.query.error_msg;
    res.render('register',{error_msg:error_msg,layout:'signupp'});
}

exports.registerUser=(req,res)=>{
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
            const query2=`CREATE TABLE ?? (id INT PRIMARY KEY AUTO_INCREMENT,first_name TEXT,last_name TEXT,email TEXT,phone BIGINT,comments TEXT,status INT)`;
        

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
}

exports.destroySessionNCookie=(req,res)=>{
    console.log(store);
    req.session.destroy((err)=>{
        console.log(store);
        res.clearCookie("connect.sid");
        res.redirect("/");
    });
}

