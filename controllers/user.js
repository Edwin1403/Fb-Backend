const User = require('../Model/User');
const { validateEmail, validateLength } = require('../validators/validation');

const bcrypt = require('bcrypt');
const { generateToken } = require('../token/token');

exports.home = (req, res) => {
    res.status(200).json({
        Message: "Home page is Welcomes You..!",
        Success: true,
    });
};

exports.register = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            username,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
        } = req.body;

        if (!validateEmail(email)) {
            return res.status(400).json({
                Success: false,
                Message: "Email is not valid",
            });
        }
        const checkEmail = await User.findOne({ email });
        if (checkEmail) {
            return res.status(400).json({
                message: "Email is already in use, Try another one",
            });
        }

        if (!validateLength(first_name, 3, 30)) {
            return res.status(400).json({
                message: "First Name must be between 3 and 30 characters",
            });
        }
        if (!validateLength(last_name, 3, 30)) {
            return res.status(401).json({
                message: "Last Name must be between 3 and 30 characters",
            })
        };
        if (!validateLength(password, 6, 20)) {
            return res.status(402).json({
                message: "Password must be between 6 and 20 characters",
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        // let tempUserName = first_name + last_name;
        // let newUsername = await validateUsername(tempUserName);

        const user = new User(
            {
                first_name,
                last_name,
                username,
                email,
                password: hashedPassword,
                bYear,
                bMonth,
                bDay,
                gender,
            }
        ).save();
        
        const emailVerificationToken = generateToken(
            { id: user._id},
            "30m"
        );
        console.log(emailVerificationToken);

        res.status(200).json({
            Message: "User created successfully",
            Success: true,
        });

    } catch (error) {
        res.status(500).json({
            Message: error.message,
            Success: false,
        })
    }
};