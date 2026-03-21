require("dotenv").config();
const express = require("express");
const { connectDB, sequelize } = require("./src/config/db");

const app = express();

app.use("/", (req, res) => {
    res.json({
        message: "Welcome to the Home Page."
    });
});

const startServer = async () => {
    await connectDB();
    await sequelize.sync();
    app.listen(3000, () => {
        console.log("Server is running at http://localhost:3000")
    });
}

startServer();