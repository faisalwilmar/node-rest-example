const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token;
    try {
        token = req.headers.authorization.split(" ")[1]; //split into array and take the second index, cz the request will be like "Bearer <Token>"
    } catch (error) {
        error.status = 401;
        error.message = "Invalid Token or Token Not Provided";
        throw error;
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        error.status = 401;
        throw error;
    }
}