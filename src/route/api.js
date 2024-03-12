const express = require('express');
const userController = require('../controller/userController');
const toDoController = require('../controller/toDoController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// User registration, login, profile read, profile update api
router.post("/userRegistration",userController.userRegistration);
router.post("/userLogin",userController.userLogin);
router.get("/userProfileRead",authMiddleware,userController.userProfileRead);
router.post("/userProfileUpdate",authMiddleware,userController.userProfileUpdate);

// User auth by JWT token api
router.post("/userEmailVerify/:email",userController.userEmailVerify);
router.post("/userOtpVerify/:email/:otp",userController.userOtpVerify);
router.post("/userPasswordReset/:email/:otp/:password",userController.userPasswordReset);


// to do api
router.post("/userToDoCreate", authMiddleware, toDoController.userToDoCreate);
router.get("/userToDoRead", authMiddleware, toDoController.userToDoRead);
router.post("/userToDoUpdate/:id", authMiddleware, toDoController.userToDoUpdate);
router.post("/userToDoDelete/:id", authMiddleware, toDoController.userToDoDelete);
router.post("/userToDoComplete/:id", authMiddleware, toDoController.userToDoUpdate);
router.post("/userToDoCancel/:id", authMiddleware, toDoController.userToDoCancel);





module.exports=router;