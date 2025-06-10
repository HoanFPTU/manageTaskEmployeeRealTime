const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "InterviewHoan";

function generateToken(payload) {
  return jwt.sign({...payload,token:null} , SECRET_KEY, { expiresIn: "1WEEK" });
}


// function verifyToken(token) {
//   try {
//     return jwt.verify(token, SECRET_KEY); 
//   } catch (err) {
//     return null; 
//   }
// }
module.exports = { generateToken };