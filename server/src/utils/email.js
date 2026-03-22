const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
});

transport.verify((error) => {
    if (error) {
        console.log("Email Service Error:", error.message);
    } else {
        console.log("Email service working.")
    }
});

const sendEmail = async ({ to, subject, html }) => {
    try {

        const info = await transport.sendMail({
            from: `"Authentication System of ani5hpdl" <${process.env.EMAIL_USER}> `,
            to,
            subject,
            html,
        });

        console.log("Email Sent: ", info.messageId);
        return ({
            success: true,
            message: "Email Sent Sucessfully"
        });

    } catch (error) {

        return ({
            success: false,
            message: error.message
        });

    }
}

module.exports = { sendEmail };