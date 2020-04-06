const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// middlewares

//cloudinary

//routes

router.get("/allUsers", userController.getUsers);
router.get(`/filterUsers/:userType`, userController.getFilterUsers);
router.post("/new", userController.create);

module.exports = router;
