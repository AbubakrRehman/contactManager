const mysql = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Abubakr@7086',
    database: 'my_db',
    multipleStatements: true,
    port:3306
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('Database Connected!!!!');
});


exports.view = (req, res) => {
    connection.query('SELECT * FROM user', (err, rows) => {
        if (!err)
            res.render('home', { rows });
        else
            console.log(err);
    });
}


exports.search = (req, res) => {
    connection.query('SELECT * FROM user WHERE first_name LIKE ?',['%'+req.body.search+'%'], (err, rows) => {
        if (!err)
            res.render('home', { rows });
        else
            console.log(err);
    });
}

exports.form=(req,res)=>{
    res.render('add_user');
}

exports.add = (req, res) => {
    const {first_name,last_name,email,phone,comments}=req.body;
    connection.query('INSERT INTO user SET first_name=?,last_name=?,email=?,phone=?,comments=?',[first_name,last_name,email,phone,comments], (err, rows) => {
        if (!err)
            res.render('add_user',{alert:'User added successfully!!!'});
        else
            console.log(err);
    });
}


exports.edit_user = (req, res) => {
    connection.query('SELECT * FROM user WHERE id=?',[req.params.id], (err, rows) => {
        if (!err)
            res.render('edit_user', { rows });
        else
            console.log(err);
    });
}


exports.update_user = (req, res) => {
    const {first_name,last_name,email,phone,comments} = req.body;
    connection.query('UPDATE user SET first_name=?,last_name=?,email=?,phone=?,comments=? WHERE id=?',[first_name,last_name,email,phone,comments,
        req.params.id], (err, rows) => {
        if (!err){
            connection.query('SELECT * FROM user WHERE id=?',[req.params.id], (err, rows) => {
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



exports.delete_user = (req, res) => {
    connection.query('DELETE FROM user WHERE id=?',[req.params.id], (err, rows) => {
        if (!err)
            res.redirect('/');
        else
            console.log(err);
    });
}


exports.view_user = (req, res) => {
    connection.query('SELECT * FROM user WHERE id=?', [req.params.id],(err, rows) => {
        if (!err)
            res.render('view_user',{rows});
        else
            console.log(err);
    });
}