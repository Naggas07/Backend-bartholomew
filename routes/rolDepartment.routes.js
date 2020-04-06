const express = require("express");
const router = express.Router();
const rolDepartmentController = require("../controllers/rolDepartment.controller");

// middlewares

//routes

router.post("/new", rolDepartmentController.create);
router.get("/all", rolDepartmentController.getRoles);
router.get(
  "/getDepartment/:department",
  rolDepartmentController.getDepartmentRoles
);
router.put("/update/:id", rolDepartmentController.update);
router.delete("/delete/:id", rolDepartmentController.delete);

module.exports = router;
