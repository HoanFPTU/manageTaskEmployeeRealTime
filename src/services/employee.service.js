const { db } = require("../config/firebase");

const employeeServices = {
  CreateAccessCode: async (email) => {
    if (!email) {
      throw new Error("Missing Email");
    }
    const employee = await db
      .ref("employees")
      .orderByChild("email")
      .equalTo(email)
      .once("value");
    if (!employee.exists()) {
      throw new Error("Email does not exist");
    }
    if (!employee.val()?.active) {
      throw new Error(
        "Account is not active, Please check your email or contact to your manager"
      );
    }
    const accessCode = Math.floor(100000 + Math.random() * 900000);
    sendMail(email, "Login Access Code", `Your access code is: ${accessCode}`);
    const employeeId = Object.keys(employee.val())[0];
    return await db.ref(`employees/${employeeId}`).update({
      accessCode: accessCode,
    });
  },
  LoginEmployee: async (username, password) => {
    if (!username || !password) {
      throw new Error("Missing Username or Password");
    }
    const employeeSnapshot = await db
      .ref("employees")
      .orderByChild("username")
      .equalTo(username)
      .once("value");

    if (!employeeSnapshot.exists()) {
      throw new Error("Username does not exist");
    }
    const employeeData = employeeSnapshot.val();
    const employeeId = Object.keys(employeeData)[0];
    const employee = employeeData[employeeId];
    if (!employee.active) {
      throw new Error(
        "Account is not active. Please check your email or contact your manager."
      );
    }

    if (employee.password !== password) {
      throw new Error("Invalid password");
    }

    // ✅ Trả về ID nếu đăng nhập thành công
    return employeeId;
  },
  ActiveAccount: async (employeeId, username, password) => {
    if (!employeeId || !username || !password) {
      throw new Error("Missing data");
    }
    const employeeCheck = await db
      .ref("employees")
      .orderByChild("username")
      .equalTo(username)
      .once("value");
    console.log(employeeCheck);
    if (employeeCheck.exists()) {
      throw new Error("Username already exists");
    }

    const userSnapshot = await db.ref(`employees/${employeeId}`).once("value");
    const employee = userSnapshot.val();
    if (!employee) {
      throw new Error("Employee does not exist");
    }
    if (employee.active) {
      throw new Error(
        "Account is already active, Please login to your account"
      );
    }

    return await db.ref(`employees/${employeeId}`).update({
      username,
      password,
      active: true,
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
      await db.ref("employees/" + employeeId).update({
        accessCode: "",
      });
      return employeeId;
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
