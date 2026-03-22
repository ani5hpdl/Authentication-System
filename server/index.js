require("dotenv").config();
const express = require("express");
const helmet = require("helmet");

const { connectDB, sequelize } = require("./src/config/db");
const authRoute = require("./src/modules/auth/authRoute")

const app = express();

app.use(helmet());

app.use(express.json());
// app.use("/", (req, res) => {
//     res.json({
//         message: "Welcome to the Home Page."
//     });
// });

app.use("/auth", authRoute);

const startServer = async () => {
    await connectDB();
    await sequelize.sync({force : true});
    app.listen(3000, () => {
        console.log("Server is running at http://localhost:3000")
    });
}

startServer();