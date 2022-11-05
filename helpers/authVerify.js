const jwt = require('jsonwebtoken');
const {promisify} = require('util');
module.exports = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).send({
                status: false,
                message: "Unauthorized"
            })
        }
        const decoded =await promisify(jwt.verify)(token, process.env.SECRET_TOKEN);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}
exports.adminauth = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).send({
                status: false,
                message: "Unauthorized"
            })
        }
        const decoded =await promisify(jwt.verify)(token, process.env.SECRET_TOKEN);
        if (decoded.role !== "admin") {
            return res.status(401).send({
                status: false,
                message: "Unauthorized you not admin"
            })
        }
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}