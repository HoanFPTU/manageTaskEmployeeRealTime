const { db } = require("../config/firebase");

const taskService = {
  CreateTask: async (name, description, employees) => {
    if (!name || !description || !employees) {
      return res.status(400).json({ message: "Missing data" });
    }
    const id = await db.ref("tasks/").push({
      name,
      description,
      employees,
    });

    return id.key;
  },
  EditTaskById: async (taskId, name, description, employees) => {
    if (!taskId || !description || !name || !employees) {
      throw new Error("Missing data");
    }
    const userSnapshot = await db.ref(`tasks/${taskId}`).once("value");
    const task = userSnapshot.val();

    if (!task) {
      throw new Error("taskId does not exists");
    }
    return await db.ref(`tasks/${taskId}`).update({
      description,
      name,
      employees,
    });
  },
  GetTaskById: async (taskId) => {
    console.log(taskId);
    if (!taskId) {
      throw new Error("Missing taskId");
    }
    const userSnapshot = await db.ref(`tasks/${taskId}`).once("value");
    const task = userSnapshot.val();

    if (!task) {
      throw new Error("Tasks does not exists");
    }

    return task;
  },
  GetAllTasks: async () => {
    const snapshot = await db.ref("tasks").once("value");

    if (snapshot.exists()) {
      const data = snapshot.val();
      const tasks = Object.entries(data).map(([id, value]) => ({
        id,
        ...value,
      }));

      return tasks;
    } else {
      return [];
    }
  },
  DeleteTaskById: async (taskId) => {
    console.log(taskId);
    if (!taskId) {
      throw new Error("Missing taskId");
    }
    const userSnapshot = await db.ref(`tasks/${taskId}`).once("value");
    const employee = userSnapshot.val();

    if (!employee) {
      throw new Error("task does not exists");
    }
    return await db.ref(`tasks/${taskId}`).remove();
  },
};

module.exports = taskService;
