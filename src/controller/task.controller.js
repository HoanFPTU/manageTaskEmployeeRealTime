const taskService = require("../services/task.service");

const taskController = {
  CreateTask: async (req, res) => {
    // return res.status(400).json({ message: "Not implemented" });
    try {
      console.log(req.body);
      const { name, description, employees } = req.body;
      if (!name || !description || !employees) {
        return res.status(400).json({ message: "Missing data" });
      }
      const taskId = await taskService.CreateTask(name, description, employees);
      return res.status(201).json({
        message: "Task created successfully",
        taskId: taskId,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  EditTaskById: async (req, res) => {
    // return res.status(400).json({ message: "Not implemented" });
    try {
      const { taskId, name, description, employees } = req.body;

      if (!taskId || !description || !name || !employees) {
        throw new Error("Missing data");
      }
      await taskService.EditTaskById(taskId, name, description, employees);
      return res.json({
        message: "Tasks edited successfully",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  DoneTaskById: async (req, res) => {
    // return res.status(400).json({ message: "Not implemented" });
    try {
      const { taskId } = req.body;

      if (!taskId) {
        throw new Error("Missing data");
      }
      await taskService.DoneTaskById(taskId);
      return res.json({
        success: true,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  GetTaskByUserId: async (req, res) => {
    // return res.status(400).json({ message: "Not implemented" });
    try {
      const { employeeId } = req.body;

      if (!employeeId) {
        throw new Error("Missing data");
      }
      const tasks = await taskService.GetTaskByUserId(employeeId);
      return res.json({
        data: tasks,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  GetAllTasks: async (req, res) => {
    try {
      const tasks = await taskService.GetAllTasks();
      return res.status(200).json({
        tasks,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  GetTaskById: async (req, res) => {
    // return res.status(400).json({ message: "Not implemented" });

    try {
      const { taskId } = req.body;
      if (!taskId) {
        return res.status(400).json({ message: "Missing taskId" });
      }

      const task = await taskService.GetTaskById(taskId);
      return res.status(200).json({ task });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  //   EditEmployeeById: async (req, res) => {
  //     // return res.status(400).json({ message: "Not implemented" });
  //     try {
  //       const { employeeId, department, name } = req.body;

  //       if (!employeeId || !department || !name) {
  //         throw new Error("Missing data");
  //       }
  //       await taskServices.EditEmployeeById(employeeId, department, name);
  //       return res.json({
  //         message: "Employee edited successfully",
  //       });
  //     } catch (error) {
  //       res.status(500).json({ message: error.message });
  //     }
  //   },
  DeleteTaskById: async (req, res) => {
    // return res.status(400).json({ message: "Not implemented" });
    try {
      const { taskId } = req.body;
      if (!taskId) {
        return res.status(400).json({ message: "Missing taskId" });
      }
      await taskService.DeleteTaskById(taskId);
      return res.status(201).json({ success: true });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = taskController;
