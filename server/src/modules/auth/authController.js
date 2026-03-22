const { where } = require("sequelize");
const User = require("./authModel");
const { sendVerificationEmail } = require("../../utils/sendEmail");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const register = async (req, res) => {

    const { name, email, password } = req.body;

    try {

        const isUserExists = await User.findOne({ where: { email } });
        if (isUserExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const rawToken = crypto.randomBytes(32).toString("hex");
        const verificationToken = crypto.createHash("sha256").update(rawToken).toString("hex");
        const verificationExpiresIn = new Date(Date.now() + 60 * 60 * 1000);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationExpiresIn,
            passwordHistory: [hashedPassword]
        });

        await sendVerificationEmail({
            name,
            email,
            token: rawToken
        });

        return res.status(201).json({
            success: true,
            message: "New User Registered Sucessfully",
            data: {
                newUser
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error: " + error
        });
    }
}

const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const fetchUser = await User.findOne({ where: { email } });
        if (!fetchUser) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials!"
            });
        }

        if (fetchUser.lockUntil && new Date(fetchUser.lockUntil) > new Date()) {
            return res.status(423).json({
                success: false,
                message: "Account Temporary locked. Try again Later!"
            });
        }

        const isValidUser = await bcrypt.compare(password, fetchUser.password);

        if (!isValidUser) {
            const nextattempts = Number(fetchUser.loginAttempts || 0) + 1;
            const shouldLock = nextattempts > 5;
            const updatePayLoad = {
                loginAttempts: nextattempts,
                lockUntil: shouldLock ? new Date(Date.now() + 60 * 60 * 1000) : null,
                lastFailedLoginAt: new Date()
            }

            await fetchUser.update(updatePayLoad);

            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        if (!fetchUser.isActive) {
            return res.status(400).json({
                success: false,
                message: "Your account isnot active. Please contact us!"
            });
        }

        if (fetchUser.isSuspended) {
            return res.status(400).json({
                success: false,
                message: "Your account is suspended due to " + fetchUser.suspensionReason,
            });
        }

        if (!isEmailVerified) {

            const rawToken = crypto.randomBytes(32).toString("hex");
            const verificationToken = crypto.createHash("sha256").update(rawToken).toString("hex");
            const verificationExpiresIn = new Date(Date.now() + 60 * 60 * 1000);
            const name = fetchUser.name;

            await sendVerificationEmail({
                name,
                email,
                token: rawToken
            });

            fetchUser.verificationToken = verificationToken;
            fetchUser.verificationExpiresIn = verificationExpiresIn;
            await fetchUser.save();

            return res.status(400).json({
                success: false,
                message: "Email isnot verified, check you mail and get verified."
            });
        }

        fetchUser.loginAttempts = 0;
        fetchUser.lastLoginAt = new Date();
        fetchUser.lastLoginIp = req.ip;
        fetchUser.lastLoginUserAgent = req.headers['user-agent'];
        await fetchUser.save();

        //cookies work here

        return res.status(200).json({
            success: true,
            message: "User Logged In Sucessfully!",
            data: {
                fetchUser
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error" + error,
        });
    }

}

module.exports = {
    register
}