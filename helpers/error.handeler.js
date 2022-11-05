const colors = require('colors');
const ErrorHandeler = (err, req, res, next) => {
    res.status(400).send(`${err.message}`.red.bold);
}
module.exports = ErrorHandeler;