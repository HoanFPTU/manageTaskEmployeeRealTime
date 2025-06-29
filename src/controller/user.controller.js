const userServices = require("../services/user.service");

const userController = {
  CreateNewAccessCode: async (req, res) => {
    // return res.status(400).json({ message: "Not implemented" });
    try {
      const { phoneNumber } = req.body;
      if (!phoneNumber) {
        return res.status(400).json({ message: "Missing phone" });
      }
      await userServices.CreateAccessCode(phoneNumber);
      return res.status(201).json({
        success: true,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  ValidateAccessCode: async (req, res) => {
    // return res.status(400).json({ message: "Not implemented" });
    try {
      const { accessCode, phoneNumber } = req.body;
      if (!phoneNumber || !accessCode) {
        return res.status(400).json({ message: "Missing data " });
      }
      const isSuccess = await userServices.ValidateAccessCode(
        phoneNumber,
        accessCode
      );
      return res.status(201).json({
        success: true,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  GetAllEmployees: async (req, res) => {
    // return res.status(400).json({ message: "Not implemented" });

    try {
      const employees = await userServices.GetAllEmployees();
      return res.status(200).json({
        data: employees,
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

      const user = await userServices.GetEmployeeById(employeeId);
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
      const employeeId = await userServices.CreateEmployee(
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
  DeleteEmployee: async (req, res) => {
    // return res.status(400).json({ message: "Not implemented" });
    try {
      const { employeeId } = req.body;
      if (!employeeId) {
        return res.status(400).json({ message: "Missing employeeId" });
      }
      await userServices.DeleteEmployeeById(employeeId);
      return res.status(201).json({ success: true });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = userController;
