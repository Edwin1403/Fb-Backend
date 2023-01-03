exports.home = (req, res) => {
    res.status(200).json({
        Message : "Home page is Welcomes You..!",
        Success: true,
    });
};

exports.register = (req, res) => {
    console.log(req.body);
}