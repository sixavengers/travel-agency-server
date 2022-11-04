const jwt = require('jsonwebtoken');
const {promisify} = require('util');
exports.authUser = async (req, res, next) => {
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