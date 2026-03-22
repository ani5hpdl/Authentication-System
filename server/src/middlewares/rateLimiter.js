const rateLimit = require("express-rate-limit");

const globalLimiter = rateLimit({
    windowMs : 60 * 60 * 100,
    max : 100,
    standardHeaders : true,
    legacyHeaders : false,
    keyGenerator : (req) => {
        const ip = rateLimit.ipKeyGenerator(req);
        // const ip = req.ip;
        const email = req.body?.email?.toLowerCase().trim() || "unknown" ;
        return `${ip}-${email}`; //unique key for every users
    },
    message : {
        success : false,
        message : "Too many requests from this user. Please keep silence!"
    }
});

const registerLimiter = rateLimit({
    windowMs : 10 * 60 * 1000,
    max : 10,
    standardHeaders : true,
    legacyHeaders : false,
    keyGenerator : (req) => {
        const ip = rateLimit.ipKeyGenerator(req);
        return `${ip}`; //unique ip
    },
    message : {
        success : false,
        message : "Too many registration requests. Please try again later!"
    },
});

module.exports = {
    globalLimiter,
    registerLimiter
}