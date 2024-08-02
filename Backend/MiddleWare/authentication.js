const jwt = require('jsonwebtoken');
const { USER } = require("../Db/db");
const key = process.env.KEY;

async function myMiddleware(req, res, next) {
    const jwttoken = req.headers.authorization;

    try {
        if (!jwttoken) {
            return res.status(401).json({
                msg: " Access denied."
            });
        }

        const decodeValue = jwt.verify(jwttoken, key);
        const useremail = decodeValue.useremail;

        if (!useremail) {
            return res.status(401).json({
                msg: " Access denied."
            });
        }

        const user = await USER.findOne({ useremail });

        if (!user) {
            return res.status(401).json({
                msg: "User not found. Access denied."
            });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("Error in JWT verification:", err);
        return res.status(500).json({
            msg: "Internal server error"
        });
    }
}

module.exports = myMiddleware;
