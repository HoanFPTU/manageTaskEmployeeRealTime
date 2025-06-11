const express = require("express");
const userController = require("../controller/user.controller");
const userRouter = express.Router();
userRouter.post("/getAccessCode", userController.CreateNewAccessCode);
userRouter.post("/validateAccessCode", userController.ValidateAccessCode);
userRouter.post("/createEmployee", userController.CreateEmployee);
userRouter.post("/getAllEmployee", userController.GetAllEmployees);
userRouter.post("/getEmployeeById", userController.GetEmployee);
userRouter.post("/deleteEmployeeById", userController.DeleteEmployee);

module.exports = userRouter;
