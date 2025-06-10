const express = require("express");
const { db } = require("../config/firebase");
const { generateToken } = require("../utils/jwt.utils");
const { userMiddleware } = require("../middlewares/user.middleware");
const userController = require("../controller/user.controller");

const userRouter = express.Router();
userRouter.post("/user", async (req, res) => {
  //   console.log(req.body)
  // try {
  //   const { uid, name, email } = req.body;
  //   if (!uid || !name || !email) {
  //     return res.status(400).json({ message: "Missing uid, name or email" });
  //   }
  //   await db.ref("users/" + uid).set({ name, email });
  //   res.json({ message: "User saved to Firebase Realtime Database" });
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
});
// login with otp phone
userRouter.post("/getAccessCode", userController.CreateNewAccessCode);
userRouter.post("/validateAccessCode", userController.ValidateAccessCode);

// userRouter.use(userMiddleware.verifyTokenWithOwnerRole);
userRouter.get("/users/:phone", userController.getUserByPhone);
module.exports = userRouter;
