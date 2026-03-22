const validator = (schema) => (req,res,next) => {
    
    const body = req.body ?? {};

    const {error,value} = schema.validate(body,{
        abortEarly: false,
        stripUnknown: true
    });

    if(error){
        return res.status(400).json({
            success : false,
            errors : error.details.map(e => e.message),
        });
    }

    req.body = value;
    next();

}

module.exports = validator;