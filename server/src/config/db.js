const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: "postgres",
        logging: false,
        port: process.env.DB_PORT || 5432,
    }
);

const connectDB = async() => {
    console.log(typeof process.env.DB_PASS, process.env.DB_PASS);
    try {
        await sequelize.authenticate();
        console.log("Psql connected sucessfully.")
    } catch (error) {
        console.log("Unable to connect to the database: ", error)
    }
};

module.exports={
    sequelize,connectDB
}