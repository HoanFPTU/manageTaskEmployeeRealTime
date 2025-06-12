import twilio from "twilio";

const accountSid = "AC3d1645de9de68e7ce8fa179a98f0c0dd";
const authToken = "00afc2960f038269bd023eeca68b6c63";
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
