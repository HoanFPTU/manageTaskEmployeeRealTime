const { db } = require("../config/firebase");

const userService = {
  CreateAccessCode: async (phoneNumber) => {
    if (!phoneNumber) {
      throw new Error("Missing phone");
    }
    const accessCode = Math.floor(100000 + Math.random() * 900000);
    return await db.ref("users/" + phoneNumber).set({
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
      return await db.ref("users/" + phoneNumber).set({
        accessCode: "",
      });
    }
  },
  getUserByPhone: async (phone) => {
    console.log(phone);
    if (!phone) {
      throw new Error("Missing phone");
    }
    const userSnapshot = await db.ref(`users/${phone}`).once("value");
    const user = userSnapshot.val();

    if (!user) {
      throw new Error("Phone not exists");
    }

    return user;
  },
  createUser: async (data) => {
    return await db.insertUser(data);
  },
};

module.exports = userService;
