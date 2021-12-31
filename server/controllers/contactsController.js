const {connection}=require('./mysqlConnection.js');
const {store}=require('./sessionStore.js');


exports.getAllContacts = (req, res) => {
    let userdata=JSON.parse(store.sessions[req.sessionID]).userdata;
    let username=userdata.username;
        connection.query('SELECT * FROM ??', [username],(err, rows) => {
            if (!err)
                res.render('home', { rows });
            else
                console.log(err);
        });
}

exports.bookmark = (req, res) => {
    let userdata=JSON.parse(store.sessions[req.sessionID]).userdata;
    let username=userdata.username;
        connection.query('SELECT * FROM ?? WHERE status=1', [username],(err, rows) => {
            if (!err)
                res.render('bookmark', { rows });
            else
                console.log(err);
        });
}

exports.getContactBySearchText=(req,res)=>{
    let userdata=JSON.parse(store.sessions[req.sessionID]).userdata;
    let username=userdata.username;
    connection.query('SELECT * FROM ?? WHERE first_name LIKE ?',[username,'%'+req.body.search+'%'], (err, rows) => {
        if (!err)
            res.render('home', { rows });
        else
            console.log(err);
    });
}

exports.getAddContactForm=(req,res)=>{
    res.render('add_user');
}

exports.addContact=(req,res)=>{
    const {first_name,last_name,email,phone,comments}=req.body;
    let userdata=JSON.parse(store.sessions[req.sessionID]).userdata;
    let username=userdata.username;
    connection.query('INSERT INTO ?? SET first_name=?,last_name=?,email=?,phone=?,comments=?,status=0',[username,first_name,last_name,email,phone,comments], (err, rows) => {
        if (!err)
            res.render('add_user',{alert:'User added successfully!!!'});
        else
            console.log(err);
    });
}

exports.getContact=(req,res)=>{
    let userdata=JSON.parse(store.sessions[req.sessionID]).userdata;
    let username=userdata.username;
    connection.query('SELECT * FROM ?? WHERE id=?', [username,req.params.id],(err, rows) => {
        if (!err)
            res.render('view_user',{rows});
        else
            console.log(err);
    });
}

exports.getEditContactForm=(req,res)=>{
    let userdata=JSON.parse(store.sessions[req.sessionID]).userdata;
    let username=userdata.username;
    connection.query('SELECT * FROM ?? WHERE id=?',[username,req.params.id], (err, rows) => {
        if (!err)
            res.render('edit_user', { rows });
        else
            console.log(err);
    });
}

exports.updateContact=(req,res)=>{
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
}


exports.deleteContact=(req,res)=>{
    let userdata=JSON.parse(store.sessions[req.sessionID]).userdata;
    let username=userdata.username;
    connection.query('DELETE FROM ?? WHERE id=?',[username,req.params.id], (err, rows) => {
        if (!err)
            res.redirect('/home');
        else
            console.log(err);
    });
}

exports.getUserDetails=(req,res)=>{
    let userdata=JSON.parse(store.sessions[req.sessionID]).userdata;
    res.render('profile',{userdata});
}



exports.editUserDetailsPage=(req,res)=>{
    let userdata=JSON.parse(store.sessions[req.sessionID]).userdata;
    res.render('profile_edit',{userdata});
}


exports.unMark=(req,res)=>{
    let userdata=JSON.parse(store.sessions[req.sessionID]).userdata;
    let username=userdata.username;
    
    connection.query('UPDATE ?? SET status=0 WHERE id=?',[username,req.params.id], (err, rows) => {
        if (err) console.log(err);
        res.redirect("/home");
    });
    
}


exports.mark=(req,res)=>{
    let userdata=JSON.parse(store.sessions[req.sessionID]).userdata;
    let username=userdata.username;
    
    connection.query('UPDATE ?? SET status=1 WHERE id=?',[username,req.params.id], (err, rows) => {
        if (err) console.log(err);
        res.redirect("/home");
    });
    
}
