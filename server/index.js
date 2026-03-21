const express = require("express");

const app = express();

app.use("/", (req, res) => {
    res.json({
        message: "Welcome to the Home Page."
    });
});

const startServer = async () => {
    app.listen(3000, () => {
        console.log("Server is running at http://localhost:3000")
    });
}

startServer();