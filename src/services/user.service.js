const { db } = require("../config/firebase");
const { sendMail, sendMailHTML } = require("../config/mailSever");
const { sendSMS } = require("../config/sendSMS");

const userService = {
  CreateAccessCode: async (phoneNumber) => {
    if (!phoneNumber) {
      throw new Error("Missing phone");
    }
    const accessCode = Math.floor(100000 + Math.random() * 900000);
    sendSMS(
      "+84" + phoneNumber.slice(1),
      "Access code for Manage Task App: " + accessCode
    );
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
    const employee = await db
      .ref("employees")
      .orderByChild("email")
      .equalTo(email)
      .once("value");

    if (employee.exists()) {
      throw new Error("Email already exists");
    }
    const id = await db.ref("employees/").push({
      name,
      email,
      department,
    });
    sendMailHTML(
      email,
      "Welcome to Manage Task App",
      `
    <p>Hi, ${name}</p>
    <p>Welcome to Manage Task App, your account just be created</p>
    <p>To active account please click this link <a href="${`http://localhost:5173/activeAccount?id=${id.key}`}>Click here</a></p>
  `
    );

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
