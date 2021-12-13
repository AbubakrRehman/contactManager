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


module.exports={redirectLogin,redirectHome};