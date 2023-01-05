const User = require('../Model/User');
const { validateEmail, validateLength, validateUsername } = require('../validators/validation');

const bcrypt = require('bcrypt');
const { generateToken } = require('../token/token');
const { sendVerificationEmail } = require('../token/mailer');

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

        let tempUserName = first_name + last_name;
        let newUsername = await validateUsername(tempUserName);

        const user = await new User(
            {
                first_name,
                last_name,
                username: newUsername,
                email,
                password: hashedPassword,
                bYear,
                bMonth,
                bDay,
                gender,
            }
        ).save();

        const emailVerificationToken = generateToken(
            { id: user._id.toString() },
            "30m"
        );
        // console.log(emailVerificationToken);

        const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
        sendVerificationEmail(user.email, user.first_name, url);
        const token = generateToken({ id: user._id.toString() }, "7d");
        res.send({
            id: user._id,
            username: user.username,
            picture: user.picture,
            first_name: user.first_name,
            last_name: user.last_name,
            token: token,
            verified: user.verified,
            message: "Register Successfully ! Please activate your email"
        })

    } catch (error) {
        res.status(500).json({
            Message: error.message,
            Success: false,
        })
    }
};

exports.activateAccount = async (req, res) => {
 const {token} = req.body;
 console.log(token);
}