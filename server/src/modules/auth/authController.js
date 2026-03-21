const { where } = require("sequelize");
const User = require("./authModel");

const register = async(req,res) => {

    const {name, email, password} = req.body;

    try {

        const isUserExists = await User.findOne({where: {email}});
        if(isUserExists){
            return res.status(400).json({
                success : false,
                message : "User already exists with this email."
            });
        }

        const hashedPassword = bcrypt.hash(password,10);

        const verificationToken = crypto.randomBytes(32).toString("hex");
        const verificationExpiresIn = new Date(Date.now() + 60*60*1000);

        const newUser = await User.create({
            name,
            email,
            password : hashedPassword,
            verificationToken,
            verificationExpiresIn,
            passwordHistory : [hashedPassword]
        });

        return res.status(201).json({
            success : true,
            message: "New User Registered Sucessfully",
            data : {
                newUser
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message : "Server Error: "+ error
        });
    }
}

module.exports = {
    register
}