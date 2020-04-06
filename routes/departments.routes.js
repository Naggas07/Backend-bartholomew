const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/department.controller");

// middlewares

//routes
router.post("/new", departmentController.new);
router.get("/all", departmentController.getAll);
router.put("/update/:id", departmentController.update);
router.get("/detail/:id", departmentController.getDepartment);
router.delete("/delete/:id", departmentController.delete);

module.exports = router;
