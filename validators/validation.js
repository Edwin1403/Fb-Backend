exports.validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
};
exports.validateLength = (text, min, max) => {
    if (text.length < min || text.length > max) {
        return false;
    }
    return true;
};

exports.validateUsername = async (username) => {
    let a = false;

    do {
        let check = await User.findOne({ username });
        if (check) {
            // change username
            username += (+new Date() * Math.random()).toString().substring(0, 1)
            a = true;
        } else {
            a = false;
        }
    } while (a) {
        return username;
    }

}

// exports.validatePassword = (password) => {
//     return String(password)
//     .match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,8}$/)
// }