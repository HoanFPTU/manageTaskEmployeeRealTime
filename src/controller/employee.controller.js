const employeeServices = require("../services/employee.service");

const employeeController = {
  LoginEmail: async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Missing Email" });
      }
      await employeeServices.CreateAccessCode(email);
      return res.status(201).json({
        success: true,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  ValidateAccessCode: async (req, res) => {
    try {
      const { accessCode, email } = req.body;
      if (!email || !accessCode) {
        return res.status(400).json({ message: "Missing data " });
      }
      await employeeServices.ValidateAccessCode(email, accessCode);
      return res.status(201).json({
        success: true,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  GetAllEmployees: async (req, res) => {
    try {
      const user = await employeeServices.getUserByPhone();
      return res.status(200).json({
        user,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  GetEmployee: async (req, res) => {
    // return res.status(400).json({ message: "Not implemented" });

    try {
      const { employeeId } = req.body;
      if (!employeeId) {
        return res.status(400).json({ message: "Missing employeeId" });
      }

      const user = await employeeServices.GetEmployeeById(employeeId);
      return res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  CreateEmployee: async (req, res) => {
    // return res.status(400).json({ message: "Not implemented" });
    try {
      console.log(req.body);
      const { name, email, department } = req.body;
      if (!name || !email || !department) {
        return res.status(400).json({ message: "Missing data" });
      }
      const employeeId = await employeeServices.CreateEmployee(
        name,
        email,
        department
      );
      return res.status(201).json({
        message: "Employee created successfully",
        employeeId: employeeId,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  EditEmployeeById: async (req, res) => {
    // return res.status(400).json({ message: "Not implemented" });
    try {
      const { employeeId, department, name } = req.body;

      if (!employeeId || !department || !name) {
        throw new Error("Missing data");
      }
      await employeeServices.EditEmployeeById(employeeId, department, name);
      return res.json({
        message: "Employee edited successfully",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  DeleteEmployee: async (req, res) => {
    // return res.status(400).json({ message: "Not implemented" });
    try {
      const { employeeId } = req.body;
      if (!employeeId) {
        return res.status(400).json({ message: "Missing employeeId" });
      }
      await employeeServices.DeleteEmployeeById(employeeId);
      return res.status(201).json({ success: true });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = employeeController;
