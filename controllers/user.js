const User = require('../Model/User');
const { validateEmail } = require('../validators/validation');



exports.home = (req, res) => {
    res.status(200).json({
        Message : "Home page is Welcomes You..!",
        Success: true,
    });
};

exports.register = async (req, res) => {
    try {
        const user = new User(
           req.body
        ).save();
            if (!validateEmail(req.body.email)) {
                return res.status(400).json({
                    Message : "Please enter a valid email address",
                    Success: false,
                });
            }
        res.status(200).json({
            Message : "Register Success",
            Success: true,
        });
    } catch (error) {
        res.status(500).json({
            Message:error.message,
            Success: false,
        })
    }
    
};