const jwt = require("jsonwebtoken");


exports.authUser = (req, res, next) => {
    try {
        tmp = req.header("Authorization");
        const token =tmp ? tmp.slice(7, tmp.length) : "";
        if (!token) {
            return res.status(400).json({
                Message: "Unauthorized",
            });
        }
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(400).json({
                    Message: "Unauthorized",
                });
            }
            req.user = user;
            next();
        });

    } catch (error) {
        return res.status(500).json({
            Message: error.message,
        })
    }
};
