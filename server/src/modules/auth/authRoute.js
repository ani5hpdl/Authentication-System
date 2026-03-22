const { register } = require("./authController");
const validator = require("../../middlewares/validator");
const { registerSchema } = require("./authValidator");

const router = require("express").Router();

router.post("/register",validator(registerSchema),register);

module.exports = router;