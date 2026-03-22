const { sendEmail } = require("./email");
const { emailVerificationTemplate, passwordResetTemplate, welcomeTemplate, loginAlertTemplate } = require("./emailTemplates");

const sendVerificationEmail = async({name,email,token}) => {
    const verificationUrl = `http://localhost:3000/verify-email?token=${token}`;

    return sendEmail({
        to : email,
        subject : "Verify your email address.",
        html : emailVerificationTemplate({name, verificationUrl}),
    });
}

const sendPasswordResetEmail = async({name,email,token}) => {
    const resetUrl = `http://localhost:3000/reset-password?token=${token}`;

    return sendEmail({
        to : email,
        subject : "Reset your Password.",
        html : passwordResetTemplate({name, resetUrl}),
    });
}

const sendWelcomeEmail = async({name, email}) => {
    return sendEmail({
        to : email,
        subject : "Welcome to ani5hpdl's authentication system.",
        html : welcomeTemplate({name}),
    });
}

const sendLoginAlert = async({name, email, ip, userAgent}) => {

    const time = new Date().toLocaleString("en-Us",{
        dateStyle : "full",
        timeStyle : "short",
    });

    return sendEmail({
        to : email,
        subject : "New Login detected.",
        html : loginAlertTemplate({name,ip,userAgent, time})
    });
}

module.exports = {
    sendVerificationEmail,
    sendPasswordResetEmail,
    sendWelcomeEmail,
    sendLoginAlert
}