const express = require('express');
const {
    home,
    register,
    activateAccount,
    login,
    auth,
} = require('../controllers/user');
const { authUser } = require('../middlewares/auth');

const router = express.Router();

router.get('/user', home)
router.post('/register', register)
router.post('/activate', activateAccount)
router.post('/login', login)
router.post('/auth', authUser, auth)



module.exports = router;