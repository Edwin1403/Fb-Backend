exports.validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
};