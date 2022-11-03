const ErrorHandeler = (err, req, res, next) => {
    res.status(400).send(err.message,'error from there');
}
module.exports = ErrorHandeler;