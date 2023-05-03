const errorHandlerMiddleware = (err, req, res, next) => {
    if(err instanceof Error){
        err.status = 500;
        return res.status(err.status).json({ msg: err.message });
    }
    return res.status(500).json({ msg: 'Something went wrong, please try again later' });
}

module.exports = errorHandlerMiddleware;