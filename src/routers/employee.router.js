const express = require("express");
const employeeController = require("../controller/employee.controller");
const employeeRouter = express.Router();
employeeRouter.post("/loginEmail", employeeController.LoginEmail);
employeeRouter.post(
  "/validateAccessCodeEmail",
  employeeController.ValidateAccessCode
);

employeeRouter.post("/getEmployeeById", employeeController.GetEmployee);
employeeRouter.post("/editEmployeeById", employeeController.EditEmployeeById);
employeeRouter.post("/deleteEmployeeById", employeeController.DeleteEmployee);
module.exports = employeeRouter;
