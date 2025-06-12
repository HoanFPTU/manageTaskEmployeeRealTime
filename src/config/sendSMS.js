import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = new twilio(accountSid, authToken);
export const sendSMS = async (to, body) => {
  try {
    const message = await client.messages.create({
      body,
      from: +13072982979,
      to,
    });
    return message;
  } catch (error) {
    console.error("Error sending SMS:", error);
    throw error;
  }
};
