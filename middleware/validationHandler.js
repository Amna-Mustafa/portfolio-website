module.exports = (error, req, res, next) => {
    if(error.name === 'SequelizeValidationError') {
        const errors = {};
        error.errors.forEach(e => {
            if(!errors[e.path]) {
                errors[e.path] = [];
            }
            errors[e.path].push(e.message);
        });
        return res.status(422).json({
            message: 'Please fix the following validation errors',
            errors
        })
    } else {
        next(error);
    }
}