const express=require('express');
const session=require('express-session');
const bodyParser=require('body-parser');
const exphbs=require('exphbs');
const cookieParser=require('cookie-parser');
//const userController=require('../controllers/userController');
const contactsController=require('./server/controllers/contactsController.js');
const usersController=require('./server/controllers/usersController.js');

const {store}=require('./server/controllers/sessionStore.js');
const app=express();
app.use(express.static('public'));

app.engine('hbs', exphbs);
app.set('view engine', 'hbs');
app.set('view options',{layout:"main"});

app.use(cookieParser());
app.use(session({
    secret:"abu",
    cookie:{maxAge:900000},
    saveUninitialized:false,
    store,
    resave:false

}));
app.use(bodyParser.urlencoded({extended:false}));


const port=process.env.PORT || 80;








const router=require('./server/routes/contacts.js');
app.use("/",router);




app.listen(port,()=>console.log(`listening to ${port}`));