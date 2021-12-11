const express=require('express');
const router=express.Router();
const userController=require('../controllers/userController');

router.get("/",userController.view);
router.post("/",userController.search);

router.get("/add_user",userController.form);
router.post("/add_user",userController.add);

router.get("/edit_user/:id",userController.edit_user);
router.post("/edit_user/:id",userController.update_user);

router.get("/delete_user/:id",userController.delete_user);

router.get("/view_user/:id",userController.view_user);


module.exports=router;