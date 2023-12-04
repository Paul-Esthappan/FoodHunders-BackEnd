const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    console.log('header', req.headers);

     let authheader = req.headers.token
    console.log('header token', authheader);

    if (authheader) {
        const token = authheader.split(" ")[1];
        jwt.verify(token,process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                console.error("Token verification error:", err);
                return res.status(403).json('Token not valid');
            }

            console.log("MongoDB ID", user);
            req.user = user
            next();
        });
    } else {
        // No authorization header
        return res.status(403).json('You are not authenticated');
    }
};
const verifyTokenandAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log('user id', req.user._id);
        console.log('params id', req.params.id);
        if (req.user._id === req.params.id) {
            next()
        } else {
            return res.status(403).json('your are not allowed')
        }
    })
}
module.exports = { verifyToken, verifyTokenandAuthorization }


