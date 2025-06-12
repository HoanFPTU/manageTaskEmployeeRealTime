import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mailsendapptesthoan@gmail.com",
    pass: "vage mnwy dhcm htjy",
  },
});

// Hàm gửi email
export const sendMail = async (emailTo, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: "Manager Employee Task of Hoan", // Tên người gửi
      to: emailTo,
      subject: subject,
      text: text,
    });
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};
export const sendMailHTML = async (emailTo, subject, HTML) => {
  try {
    const info = await transporter.sendMail({
      from: "mailsendapptesthoan@gmail.com", // Tên người gửi
      to: emailTo,
      subject: subject,
      html: HTML,
    });
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};
