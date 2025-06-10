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
      res.status(500).json({ message: "Error" + error.message });
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
      res.status(500).json({ message: "Error" + error.message });
    }
  },
  getUserByPhone: async (req, res) => {
    // return res.status(400).json({ message: "Not implemented" });

    try {
      const phone = req.params.phone;
      if (!phone) {
        return res.status(400).json({ message: "Missing phone" });
      }

      const user = await userServices.getUserByPhone(phone);
      return res.status(200).json({
        user,
      });
    } catch (error) {
      res.status(500).json({ message: "Error" + error.message });
    }
  },
};

module.exports = userController;
