const { db } = require("../config/firebase");

const employeeServices = {
  CreateAccessCode: async (email) => {
    if (!email) {
      throw new Error("Missing Email");
    }
    const accessCode = Math.floor(100000 + Math.random() * 900000);
    const employee = await db
      .ref("employees")
      .orderByChild("email")
      .equalTo(email)
      .once("value");
    if (!employee.exists()) {
      throw new Error("Email does not exist");
    }
    const employeeId = Object.keys(employee.val())[0];
    return await db.ref(`employees/${employeeId}`).update({
      accessCode: accessCode,
    });
  },
  ValidateAccessCode: async (email, accessCode) => {
    if (!email || !accessCode) {
      throw new Error("Missing data");
    }

    const employee = await db
      .ref("employees")
      .orderByChild("email")
      .equalTo(email)
      .once("value");

    if (!employee.exists()) {
      throw new Error("Email does not exist");
    }
    const employeeId = Object.keys(employee.val())[0];

    if (employee.val()[employeeId].accessCode != accessCode) {
      throw new Error("Invalid access code");
    } else {
      return await db.ref("employees/" + employeeId).update({
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
  EditEmployeeById: async (employeeId, department, name) => {
    console.log(employeeId);
    if (!employeeId || !department || !name) {
      throw new Error("Missing data");
    }
    const userSnapshot = await db.ref(`employees/${employeeId}`).once("value");
    const employee = userSnapshot.val();

    if (!employee) {
      throw new Error("employeeId does not exists");
    }
    return await db.ref(`employees/${employeeId}`).update({
      department,
      name,
    });
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

module.exports = employeeServices;
