const express = require('express');
const { home, register, activateAccount, login, } = require('../controllers/user');

const router = express.Router();

router.get('/user', home)
router.post('/register', register)
router.post('/activate', activateAccount)
router.post('/login', login)


module.exports = router;