const { register } = require("./authController");
const validator = require("../../middlewares/validator");
const { registerSchema } = require("./authValidator");
const { registerLimiter } = require("../../middlewares/rateLimiter");

const router = require("express").Router();

router.post("/register",registerLimiter,validator(registerSchema),register);

module.exports = router;