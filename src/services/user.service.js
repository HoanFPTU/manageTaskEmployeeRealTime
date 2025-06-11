const { db } = require("../config/firebase");

const userService = {
  CreateAccessCode: async (phoneNumber) => {
    if (!phoneNumber) {
      throw new Error("Missing phone");
    }
    const accessCode = Math.floor(100000 + Math.random() * 900000);
    return await db.ref("users/" + phoneNumber).update({
      accessCode: accessCode,
    });
  },
  ValidateAccessCode: async (phoneNumber, accessCode) => {
    if (!phoneNumber || !accessCode) {
      throw new Error("Missing data");
    }
    const user = await db.ref(`users/${phoneNumber}`).once("value");

    if (!user.exists()) {
      throw new Error("Phone does not exist");
    } else if (user.val().accessCode != accessCode) {
      throw new Error("Invalid access code");
    } else {
      return await db.ref("users/" + phoneNumber).update({
        accessCode: "",
      });
    }
  },
  CreateEmployee: async (name, email, department) => {
    if (!name || !email || !department) {
      return res.status(400).json({ message: "Missing data" });
    }
    const id = await db.ref("employees/").push({
      name,
      email,
      department,
    });

    return id.key;
  },
  GetAllEmployees: async () => {
    const snapshot = await db.ref("employees").once("value");

    if (snapshot.exists()) {
      const data = snapshot.val();
      const employees = Object.entries(data).map(([id, value]) => ({
        id,
        ...value,
      }));

      return employees;
    } else {
      return [];
    }
  },
  GetEmployeeById: async (employeeId) => {
    console.log(employeeId);
    if (!employeeId) {
      throw new Error("Missing employeeId");
    }
    const userSnapshot = await db.ref(`employees/${employeeId}`).once("value");
    const employee = userSnapshot.val();

    if (!employee) {
      throw new Error("employeeId does not exists");
    }

    return employee;
  },
  DeleteEmployeeById: async (employeeId) => {
    console.log(employeeId);
    if (!employeeId) {
      throw new Error("Missing employeeId");
    }
    const userSnapshot = await db.ref(`employees/${employeeId}`).once("value");
    const employee = userSnapshot.val();

    if (!employee) {
      throw new Error("employeeId does not exists");
    }
    return await db.ref(`employees/${employeeId}`).remove();
  },
};

module.exports = userService;
