const express = require("express");
const taskController = require("../controller/task.controller");
const taskRouter = express.Router();
// taskRouter.post("/getAccessCode", userController.CreateNewAccessCode);
// taskRouter.post("/validateAccessCode", userController.ValidateAccessCode);
taskRouter.post("/createTask", taskController.CreateTask);
taskRouter.post("/editTaskById", taskController.EditTaskById);
taskRouter.post("/getTaskById", taskController.GetTaskById);
taskRouter.post("/getAllTasks", taskController.GetAllTasks);
taskRouter.post("/deleteTaskById", taskController.DeleteTaskById);

module.exports = taskRouter;
