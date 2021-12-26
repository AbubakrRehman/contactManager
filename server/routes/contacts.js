const express=require('express');
const router=express.Router();
const usersController=require('../controllers/usersController');
const contactsController=require('../controllers/contactsController');
const {redirectLogin,redirectHome}=require('./authfunc.js');
//renders login page if not authenticated.
router.get("/",redirectHome,usersController.getLoginPage);

//set cookies and session and renders home page if authentication is sucessful.
//otherwise renders login pagw with fail msg.
router.post("/",redirectHome,usersController.setSession);

// app.get("/register",(req,res)=>{
//     res.render('register');
// });

router.get("/register",redirectHome,usersController.getRegistrationPage);

router.post("/register",redirectHome,usersController.registerUser);

//renders home page with all contact details available
router.get("/home",redirectLogin,contactsController.getAllContacts);

//renders home page with searched contact
router.post("/home",redirectLogin,contactsController.getContactBySearchText);
//renders add_contact page to accept input data
router.get("/add_user",redirectLogin,contactsController.getAddContactForm);


//renders add_contact page after input data accepted.
router.post("/add_user",redirectLogin,contactsController.addContact);
//renders view_contact/:id page with metioned id contact details
router.get("/view_user/:id",redirectLogin,contactsController.getContact);

//renders edit_contact/:id page to accept input data
router.get("/edit_user/:id",redirectLogin,contactsController.getEditContactForm);

//renders edit_contact page with msg after contact is updated.
router.post("/edit_user/:id",redirectLogin,contactsController.updateContact);


//renders refreshed home page after removing conatact.
router.get("/delete_user/:id",redirectLogin,contactsController.deleteContact);

router.get("/logout",redirectLogin,usersController.destroySessionNCookie);

router.get("/profile",redirectLogin,contactsController.getUserDetails);

router.post("/unmark/:id",redirectLogin,contactsController.unMark);

router.post("/mark/:id",redirectLogin,contactsController.mark);

router.get("/bookmark",redirectLogin,contactsController.bookmark);



router.get("*",(req,res)=>{
    //let userdata=JSON.parse(store.sessions[req.sessionID]).userdata;
    res.render('404');
});


// app.get("/home",redirectLogin,(req,res)=>{
//     let name=req.query.name;
//     res.render('home',{name:name});
// });







router.get("/delete",(req,res)=>{
    res.clearCookie('connect.sid');
    res.send("deleted");
});




//router.get("/",userController.view);

module.exports=router;